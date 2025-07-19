# How to Fix Accessibility Issues: Step-by-Step Guide

This guide provides detailed instructions for fixing the accessibility issues in the workshop application, following the two-sprint approach covered in the course.

## 🎯 Sprint 1: Foundation Fixes
**Goal:** Achieve Lighthouse accessibility score ≥ 85%

### Issue 1: Missing Alt Text for Images

**Problem:** Images lack alternative text, making them inaccessible to screen reader users.

**Location:** `src/components/NewsCard.tsx` and `app/routes/article.tsx`

**Current Code:**
```tsx
<img 
  src={article.image} 
  className="w-full h-full object-cover"
/>
```

**Fixed Code:**
```tsx
<img 
  src={article.image} 
  alt={article.title}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>
```

**WCAG Reference:** 1.1.1 Non-text Content (Level A)

---

### Issue 2: Poor Color Contrast

**Problem:** Text has insufficient contrast ratio (gray on white background).

**Location:** `src/components/NewsCard.tsx`

**Current Code:**
```tsx
<div className="text-xl font-semibold text-gray-400 mb-3 line-clamp-2">
  {article.title}
</div>
<div className="text-gray-300 text-sm mb-4 line-clamp-3">
  {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
</div>
```

**Fixed Code:**
```tsx
<div className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
  {article.title}
</div>
<div className="text-gray-700 text-sm mb-4 line-clamp-3">
  {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
</div>
```

**WCAG Reference:** 1.4.3 Contrast (Minimum) - Level AA
- Normal text: 4.5:1 ratio
- Large text: 3:1 ratio

---

### Issue 3: Non-Semantic HTML Structure

**Problem:** Using `<div>` elements instead of proper semantic HTML.

**Location:** `src/components/NewsCard.tsx`

**Current Code:**
```tsx
<div 
  onClick={handleCardClick}
  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group relative"
>
  {/* content */}
  <div className="p-6">
    <div className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
      {article.title}
    </div>
  </div>
</div>
```

**Fixed Code:**
```tsx
<article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group relative">
  <a 
    href={`/article/${article.id}`}
    onClick={(e) => {
      e.preventDefault();
      handleCardClick();
    }}
    className="block"
  >
    {/* content */}
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        {article.title}
      </h2>
    </div>
  </a>
</article>
```

**WCAG Reference:** 4.1.2 Name, Role, Value (Level A)

---

### Issue 4: Unlabeled Interactive Elements

**Problem:** Delete button (IconButton) has no accessible name.

**Location:** `src/components/IconButton.tsx`

**Current Code:**
```tsx
<div 
  onClick={(e) => onClick(e)}
  className={`cursor-pointer hover:bg-red-100 rounded-full p-2 transition-colors ${className}`}
>
  <svg>{/* SVG content */}</svg>
</div>
```

**Fixed Code:**
```tsx
<button 
  onClick={(e) => onClick(e)}
  aria-label="Delete article"
  className={`cursor-pointer hover:bg-red-100 rounded-full p-2 transition-colors border-0 bg-transparent ${className}`}
>
  <svg aria-hidden="true">{/* SVG content */}</svg>
</button>
```

**WCAG Reference:** 4.1.2 Name, Role, Value (Level A)

---

## 🎯 Sprint 2: Advanced Interactions
**Goal:** Make modals 100% accessible with proper focus management

### Issue 5: Modal Missing Dialog Role

**Problem:** Modal doesn't announce itself as a dialog to screen readers.

**Location:** `src/components/Modal.tsx`

**Current Code:**
```tsx
<div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
```

**Fixed Code:**
```tsx
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
>
```

**WCAG Reference:** 4.1.2 Name, Role, Value (Level A)

---

### Issue 6: Missing Focus Trap

**Problem:** Tab navigation can escape the modal, confusing users.

**Location:** `src/components/Modal.tsx`

**Current Code:**
```tsx
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  // No focus management
```

**Fixed Code:**
```tsx
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Restore focus when modal closes
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
```

**WCAG Reference:** 2.1.2 No Keyboard Trap (Level A)

---

### Issue 7: Form Fields Without Labels

**Problem:** Login form inputs have no associated labels.

**Location:** `src/components/LoginModal.tsx`

**Current Code:**
```tsx
<input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full px-4 py-3 border rounded-lg"
/>
```

**Fixed Code:**
```tsx
<div>
  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
    Username
  </label>
  <input
    id="username"
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    aria-describedby={errors.username ? "username-error" : undefined}
    aria-invalid={errors.username ? "true" : "false"}
    className={`w-full px-4 py-3 border rounded-lg ${
      errors.username ? 'border-red-500' : 'border-gray-300'
    }`}
  />
  {errors.username && (
    <div id="username-error" role="alert" className="text-red-500 text-sm mt-1">
      {errors.username}
    </div>
  )}
</div>
```

