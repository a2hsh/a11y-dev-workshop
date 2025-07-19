# Digital Accessibility Workshop: From Gaps to Sustainable Technical Solutions

## 🎯 Workshop Overview

**Title:** Comprehensive Digital Compliance: From Gaps to Sustainable Technical Solutions  
**Instructor:** Abdulaziz Alshmasi – Digital Accessibility Expert, Digital Inclusivity Program, Digital Government Authority, Saudi Arabia  
**Date:** July 30, 2025 | 10:00 AM - 3:00 PM | Riyadh  

### Why Digital Accessibility Matters
- **96%** of global homepages contain clear accessibility errors (WebAIM Million 2024)
- Average of **56.8 errors** per page
- Legal, social, and economic impact of enhancing compliance

## 🎓 Learning Objectives

- Equip participants with skills to address critical accessibility defects
- Establish a culture of **Audit → Fix → Verify** within government teams
- Rapid alignment with WCAG 2.2 AA and national digital inclusivity policies

## 🛠 Prerequisites & Setup

### Required Software
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Screen Reader:** NVDA (Windows) or VoiceOver (macOS)
- **Browser:** Chrome/Edge with DevTools

### What's Already Configured

This workshop comes pre-configured with:
- ✅ **@axe-core/react** - Real-time accessibility checks in development
- ✅ **Custom AxeDevPanel** - Visual accessibility violations overlay in development mode
- ✅ **eslint-plugin-jsx-a11y** - Accessibility linting rules
- ✅ **Lighthouse audit scripts** - Automated accessibility testing
- ✅ **Tailwind CSS v4** - Utility-first styling framework
- ✅ **React Router v7** - File-based routing system

### Installation Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/a2hsh/a11y-dev-workshop.git
   cd a11y-dev-workshop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:** `http://localhost:5173`

### Workshop Preparation
- **Use headphones** to ensure clear screen reader output
- **Enable your screen reader** for live testing
- **Look for the red accessibility violations button** in the bottom-right corner during development
- **Test keyboard navigation** before the session begins

## 🗺 Workshop Roadmap

We'll complete **two sprints**, each containing three phases:

### Sprint 1: Foundation Fixes (10:22 - 12:00)
**Goal:** Raise Lighthouse score ≥ 85% through alt text, contrast, and semantic elements

1. **🔍 Audit 1** (10:22 - 10:45) - Identify critical issues
2. **📚 WCAG Mini-Lecture** (10:45 - 11:00) - Core principles
3. **🔧 Fix 1** (11:00 - 11:45) - Implement solutions
4. **✅ Verify 1** (11:45 - 12:00) - Test with assistive technology

### Break (12:00 - 13:00)
Coffee break and Dhuhr prayer

### Sprint 2: Advanced Interactions (13:00 - 14:22)
**Goal:** Make dialogs 100% accessible with proper focus management and labeling

1. **🔍 Audit 2** (13:00 - 13:15) - Modal accessibility issues
2. **📚 ARIA Mini-Lecture** (13:15 - 13:30) - Advanced techniques
3. **🔧 Fix 2** (13:30 - 14:15) - Implement ARIA and focus trap
4. **✅ Verify 2** (14:15 - 14:22) - Final verification

### Presentations & Wrap-up (14:30 - 15:00)
- Team presentations (90 seconds each)
- Lessons learned and next steps

## 🧰 Tools & Techniques

### Audit Tools
| Tool | Purpose |
|------|---------|
| **NVDA** | Free, open-source screen reader for Windows |
| **VoiceOver** | Built-in screen reader for macOS/iOS |
| **DevTools → Accessibility** | Browser panel to read Name/Role/State |
| **Lighthouse** | Automated accessibility auditing in Chrome |

### Key Screen Reader Shortcuts

**NVDA:**
- `NVDA+F7` - Browse elements dialog
- `Tab/Shift+Tab` - Navigate interactive elements
- `G/Shift+G` - Jump between graphics
- `NVDA+S` - Stop/resume speech

