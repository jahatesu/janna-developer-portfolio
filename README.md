# 🚀 Janna Portfolio — Modern Web Developer Portfolio

A sleek, responsive, and feature-packed developer portfolio built with modular **HTML5**, **CSS3**, and modern **vanilla JavaScript**. Designed with a polished dark-mode aesthetic, micro-interactions, custom animations, and an interactive CLI terminal experience.

---

## 🌟 Key Features

- 🖥️ **Interactive Web CLI / Terminal**: Includes a fully interactive terminal interface supporting custom commands, history navigation, auto-suggestions, and quick portfolio navigation.
- 🎨 **Modular Architecture**: Clean separation of styles and scripts using CSS variables, atomic CSS structures, and standalone JavaScript modules.
- 📱 **Fully Responsive Layout**: Mobile-first design optimized for seamless viewing on desktops, tablets, and smartphones.
- ✨ **Rich Animations & UI Effects**: Custom scroll-triggered animations, interactive particle effects, magnetic buttons, and glassmorphism styling.
- 📁 **Organized Project Showcase**: Dedicated sections highlighting featured projects, skills, professional experience, and downloadable assets/documents.
- ⚡ **Zero External Dependencies**: Built with raw web standards for lightning-fast loading speeds and optimal performance.

---

## 📁 Repository Structure

```text
janna-portfolio-organized/
├── index.html                    # Main HTML entry point
├── README.md                     # Portfolio README
│
├── assets/                       # Static media and document assets
│   ├── icons/                    # Web SVG icons & favicon
│   │   └── favicon.svg
│   ├── images/                   # Project preview images & placeholders[cite: 1]
│   │   ├── portrait-placeholder.svg[cite: 1]
│   │   └── projects/             # Media assets for project cards[cite: 1]
│   └── documents/                # Resumes, CVs, or downloadable assets[cite: 1]
│
├── css/                          # Modular CSS stylesheet architecture[cite: 1]
│   ├── base.css                  # CSS reset, variables, & fundamental styling[cite: 1]
│   ├── style.css                 # Core global styles & layout imports[cite: 1]
│   ├── layout.css                # Structure, grid system, flex containers[cite: 1]
│   ├── sections.css              # Styles for Hero, About, Projects, Experience, Contact[cite: 1]
│   ├── components.css            # Buttons, cards, terminal modal, navigation UI[cite: 1]
│   ├── animations.css            # Keyframe animations, transitions, hover effects[cite: 1]
│   └── responsive.css            # Breakpoint media queries for mobile & tablet[cite: 1]
│
└── js/                           # Modular JavaScript files[cite: 1]
    ├── main.js                   # Application initialization & event orchestrator[cite: 1]
    ├── config.js                 # Global project configurations & data sources[cite: 1]
    ├── interactions.js           # UI listeners, smooth scrolling, mobile nav, theme toggles[cite: 1]
    ├── terminal.js               # CLI terminal emulation logic & command execution[cite: 1]
    └── animations.js             # Canvas background effects & scroll observers[cite: 1]
```

# 🛠️ Tech Stack & Concepts
Frontend Core: HTML5, Modern CSS3 (Grid, Flexbox, Custom Properties), Vanilla JavaScript (ES6+)[cite: 1].

Architecture: Modular CSS (BEM-inspired), Event-Driven JS Modules[cite: 1].

Interactive Components: Canvas API for dynamic background particles, Web Terminal CLI emulation[cite: 1].

Tooling: Pure static hosting compatible (GitHub Pages, Vercel)[cite: 1].

# 🚀 Quick Start & Local Setup

**1. Clone the Repository**
```text
git clone https://github.com/jahatesu/janna-developer-portfolio.git
cd janna-developer-portfolio
```

**2. Run Locally**
Since this project uses vanilla web standards, no npm install or build step is strictly required.

Option A: Direct Open
Double-click index.html to open it in any modern web browser.

Option B: Local Development Server (Recommended)
Using VS Code Live Server extension or Python’s HTTP server:

#📄 License
This project is open-source and available under the MIT License. Feel free to customize it for your own developer portfolio!
