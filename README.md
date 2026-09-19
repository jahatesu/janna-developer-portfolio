# Janna Portfolio — Organized Version

This package preserves the original single-page portfolio design and behavior while separating structure, presentation, configuration, interactions, animation, and terminal logic.

## Run locally

Because the JavaScript uses ES modules, open the project through a local development server instead of double-clicking `index.html`.

- VS Code: use the Live Server extension.
- Python: run `python -m http.server 8000` inside this folder.

Then open `http://localhost:8000`.

## Customize

- Edit profile details and links in `js/config.js`.
- Replace `assets/images/portrait-placeholder.svg` with your portrait and update the image path in `index.html` if the filename changes.
- Put your résumé in `assets/documents/`.
- Add project images to `assets/images/projects/`.

## Structure

`index.html` contains the semantic page structure. The `css/` directory separates global styles, layout, components, sections, animation, and responsive rules. The `js/` directory separates data, initialization, interactions, animations, and terminal behavior.
