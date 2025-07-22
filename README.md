
# Digital Accessibility Workshop: From Gaps to Sustainable Technical Solutions

[العربية README](./README.ar.md)

Welcome to the Digital Accessibility Workshop! This hands-on session is designed to help you identify, fix, and verify accessibility issues in modern web applications. Whether you're new to accessibility or looking to deepen your skills, you'll walk away with real experience and a toolkit for sustainable, inclusive development.

---

## 🎯 Workshop Objectives

- **Understand** the impact and importance of digital accessibility
- **Use** screen readers and accessibility auditing tools effectively
- **Identify** common accessibility barriers in real-world apps
- **Fix** accessibility issues using best practices and modern frameworks
- **Verify** fixes with both automated and manual techniques
- **Build** sustainable, inclusive development workflows

---

## 🚨 About This App

This project uses an **intentionally inaccessible** React-based news application.

It was designed by a blind accessibility expert to reflect real-world barriers that often go unnoticed. It is **visually polished** but deliberately flawed in its accessibility.

### ❌ Common Violations Included:
- Missing `alt` text
- Low contrast text and UI
- Non-semantic HTML elements
- Unlabeled buttons and form fields
- Missing ARIA roles and properties
- Broken focus management
- No keyboard navigation

> 🧠 Your mission: Turn this app into an accessible, inclusive experience for all users.

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/a2hsh/a11y-dev-workshop.git
   cd a11y-dev-workshop
```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```


4. **Open the app**

   * [http://localhost:5173](http://localhost:5173) (local)
   * [https://a2hsh.github.io/a11y-dev-workshop/](https://a2hsh.github.io/a11y-dev-workshop/) (preview)

---

## 🌐 Language

- [English README](./README.md)
- [العربية README](./README.ar.md)

---

## 🛠 Prerequisites (Before the Workshop)

✅ Install:

* [Node.js v18+](https://nodejs.org/)
* [Git](https://git-scm.com/)
* A modern browser (Chrome or Edge)

✅ Set up a screen reader:

* **Windows**: [NVDA](https://www.nvaccess.org/)
* **macOS**: VoiceOver (built-in)

✅ Explore the guides:

* [NVDA Developer Testing Guide](./nvda.md)
* [VoiceOver Developer Testing Guide](./voiceOver.md)

✅ Run the app locally:

* Ensure it builds and opens at `http://localhost:5173`
* Navigate using **keyboard only**
* Turn on your screen reader and try basic navigation

> ⚠️ You must complete these steps before the workshop begins.

---

## 🏃‍♂️ Workshop Agenda & Flow

### 🔁 We’ll go through 2 accessibility sprints:

#### **Sprint 1 – Foundation Fixes** (10:22 – 12:00)

Focus: `alt` text, contrast, semantics

1. 🔍 Audit 1
2. 📚 WCAG mini-lecture
3. 🔧 Fix 1
4. ✅ Verify 1

**Break (12:00 – 13:00)** – Coffee + Dhuhr Prayer

#### **Sprint 2 – Advanced Interactions** (13:00 – 14:22)

Focus: Modals, ARIA, focus management

1. 🔍 Audit 2
2. 📚 ARIA mini-lecture
3. 🔧 Fix 2
4. ✅ Verify 2

#### 🎤 Final (14:30 – 15:00)

* Team presentations (90s each)
* Wrap-up and next steps

---

## 💻 Development Scripts

```bash
# Start development server
npm run dev

# Run full Lighthouse a11y audit
npm run lighthouse:a11y

# Run quick Lighthouse check
npm run lighthouse:quick

# Run a11y linting
npm run lint

# Fix what can be auto-fixed
npm run lint:fix
```

---

## 🧪 Tools We’ll Use

| Tool                         | Purpose                          |
| ---------------------------- | -------------------------------- |
| **NVDA / VoiceOver**         | Screen reader testing            |
| **DevTools → Accessibility** | Inspect name / role / state      |
| **AxeDevPanel**              | Visual overlay of violations     |
| **Lighthouse**               | Audit score + details            |
| **eslint-plugin-jsx-a11y**   | Code-level accessibility linting |

> ✅ All tools are pre-integrated in this project.

---

## ⚙️ App Features

* 📰 Article browsing with news cards
* 🔐 Login: `admin` / `admin`
* ➕ Add & 🗑 Delete articles (after login)
* 📄 Article detail pages
* 👀 Live a11y feedback via Axe (dev mode)

---

## 💣 Built-In Accessibility Failures

This app **intentionally** contains:

* Missing `alt` attributes
* Low color contrast
* `<div>`s used instead of semantic elements
* Buttons with no name
* Forms with no labels or feedback
* No focus trap in modals
* No keyboard accessibility

---

## 📋 WCAG 2.2 AA Highlights

| Principle | Example                            |
| --------- | ---------------------------------- |
| **1.1.1** | Missing alt text                   |
| **1.4.3** | Poor color contrast                |
| **2.1.1** | No keyboard access                 |
| **4.1.2** | Elements lack name, role, or value |

---

## 📚 Resources

* 🧑‍💻 [NVDA Developer Testing Guide](./nvda.md) – NVDA guide (Windows)
* 🍎 [VoiceOver Developer Testing Guide](./voiceOver.md) – VoiceOver guide (macOS)
* 📖 [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
* 🔧 [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
* 🧠 [WebAIM – Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
* 📘 [How to Fix Accessibility Issues: Step-by-Step Guide](./how-to-fix.md) – Step-by-step remediation reference

---

## 🏆 By the End, You Will:

* ✅ Understand accessibility principles
* ✅ Use screen readers confidently
* ✅ Identify and fix major a11y issues
* ✅ Achieve WCAG 2.2 AA compliance
* ✅ Use modern a11y tooling
* ✅ Build habit-forming accessible workflows

---

## 📬 Contact

**Digital Inclusivity Program – Digital Government Authority**
📩 Email: [dip@dga.gov.sa](mailto:dip@dga.gov.sa)

> “Accessibility is a collective responsibility.”

---

**👀 Get started now:**

1. Run the app
2. Turn on your screen reader
3. Navigate with keyboard only
4. Start finding barriers—we’ll fix them together!
