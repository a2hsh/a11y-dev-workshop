# Accessibility Fixes Guide

This app intentionally includes a variety of accessibility issues. Use this guide to fix them and meet WCAG 2.2 AA.

## Components

### `IconButton.tsx`
- **Issues**: No accessible name on the button.
- **Fix**:
  1. Add an `aria-label` prop or provide visible text.
  2. WCAG: 4.1.2 Name, Role, Value.

### `Modal.tsx`
- **Issues**: Missing `role="dialog"`, no focus trap, ESC key doesn't close.
- **Fix**:
  1. Add `role="dialog"` and `aria-modal="true"`.
  2. Implement focus trapping while the modal is open.
  3. Listen for the Escape key to close.
  4. WCAG: 2.1.2 No Keyboard Trap, 2.4.3 Focus Order.

### `LoginModal.tsx` and `AddNewsModal.tsx`
- **Issues**: Inputs lack labels; errors not announced; no focus management.
- **Fix**:
  1. Use `<label>` elements linked with `htmlFor`.
  2. Provide `aria-describedby` for error messages and set `aria-invalid` when errors are present.
  3. Return focus to the trigger when closing.
  4. WCAG: 1.3.1 Info and Relationships, 3.3.1 Error Identification.

### `NewsCard.tsx`
- **Issues**: Image missing `alt`, non‑semantic markup, low color contrast, clickable div for link.
- **Fix**:
  1. Add `alt` text to the image.
  2. Use semantic elements like `<article>` and `<h2>`.
  3. Ensure text meets color contrast ratios.
  4. Replace clickable `<div>` with `<a>` or `<button>`.
  5. WCAG: 1.1.1 Non‑Text Content, 1.4.3 Contrast (Minimum), 2.4.4 Link Purpose.

### `ArticlePage.tsx`
- **Issues**: Same as `NewsCard` (missing alt, headings, contrast).
- **Fix**:
  1. Provide alt text.
  2. Use headings for titles.
  3. Improve color contrast.
  4. WCAG: 1.1.1, 1.4.3.

### General
- Add keyboard focus styles to interactive elements.
- Ensure all actions are reachable via keyboard only.

Follow these steps to make the application fully accessible.