**WCAG Reference:** 
- 1.3.1 Info and Relationships (Level A)
- 3.3.2 Labels or Instructions (Level A)

---

### Issue 8: Error Messages Not Announced

**Problem:** Validation errors are only visual, not announced to screen readers.

**Location:** `src/components/LoginModal.tsx` and `src/components/AddNewsModal.tsx`

**Current Code:**
```tsx
{errors.username && (
  <div className="text-red-500 text-sm mt-1">{errors.username}</div>
)}
```

**Fixed Code:**
```tsx
{errors.username && (
  <div id="username-error" role="alert" className="text-red-500 text-sm mt-1">
    {errors.username}
  </div>
)}
```

**WCAG Reference:** 3.3.1 Error Identification (Level A)

---

## 🔧 Implementation Steps

### Step 1: ESLint Accessibility Plugin (Already Configured!)

The project already includes:
```json
{
  "devDependencies": {
    "eslint-plugin-jsx-a11y": "^6.10.2"
  }
}
```

ESLint configuration is already set up in `eslint.config.js` with accessibility rules enabled.

### Step 2: Sprint 1 Implementation Order

1. **Fix alt text** - Add meaningful alt attributes to all images
2. **Improve contrast** - Update color classes to meet 4.5:1 ratio
3. **Use semantic HTML** - Replace divs with proper elements (article, h1-h6, button)
4. **Add ARIA labels** - Label interactive elements without visible text

### Step 3: Sprint 2 Implementation Order

1. **Add dialog role** - Mark modals with proper ARIA roles
2. **Implement focus trap** - Prevent tab navigation from leaving modal
3. **Add form labels** - Associate labels with form controls
4. **Announce errors** - Use role="alert" for validation messages

### Step 4: Testing Checklist

After each fix, verify:
- ✅ **Keyboard navigation** works smoothly
- ✅ **Screen reader** announces content properly
- ✅ **Lighthouse score** improves
- ✅ **Focus management** behaves correctly in modals
- ✅ **Error messages** are announced when they appear

## 🎯 Verification Commands

### Run Lighthouse Audit
```bash
# Using included script
npm run lighthouse:a11y

# Or run quick check
npm run lighthouse:quick

# Manual: In Chrome DevTools
# Open DevTools → Lighthouse → Accessibility → Generate Report
```

### Test with Screen Reader
```bash
# NVDA (Windows)
NVDA+F7  # Browse elements
G        # Navigate by graphics
H        # Navigate by headings

# VoiceOver (macOS)
VO+U     # Open rotor
VO+Right # Navigate elements
```

### Validate HTML
```bash
# Use online validator or VS Code extension
# Check for proper nesting and semantic structure
```

## 🏆 Success Criteria

### Sprint 1 Goals
- ✅ All images have appropriate alt text
- ✅ Text contrast meets WCAG AA standards (4.5:1)
- ✅ Semantic HTML structure throughout
- ✅ Interactive elements are properly labeled
- ✅ Lighthouse accessibility score ≥ 85%

### Sprint 2 Goals
- ✅ Modals announce as dialogs
- ✅ Focus trapped within open modals
- ✅ Escape key closes modals
- ✅ Form fields have visible labels
- ✅ Error messages announced to screen readers
- ✅ Lighthouse accessibility score ≥ 95%

## 📋 Final Checklist

Before submitting your Pull Request:

**Images & Media:**
- [ ] All decorative images have `alt=""`
- [ ] All informative images have descriptive alt text
- [ ] No image conveys information through color alone

**Forms:**
- [ ] All form controls have associated labels
- [ ] Error messages use `role="alert"`
- [ ] Required fields are clearly marked
- [ ] Error states use `aria-invalid="true"`

**Navigation:**
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Tab order is logical
- [ ] No keyboard traps (except modals)

**Structure:**
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Semantic HTML elements used appropriately
- [ ] ARIA roles only when necessary
- [ ] Landmarks identify page regions

**Color & Contrast:**
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Information not conveyed by color alone
- [ ] Focus indicators have sufficient contrast

**Modals & Dialogs:**
- [ ] Modal has `role="dialog"` and `aria-modal="true"`
- [ ] Modal has accessible name (`aria-labelledby`)
- [ ] Focus trapped within modal
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element

## 🚀 Next Steps

After completing the workshop:

1. **Use the included Lighthouse CI scripts** (`npm run lighthouse:a11y`)
2. **Leverage the configured eslint-plugin-jsx-a11y** in development
3. **Use @axe-core/react** for real-time accessibility feedback (already included)
4. **Establish regular accessibility testing** in your development workflow
5. **Train your team** on screen reader testing techniques
6. **Create accessibility guidelines** for your organization

---

**Remember:** 80% of accessibility barriers can be fixed with a single line of code. The key is knowing what to look for and how to test effectively.

**Tools make it easier, but understanding makes it sustainable.**
