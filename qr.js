/**
 * Minimal local QR code generator (no network requests).
 * Byte mode, error correction level M, versions 1-10 (up to 213 bytes).
 */
const QrCode = (() => {
  const MAX_VERSION = 10;
  // Level M tables, indexed by version
  const ECC_PER_BLOCK = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26];
  const BLOCK_COUNT = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5];

  function alignmentPositions(version) {
    if (version === 1) return [];
    const count = Math.floor(version / 7) + 2;
    const step = Math.ceil((version * 4 + 4) / (count * 2 - 2)) * 2;
    const positions = [6];
    for (let pos = version * 4 + 10; positions.length < count; pos -= step) {
      positions.splice(1, 0, pos);
    }
    return positions;
  }

  function rawCodewords(version) {
    let bits = (16 * version + 128) * version + 64;
    if (version >= 2) {
      const count = Math.floor(version / 7) + 2;
      bits -= (25 * count - 10) * count - 55;
      if (version >= 7) bits -= 36;
    }
    return Math.floor(bits / 8);
  }

  function dataCodewords(version) {
    return rawCodewords(version) - ECC_PER_BLOCK[version] * BLOCK_COUNT[version];
  }

  // ---- Reed-Solomon over GF(256), polynomial 0x11D ----

  function gfMultiply(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z;
  }

  function rsDivisor(degree) {
    const result = new Array(degree).fill(0);
    result[degree - 1] = 1;
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < degree; j++) {
        result[j] = gfMultiply(result[j], root);
        if (j + 1 < degree) result[j] ^= result[j + 1];
      }
      root = gfMultiply(root, 2);
    }
    return result;
  }

  function rsRemainder(data, divisor) {
    const result = new Array(divisor.length).fill(0);
    for (const byte of data) {
      const factor = byte ^ result.shift();
      result.push(0);
      divisor.forEach((coef, i) => { result[i] ^= gfMultiply(coef, factor); });
    }
    return result;
  }

  // ---- Data encoding ----

  function encodeData(bytes, version) {
    const capacity = dataCodewords(version);
    const bits = [];
    const push = (value, length) => {
      for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
    };
    push(4, 4); // byte mode
    push(bytes.length, version < 10 ? 8 : 16);
    bytes.forEach(b => push(b, 8));
    push(0, Math.min(4, capacity * 8 - bits.length));
    push(0, (8 - (bits.length % 8)) % 8);

    const data = [];
    for (let i = 0; i < bits.length; i += 8) {
      data.push(parseInt(bits.slice(i, i + 8).join(''), 2));
    }
    for (let pad = 0xec; data.length < capacity; pad ^= 0xec ^ 0x11) data.push(pad);
    return data;
  }

  function addEccAndInterleave(data, version) {
    const blockCount = BLOCK_COUNT[version];
    const eccLength = ECC_PER_BLOCK[version];
    const raw = rawCodewords(version);
    const shortBlocks = blockCount - (raw % blockCount);
    const shortDataLength = Math.floor(raw / blockCount) - eccLength;
    const divisor = rsDivisor(eccLength);

    const blocks = [];
    let offset = 0;
    for (let i = 0; i < blockCount; i++) {
      const length = shortDataLength + (i < shortBlocks ? 0 : 1);
      const blockData = data.slice(offset, offset + length);
      offset += length;
      blocks.push({ data: blockData, ecc: rsRemainder(blockData, divisor) });
    }

    const result = [];
    for (let i = 0; i <= shortDataLength; i++) {
      blocks.forEach(b => { if (i < b.data.length) result.push(b.data[i]); });
    }
    for (let i = 0; i < eccLength; i++) {
      blocks.forEach(b => result.push(b.ecc[i]));
    }
    return result;
  }

  // ---- Matrix ----

  const MASKS = [
    (x, y) => (x + y) % 2 === 0,
    (x, y) => y % 2 === 0,
    (x, y) => x % 3 === 0,
    (x, y) => (x + y) % 3 === 0,
    (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
    (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
    (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
    (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0
  ];

  function buildMatrix(codewords, version, mask) {
    const size = version * 4 + 17;
    const modules = Array.from({ length: size }, () => new Array(size).fill(false));
    const reserved = Array.from({ length: size }, () => new Array(size).fill(false));
    const set = (x, y, dark) => {
      modules[y][x] = dark;
      reserved[y][x] = true;
    };

    // Timing patterns
    for (let i = 0; i < size; i++) {
      set(6, i, i % 2 === 0);
      set(i, 6, i % 2 === 0);
    }

    // Finder patterns and separators
    [[3, 3], [size - 4, 3], [3, size - 4]].forEach(([cx, cy]) => {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const x = cx + dx;
          const y = cy + dy;
          if (x < 0 || x >= size || y < 0 || y >= size) continue;
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          set(x, y, dist !== 2 && dist !== 4);
        }
      }
    });

    // Alignment patterns
    const align = alignmentPositions(version);
    const last = align.length - 1;
    align.forEach((cx, i) => align.forEach((cy, j) => {
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          set(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
        }
      }
    }));

    // Format information (level M = 0b00)
    let rem = mask;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const format = ((mask << 10) | rem) ^ 0x5412;
    const formatBit = i => ((format >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) set(8, i, formatBit(i));
    set(8, 7, formatBit(6));
    set(8, 8, formatBit(7));
    set(7, 8, formatBit(8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, formatBit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, formatBit(i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, formatBit(i));
    set(8, size - 8, true);

    // Version information
    if (version >= 7) {
      let vrem = version;
      for (let i = 0; i < 12; i++) vrem = (vrem << 1) ^ ((vrem >>> 11) * 0x1f25);
      const info = (version << 12) | vrem;
      for (let i = 0; i < 18; i++) {
        const dark = ((info >>> i) & 1) === 1;
        const a = size - 11 + (i % 3);
        const b = Math.floor(i / 3);
        set(a, b, dark);
        set(b, a, dark);
      }
    }

    // Data, zigzagging up and down in two-column strips, with the mask applied
    let bit = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (let vert = 0; vert < size; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = right - j;
          const upward = ((right + 1) & 2) === 0;
          const y = upward ? size - 1 - vert : vert;
          if (reserved[y][x]) continue;
          const dark = bit < codewords.length * 8 &&
            ((codewords[bit >>> 3] >>> (7 - (bit & 7))) & 1) === 1;
          bit++;
          modules[y][x] = dark !== MASKS[mask](x, y);
        }
      }
    }
    return modules;
  }

  function penalty(modules) {
    const size = modules.length;
    let score = 0;
    const scanLine = line => {
      let run = 1;
      for (let i = 1; i <= size; i++) {
        if (i < size && line[i] === line[i - 1]) { run++; continue; }
        if (run >= 5) score += run - 2;
        run = 1;
      }
      const text = line.map(d => (d ? '1' : '0')).join('');
      for (let i = 0; i + 11 <= size; i++) {
        const part = text.substr(i, 11);
        if (part === '10111010000' || part === '00001011101') score += 40;
      }
    };
    let dark = 0;
    for (let y = 0; y < size; y++) {
      scanLine(modules[y]);
      scanLine(modules.map(row => row[y]));
      for (let x = 0; x < size; x++) {
        if (modules[y][x]) dark++;
        if (x + 1 < size && y + 1 < size) {
          const c = modules[y][x];
          if (c === modules[y][x + 1] && c === modules[y + 1][x] && c === modules[y + 1][x + 1]) score += 3;
        }
      }
    }
    return score + Math.floor(Math.abs((dark * 100) / (size * size) - 50) / 5) * 10;
  }

  /** Returns a square array of booleans (true = dark). Pass mask to force one. */
  function matrix(text, forcedMask) {
    const bytes = Array.from(new TextEncoder().encode(text));
    let version = 1;
    while (version <= MAX_VERSION) {
      const needed = 4 + (version < 10 ? 8 : 16) + bytes.length * 8;
      if (needed <= dataCodewords(version) * 8) break;
      version++;
    }
    if (version > MAX_VERSION) throw new RangeError('Text is too long for a QR code');

    const codewords = addEccAndInterleave(encodeData(bytes, version), version);
    if (forcedMask !== undefined) return buildMatrix(codewords, version, forcedMask);

    return MASKS
      .map((_, mask) => buildMatrix(codewords, version, mask))
      .map(modules => ({ modules, score: penalty(modules) }))
      .reduce((best, next) => (next.score < best.score ? next : best))
      .modules;
  }

  /** Returns an SVG string with the standard four-module quiet zone. */
  function svg(text) {
    const modules = matrix(text);
    const border = 4;
    const full = modules.length + border * 2;
    let path = '';
    modules.forEach((row, y) => row.forEach((dark, x) => {
      if (dark) path += `M${x + border},${y + border}h1v1h-1z`;
    }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${full} ${full}" ` +
      `role="img" aria-label="QR code linking to this page" shape-rendering="crispEdges">` +
      `<rect width="${full}" height="${full}" fill="#ffffff"/><path d="${path}" fill="#000000"/></svg>`;
  }

  return { matrix, svg };
})();
