# Tajawal Typography Controller 🎨

A powerful UserScript designed to enhance the readability of Arabic text on websites, specifically optimized for Google Translate's dynamic content. It injects high-quality typography and provides an on-screen dashboard for real-time customization.

## Features 🛠️

- **Dynamic Font Injection:** Injects the "Tajawal" Google Font directly into any webpage.
- **Deep DOM Infiltration:** Uses recursive `Shadow DOM` traversal to ensure the font is applied even to dynamically generated elements (like Google Translate's `font` tags).
- **Floating Control Panel:** A sleek, draggable dashboard to customize text appearance on the fly.
- **Customization Options:**
  - **Font Size:** Real-time scaling.
  - **Line Height:** Optimize vertical spacing for better readability.
  - **Font Weight:** Toggle between regular (400) and bold (700) weights.
- **Clean UI:** Includes a hideable panel with a clean, arrow-less numeric input.

## Installation 📦

1. **Install a UserScript Manager:** Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) on your browser (e.g., Brave, Chrome, Firefox).
2. **Add Script:**
   - Click on your extension icon and select "Create a new script".
   - Copy and paste the provided code from this repository.
   - Save the script (`Ctrl+S`).
3. **Enjoy:** Refresh any website to see the changes.

## How to use 🖱️

- Once the script is active, you will see a blue button with **"ErroFont"** at the bottom-right corner of your screen.
- Click it to toggle the control panel.
- Use the inputs to adjust your reading preferences in real-time.

## Technologies Used 💻

- **JavaScript (ES6):** Logic for DOM manipulation and script execution.
- **CSS3:** For styling the dashboard and forcing font injection via `!important`.
- **Google Fonts API:** Serving the "Tajawal" typeface.

## Troubleshooting 🛡️

If the font doesn't apply immediately:

- **Brave Shields:** Ensure "Block fingerprinting" is disabled for the specific site if Brave is blocking the font injection.
- **Shadow DOM:** The script automatically handles Shadow DOM, but in extreme cases of nested iframes, you might need to adjust the script's `@match` rules.