**VoiceOver:**
- `VO+U` - Show elements by type
- `VO+Right/Left` - Navigate by element

## 🎯 Workshop Application

This workshop uses an **intentionally inaccessible** news application built with:
- **React 19** + **TypeScript** + **React Router v7**
- **React Router v7** with file-based routing
- **Tailwind CSS v4** for styling

### Application Features
- **News browsing** with article cards
- **User authentication** (admin/admin)
- **Article management** (add/delete when logged in)
- **Article detail pages**
- **Real-time accessibility feedback** via AxeDevPanel (development mode)

### Intentional Accessibility Issues
The app contains deliberate accessibility problems including:
- Missing alt text on images
- Low contrast colors  
- Non-semantic HTML (divs instead of proper buttons and headings)
- Unlabeled interactive elements
- Missing ARIA attributes
- No focus management in modals
- No keyboard navigation support
- Form fields without proper labels

## 📋 WCAG 2.2 AA Quick Reference

### Four Core Principles
1. **Perceivable** - Information must be presentable in ways users can perceive
2. **Operable** - Interface components must be operable
3. **Understandable** - Information and UI operation must be understandable
4. **Robust** - Content must be robust enough for various assistive technologies

### Key Standards Covered
- **1.1.1 Non-text Content** - Alt text for images
- **1.4.3 Contrast (Minimum)** - 4.5:1 for normal text, 3:1 for large text
- **2.1.1 Keyboard** - All functionality available via keyboard
- **4.1.2 Name, Role, Value** - Proper semantic markup

## 🚀 Getting Started

1. **Navigate to the app** at `http://localhost:5173`
2. **Test with keyboard only** - Use `Tab` to navigate
3. **Enable screen reader** and explore the interface
4. **Open DevTools** → Accessibility panel
5. **Run Lighthouse audit** for baseline accessibility score
6. **Check your code editor** - ESLint will highlight accessibility issues

### Available Scripts

The project includes several helpful accessibility testing scripts:

```bash
# Run comprehensive Lighthouse accessibility audit
npm run lighthouse:a11y

# Quick accessibility check
npm run lighthouse:quick

# Development server
npm run dev

# Lint code with accessibility rules (shows accessibility errors)
npm run lint

# Auto-fix linting issues where possible
npm run lint:fix
```

## 📖 Workshop Documentation & Resources

### 📚 Workshop Files
This workshop includes comprehensive documentation to guide you through accessibility testing and remediation:

- **📋 [README.md](./README.md)** - This file: complete setup and course overview
- **🛠️ [how-to-fix.md](./how-to-fix.md)** - Step-by-step accessibility remediation guide with before/after code examples

### 🔧 Screen Reader Testing Guides
- **🪟 [nvda.md](./nvda.md)** - NVDA (Windows) screen reader testing guide for developers
- **🍎 [voiceOver.md](./voiceOver.md)** - VoiceOver (macOS) screen reader testing guide for developers

### 📖 Official Documentation
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- **[NVDA User Guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html)** - Official comprehensive NVDA documentation
- **[VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)** - Official comprehensive VoiceOver documentation

### Tools & Extensions
- [NVDA Screen Reader](https://www.nvaccess.org/download/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) (already included)
- [@axe-core/react](https://github.com/dequelabs/axe-core-npm) (already included)

## 🎖 Workshop Completion

By the end of this workshop, you will:
- ✅ Understand core accessibility principles
- ✅ Know how to use screen readers for testing
- ✅ Be able to identify and fix common accessibility issues
- ✅ Have hands-on experience with WCAG 2.2 AA compliance
- ✅ Understand the importance of semantic HTML and ARIA
- ✅ Know how to use modern accessibility tooling (axe-core, ESLint, Lighthouse)

---

## 📞 Support & Contact

**Digital Inclusivity Program, Digital Government Authority**  
Email: dip@dga.gov.sa

*"Accessibility is a collective responsibility"*

---

**Ready to begin?** Start by running the application and exploring it with keyboard navigation only. Document any barriers you encounter - we'll fix them together!