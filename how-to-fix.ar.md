# دليل تصحيح مشاكل إمكانية الوصول: خطوة بخطوة

# العربية | [English](./how-to-fix.md)

## 📚 مصادر ودلائل

- [ورشة الامتثال الرقمي الشامل: من الفجوات إلى الحلول التقنية المستدامة](./README.ar.md)
- [دليل اختبار NVDA للمطورين](./nvda.ar.md)
- [دليل المطور لاختبار إمكانية الوصول باستخدام VoiceOver على macOS](./voiceOver.ar.md)
- [إرشادات WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/)
- [دليل استخدام ARIA](https://www.w3.org/WAI/ARIA/apg/)
- [اختبار قارئ الشاشة – WebAIM](https://webaim.org/articles/screenreader_testing/)

---

> ## ⚠️ تحذير هام

> لا تنظر إلى هذا الملف إلا إذا كنت بحاجة فعلية! الهدف من الورشة هو التعلم العملي، وليس الغش أو نسخ الحلول.
> لا تستخدم هذا الملف إلا بعد محاولة إصلاح المشكلات بنفسك.

يقدم هذا الدليل تعليمات تفصيلية لإصلاح مشاكل إمكانية الوصول في تطبيق الورشة، باتباع منهج الدورتين المطروح في المنهج.

---



## 🎯 الدورة الأولى: إصلاح الأساسيات
**الهدف:** تحقيق درجة وصول Lighthouse ≥ 85%

### المشكلة 1: غياب نص بديل للصور

**الوصف:** الصور بدون نص بديل، مما يجعلها غير قابلة للوصول لمستخدمي قارئ الشاشة.

**الموقع:** `src/components/NewsCard.tsx` و `app/routes/article.tsx`

**الكود الحالي:**
```tsx
<img 
  src={article.image} 
  className="w-full h-full object-cover"
/>
```

**الكود المصحح:**
```tsx
<img 
  src={article.image} 
  alt={article.title}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>
```

**مرجع WCAG:** 1.1.1 محتوى غير نصي (المستوى A)

---

### المشكلة 2: تباين لوني ضعيف

**الوصف:** النص ذو تباين منخفض (رمادي على خلفية بيضاء).

**الموقع:** `src/components/NewsCard.tsx`

**الكود الحالي:**
```tsx
<div className="text-xl font-semibold text-gray-400 mb-3 line-clamp-2">
  {article.title}
</div>
<div className="text-gray-300 text-sm mb-4 line-clamp-3">
  {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
</div>
```

**الكود المصحح:**
```tsx
<div className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
  {article.title}
</div>
<div className="text-gray-700 text-sm mb-4 line-clamp-3">
  {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
</div>
```

**مرجع WCAG:** 1.4.3 التباين (الحد الأدنى) - المستوى AA
- النص العادي: نسبة 4.5:1
- النص الكبير: نسبة 3:1

---

### المشكلة 3: بنية HTML غير دلالية

**الوصف:** استخدام عناصر `<div>` بدل العناصر الدلالية الصحيحة.

**الموقع:** `src/components/NewsCard.tsx`

**الكود الحالي:**
```tsx
<div 
  onClick={handleCardClick}
  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group relative"
>
  {/* المحتوى */}
  <div className="p-6">
    <div className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
      {article.title}
    </div>
  </div>
</div>
```

**الكود المصحح:**
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
    {/* المحتوى */}
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        {article.title}
      </h2>
    </div>
  </a>
</article>
```

**مرجع WCAG:** 4.1.2 الاسم والدور والقيمة (المستوى A)

---

### المشكلة 4: عناصر تفاعلية بدون تسمية

**الوصف:** زر الحذف (IconButton) بدون اسم قابل للوصول.

**الموقع:** `src/components/IconButton.tsx`

**الكود الحالي:**
```tsx
<div 
  onClick={(e) => onClick(e)}
  className={`cursor-pointer hover:bg-red-100 rounded-full p-2 transition-colors ${className}`}
>
  <svg>{/* محتوى SVG */}</svg>
</div>
```

**الكود المصحح:**
```tsx
<button 
  onClick={(e) => onClick(e)}
  aria-label="حذف المقالة"
  className={`cursor-pointer hover:bg-red-100 rounded-full p-2 transition-colors border-0 bg-transparent ${className}`}
>
  <svg aria-hidden="true">{/* محتوى SVG */}</svg>
</button>
```

**مرجع WCAG:** 4.1.2 الاسم والدور والقيمة (المستوى A)

---

## 🎯 الدورة الثانية: التفاعلات المتقدمة
**الهدف:** جعل مربعات الحوار (modals) قابلة للوصول بالكامل مع إدارة التركيز الصحيحة

### المشكلة 5: مربع الحوار بدون دور dialog

**الوصف:** مربع الحوار لا يعلن نفسه كحوار لقارئ الشاشة.

**الموقع:** `src/components/Modal.tsx`

**الكود الحالي:**
```tsx
<div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto">
```

**الكود المصحح:**
```tsx
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto"
>
```

**مرجع WCAG:** 4.1.2 الاسم والدور والقيمة (المستوى A)

---

### المشكلة 6: غياب مصيدة التركيز

**الوصف:** يمكن أن يخرج التنقل عبر Tab من مربع الحوار، مما يربك المستخدمين.

**الموقع:** `src/components/Modal.tsx`

**الكود الحالي:**
```tsx
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  // لا يوجد إدارة تركيز
```

**الكود المصحح:**
```tsx
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // حفظ العنصر النشط حاليًا
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // تركيز مربع الحوار
      modalRef.current?.focus();
      
      // مصيدة التركيز داخل مربع الحوار
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
          return;
        }
        
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"] )'
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
        // إعادة التركيز عند إغلاق مربع الحوار
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
```

**مرجع WCAG:** 2.1.2 لا توجد مصيدة لوحة المفاتيح (المستوى A)

---

### المشكلة 7: حقول النموذج بدون تسميات

**الوصف:** مدخلات نموذج تسجيل الدخول بدون تسميات مرتبطة.

**الموقع:** `src/components/LoginModal.tsx`

**الكود الحالي:**
```tsx
<input
  type="text"
  placeholder="اسم المستخدم"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full px-4 py-3 border rounded-lg"
/>
```

**الكود المصحح:**
```tsx
<div>
  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
    اسم المستخدم
  </label>
  <input
    id="username"
    type="text"
    placeholder="اسم المستخدم"
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

**مرجع WCAG:** 
- 1.3.1 المعلومات والعلاقات (المستوى A)
- 3.3.2 التسميات أو التعليمات (المستوى A)

---

### المشكلة 8: رسائل الخطأ غير معلنة

**الوصف:** رسائل التحقق تظهر بصريًا فقط، ولا تعلن لقارئ الشاشة.

**الموقع:** `src/components/LoginModal.tsx` و `src/components/AddNewsModal.tsx`

**الكود الحالي:**
```tsx
{errors.username && (
  <div className="text-red-500 text-sm mt-1">{errors.username}</div>
)}
```

**الكود المصحح:**
```tsx
{errors.username && (
  <div id="username-error" role="alert" className="text-red-500 text-sm mt-1">
    {errors.username}
  </div>
)}
```

**مرجع WCAG:** 3.3.1 تحديد الخطأ (المستوى A)

---

## 🔧 خطوات التنفيذ

### الخطوة 1: إضافة ESLint Accessibility Plugin (موجود مسبقًا)

المشروع يحتوي بالفعل على:
```json
{
  "devDependencies": {
    "eslint-plugin-jsx-a11y": "^6.10.2"
  }
}
```

تم إعداد ESLint في `eslint.config.js` مع قواعد الوصول مفعلة.

### الخطوة 2: ترتيب تنفيذ الدورة الأولى

1. **إصلاح نص الصور** - إضافة نص بديل لجميع الصور
2. **تحسين التباين** - تحديث ألوان النص لتلبية نسبة 4.5:1
3. **استخدام HTML دلالي** - استبدال div بعناصر مناسبة (article, h1-h6, button)
4. **إضافة تسميات ARIA** - تسمية العناصر التفاعلية بدون نص مرئي

### الخطوة 3: ترتيب تنفيذ الدورة الثانية

1. **إضافة دور dialog** - تمييز مربعات الحوار بأدوار ARIA المناسبة
2. **تطبيق مصيدة التركيز** - منع التنقل عبر Tab من مغادرة مربع الحوار
3. **إضافة تسميات للنماذج** - ربط التسميات بعناصر النموذج
4. **إعلان رسائل الخطأ** - استخدام role="alert" لرسائل التحقق

### الخطوة 4: قائمة التحقق بعد كل إصلاح

- ✅ **التنقل بلوحة المفاتيح** يعمل بسلاسة
- ✅ **قارئ الشاشة** يعلن المحتوى بشكل صحيح
- ✅ **درجة Lighthouse** تتحسن
- ✅ **إدارة التركيز** صحيحة في مربعات الحوار
- ✅ **رسائل الخطأ** تعلن عند ظهورها

## 🎯 أوامر التحقق

### تشغيل تدقيق Lighthouse
```bash
npm run lighthouse:a11y
npm run lighthouse:quick
```

### اختبار مع قارئ الشاشة
```bash
# NVDA (Windows)
NVDA+F7  # تصفح العناصر
G        # التنقل حسب الرسومات
H        # التنقل حسب العناوين

# VoiceOver (macOS)
VO+U     # فتح المدور
VO+Right # التنقل بين العناصر
```

### التحقق من HTML
```bash
# استخدم أداة تحقق أو إضافة VS Code
# تحقق من البنية الدلالية الصحيحة
```

## 🏆 معايير النجاح

### أهداف الدورة الأولى
- ✅ جميع الصور لها نص بديل مناسب
- ✅ تباين النص يحقق معيار WCAG AA (4.5:1)
- ✅ بنية HTML دلالية
- ✅ العناصر التفاعلية لها تسميات واضحة
- ✅ درجة Lighthouse ≥ 85%

### أهداف الدورة الثانية
- ✅ مربعات الحوار تعلن كحوار
- ✅ التركيز محصور داخل مربع الحوار
- ✅ زر Escape يغلق مربع الحوار
- ✅ حقول النموذج لها تسميات مرئية
- ✅ رسائل الخطأ تعلن لقارئ الشاشة
- ✅ درجة Lighthouse ≥ 95%

## 📋 قائمة التحقق النهائية

قبل إرسال Pull Request:

**الصور والوسائط:**
- [ ] جميع الصور الزخرفية لها `alt=""`
- [ ] جميع الصور المعلوماتية لها نص بديل وصفي
- [ ] لا توجد صورة تنقل معلومات عبر اللون فقط

**النماذج:**
- [ ] جميع عناصر النموذج لها تسميات مرتبطة
- [ ] رسائل الخطأ تستخدم `role="alert"`
- [ ] الحقول المطلوبة محددة بوضوح
- [ ] الحالات الخطأ تستخدم `aria-invalid="true"`

**التنقل:**
- [ ] جميع العناصر التفاعلية قابلة للوصول بلوحة المفاتيح
- [ ] مؤشرات التركيز مرئية
- [ ] ترتيب Tab منطقي
- [ ] لا توجد مصيدة لوحة المفاتيح (إلا في المودال)

**البنية:**
- [ ] تسلسل العناوين منطقي (h1 → h2 → h3)
- [ ] استخدام عناصر HTML دلالية
- [ ] أدوار ARIA فقط عند الحاجة
- [ ] المعالم تحدد مناطق الصفحة

**الألوان والتباين:**
- [ ] تباين النص يحقق معيار WCAG AA (4.5:1)
- [ ] المعلومات لا تنقل عبر اللون فقط
- [ ] مؤشرات التركيز بتباين كافٍ

**المودال والحوار:**
- [ ] المودال له `role="dialog"` و `aria-modal="true"`
- [ ] المودال له اسم قابل للوصول (`aria-labelledby`)
- [ ] التركيز محصور داخل المودال
- [ ] زر Escape يغلق المودال
- [ ] التركيز يعود لعنصر التفعيل

## 🚀 الخطوات التالية

بعد انتهاء الورشة:

1. **استخدم تدقيق Lighthouse CI** (`npm run lighthouse:a11y`)
2. **استفد من eslint-plugin-jsx-a11y** أثناء التطوير
3. **استخدم @axe-core/react** لملاحظات وصول فورية (موجود مسبقًا)
4. **اعتمد اختبار الوصول بشكل دوري** في سير العمل
5. **درّب فريقك** على اختبار قارئ الشاشة
6. **أنشئ إرشادات وصول خاصة بفريقك أو مؤسستك

---

**تذكر:** 80% من مشاكل الوصول يمكن إصلاحها بسطر واحد فقط. المفتاح هو معرفة ما يجب البحث عنه وكيفية الاختبار بفعالية.

**الأدوات تسهّل العمل، لكن الفهم هو ما يجعله مستدامًا.**
