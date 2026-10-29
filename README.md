# Ahmad Chakik — Executive Digital Profile & Conglomerate Portfolio

A bespoke, ultra-modern executive digital card and conglomerate hub built for **Ahmad Chakik**, Chairman of **Opal Group**, **Opal World Technologies**, **Opal Mining Co Ltd**, and **Opal Strategic Partners**.

---

## ✨ Features & Enhancements

- **Sovereign Executive Aesthetic**: Crafted with precision glassmorphism, iridescent Opal jewel glows, and typography using *Plus Jakarta Sans* & *JetBrains Mono*.
- **Pristine Light Theme (Default)**: Bright alabaster pearl canvas with crisp slate and charcoal typography, soft shadows, and an optional Obsidian Dark Mode toggle.
- **Adaptive Dual-Column Layout**: 
  - **Desktop / Tablet**: Symmetrical dual-column executive dashboard. Left column holds the Executive Profile, Quick Actions, and Direct Lines directory with live local times. Right column showcases the Executive Dossier, Digital Brochure, 6 Conglomerate Ventures (2x3 grid), and Leadership Gallery.
  - **Mobile**: Seamless single-column smartphone card with a floating bottom navigation bar for quick one-thumb calls, WhatsApp, email, and vCard saving.
- **Live International World Clocks**: Real-time timezone calculation and live clock updates for **Dubai (GST)**, **Qatar (AST)**, **Lebanon (EET)**, **Turkey (TRT)**, and **Sudan (CAT)**.
- **One-Tap Actions**:
  - Direct Cellular Call (`tel:`)
  - Instant WhatsApp Chat (`wa.me`)
  - Instant Copy Phone Number with floating toast feedback
- **Enriched vCard 3.0 Generation (`.vcf`)**: One-click download with full name, title, multiple organizations, 5 international phone numbers, email, websites, and bio notes.
- **Interactive QR Code Generator**: Generates an instant high-resolution QR code modal for rapid in-person networking from any smartphone camera.
- **Conglomerate Portfolio Modals**: Interactive detail cards for Opal World Tech, Opal SP, Opal SG, Opal Mining, Opal Trading Qatar, and Opal Management Turkey.
- **Zero-Build Architecture**: 100% vanilla HTML5, CSS3, and modern JavaScript. Deploys instantly to GitHub Pages with zero compilation steps or external dependencies.

---

## 📁 Project Structure

```text
chakik-card/
├── index.html           # Main semantic HTML structure & metadata
├── styles.css           # Custom design system, glassmorphism & themes
├── script.js            # Live clocks, modals, vCard generator & theme logic
├── assets/              # Local optimized assets
│   ├── avatar.jpg       # Ahmad Chakik executive portrait
│   ├── award.jpg        # Global Recognition ceremony
│   ├── leadership.jpg   # Strategic Leadership summit
│   ├── logo-tech.png    # Opal World Technologies logo
│   ├── logo-sg.png      # Opal SG logo
│   ├── logo-grp.png     # Opal Group logo
│   ├── logo-mining.png  # Opal Mining logo
│   ├── logo-global.png  # Global Opal logo
│   └── logo-sp.png      # Opal Strategic Partners (Opal SP) logo
└── README.md            # Documentation & GitHub Pages Hosting Guide
```

---

## 🚀 How to Host on Your Own GitHub Account (New Repository)

GitHub Pages provides **100% free, high-speed, secure HTTPS hosting** with no monthly fees or maintenance required.

Follow either **Method 1 (via Web Browser — Easiest, No Git Command Line Needed)** or **Method 2 (via Git Terminal)**.

---

### 🌐 Method 1: Using the GitHub Web Interface (Recommended & Easiest)

#### Step 1: Create a New Repository on Your Personal GitHub
1. Open [github.com](https://github.com/) in your browser and log into your GitHub account (or create a free account if you don't have one yet).
2. Click the **`+`** icon in the top-right corner of the page → select **New repository** (or go directly to [github.com/new](https://github.com/new)).
3. Fill in the repository details:
   - **Repository name**: You can name it whatever you like:
     - `ahmad-chakik-card` ➔ Your live URL will be: `https://<YOUR-USERNAME>.github.io/ahmad-chakik-card/`
     - OR `card` ➔ Your live URL will be: `https://<YOUR-USERNAME>.github.io/card/`
     - OR `<YOUR-USERNAME>.github.io` ➔ *Special trick:* if you name the repository exactly `<YOUR-USERNAME>.github.io`, your URL will be clean without any subfolder: `https://<YOUR-USERNAME>.github.io/`!
   - **Visibility**: Set to **Public** (GitHub Pages is free for public repositories).
   - **Initialize this repository with**: Leave "Add a README file" **unchecked** (we already have all our files ready).
4. Click the green **Create repository** button.

#### Step 2: Upload Your Project Files
1. On your newly created repository screen, click the link that says **"uploading an existing file"** (or click **Add file** → **Upload files**).
2. Open Windows File Explorer and navigate to this folder:  
   `d:\Work\vibe-code-projects\chakik-card`
3. Drag and drop all the following items into the GitHub upload area:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - The entire `assets` folder (containing `avatar.jpg`, `award.jpg`, `leadership.jpg`, and all company logos)
4. At the bottom of the upload page:
   - In the commit summary box, type: `Launch executive digital card`
   - Keep "Commit directly to the `main` branch" selected.
5. Click **Commit changes** and wait a moment for the files to process.

#### Step 3: Enable GitHub Pages
1. In your repository, click the **Settings** tab (gear icon at the top right of the repo navigation bar).
2. In the left-hand sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Click the dropdown, select **`main`**, and ensure the folder is **`/ (root)`**.
   - Click **Save**.
4. Scroll down slightly and ensure **Enforce HTTPS** is checked.

#### Step 4: Access Your Live Site!
1. Wait 60 to 90 seconds for GitHub's automated server to publish the files.
2. Refresh the **Settings → Pages** screen. A green banner will appear:
   > *"Your site is live at `https://<YOUR-USERNAME>.github.io/<REPO-NAME>/`"*
3. Click the link to view your live card on the web!

---

### 💻 Method 2: Using the Git Command Line

If you prefer using Git in PowerShell:

```bash
# 1. Open terminal in the project directory
cd d:\Work\vibe-code-projects\chakik-card

# 2. Initialize Git
git init

# 3. Add all files and commit
git add .
git commit -m "feat: initial launch of Ahmad Chakik executive card"

# 4. Set main branch
git branch -M main

# 5. Link to your new repository (replace <YOUR-USERNAME> and <REPO-NAME>)
git remote add origin https://github.com/<YOUR-USERNAME>/<REPO-NAME>.git

# 6. Push code to GitHub
git push -u origin main
```

Then go to **Settings → Pages** in your repository and set Branch to `main` and folder `/ (root)` as described in Step 3.

---

### 🏷️ Connecting a Custom Domain (Optional)

If you'd like your card to be accessed via a custom branded link (e.g., `card.opal-gp.com` or `ahmadchakik.com`):
1. In your repository, go to **Settings** → **Pages**.
2. In the **Custom domain** box, enter your domain name (e.g., `card.opal-gp.com`) and click **Save**.
3. In your DNS provider (e.g. Cloudflare, GoDaddy, Namecheap), add a **CNAME** DNS record:
   - **Type**: `CNAME`
   - **Name / Host**: `card`
   - **Value / Target**: `<YOUR-USERNAME>.github.io`
4. Once DNS resolves, check **Enforce HTTPS**.
