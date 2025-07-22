// Sync <html lang> and <html dir> attributes with current language
export function syncHtmlLangDir(lang: SupportedLang) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
// i18n.ts
// Simple localization system for Arabic and English

export type SupportedLang = 'en' | 'ar';

const translations: Record<SupportedLang, Record<string, string>> = {
  en: {
    'footer_title': 'Digital Accessibility Workshop',
    'footer_tagline': 'From Gaps to Sustainable Technical Solutions',
    'footer_description': 'This intentionally inaccessible news app was designed by a blind accessibility expert to demonstrate real-world barriers. It contains deliberate violations of accessibility guidelines for educational purposes.',
    'footer_get_started': 'Get Started',
    'footer_program': 'Digital Inclusivity Program',
    'footer_authority': 'Digital Government Authority, Saudi Arabia',
    'footer_quote': 'Accessibility is a collective responsibility',
    'add_news': 'Add News',
    'read_more': 'Read More →',
    'show_violations_aria': 'Show accessibility violations ({count})',
    'show_one_issue': 'Show 1 accessibility issue',
    'show_many_issues': 'Show {count} accessibility issues',
    'learn_more_aria': 'Learn more about {help}',
    'learn_more': 'Learn More',
    'unknown': 'Unknown',
    'close_panel_aria': 'Close accessibility violations panel',
    'violations_heading': 'Accessibility Violations ({count})',
    'violations_list_aria': 'Accessibility Violations',
    'impact': 'Impact',
    'help': 'Help',
    'help_url': 'Help URL',
    'nodes': 'Nodes',
    'article_not_found': 'Article not found',
    'back_to_home': 'Back to Home',
    'logout': 'Logout',
    'login': 'Login',
    'no_articles': 'No articles available',
    'add_first_article': 'Add the first article →',
    'site_tagline': 'Your premier source for breaking news',
    'site_title': 'News Hub - Stay Informed',
    'site_description': 'Your premier destination for breaking news and insights',
    'username': 'Username',
    'password': 'Password',
    'username_required': 'Username is required',
    'password_required': 'Password is required',
    'invalid_credentials': 'Invalid credentials',
    'add_news_article': 'Add News Article',
    'article_title': 'Article Title',
    'image_url': 'Image URL',
    'article_content': 'Article Content',
    'title_required': 'Title is required',
    'image_required': 'Image URL is required',
    'content_required': 'Content is required',
    'add_article': 'Add Article',
  },
  ar: {
    'footer_title': 'ورشة الامتثال الرقمي الشامل',
    'footer_tagline': 'من الفجوات إلى الحلول التقنية المستدامة',
    'footer_description': 'تم تصميم هذا التطبيق الإخباري غير المتوافق عمدًا بواسطة خبير وصول كفيف لمحاكاة العوائق الواقعية. يحتوي على مخالفات متعمدة لإرشادات الوصول لأغراض تعليمية.',
    'footer_get_started': 'ابدأ الآن',
    'footer_program': 'برنامج الشمولية الرقمية',
    'footer_authority': 'هيئة الحكومة الرقمية، السعودية',
    'footer_quote': 'إمكانية الوصول مسؤولية جماعية',
    'add_news': 'أضف خبرًا',
    'show_violations_aria': 'عرض مخالفات الوصول ({count})',
    'show_one_issue': 'عرض مخالفة وصول واحدة',
    'show_many_issues': 'عرض {count} مخالفات وصول',
    'read_more': 'اقرأ المزيد →',
    'learn_more_aria': 'معلومات أكثر عن {help}',
    'learn_more': 'معلومات أكثر',
    'unknown': 'غير معروف',
    'close_panel_aria': 'إغلاق لوحة مخالفات الوصول',
    'violations_heading': 'مخالفات الوصول ({count})',
    'violations_list_aria': 'مخالفات الوصول',
    'impact': 'الأثر',
    'help': 'مساعدة',
    'help_url': 'رابط المساعدة',
    'nodes': 'العناصر',
    'article_not_found': 'المقال غير موجود',
    'back_to_home': 'العودة للرئيسية',
    'logout': 'تسجيل الخروج',
    'login': 'تسجيل الدخول',
    'no_articles': 'لا توجد مقالات متاحة',
    'add_first_article': 'أضف أول مقال →',
    'site_tagline': 'مصدر الأخبار الأول لديك',
    'site_title': 'مركز الأخبار - ابق على اطلاع',
    'site_description': 'وجهتك الأولى للأخبار العاجلة والرؤى',
    'username': 'اسم المستخدم',
    'password': 'كلمة المرور',
    'username_required': 'اسم المستخدم مطلوب',
    'password_required': 'كلمة المرور مطلوبة',
    'invalid_credentials': 'بيانات الاعتماد غير صحيحة',
    'add_news_article': 'إضافة خبر جديد',
    'article_title': 'عنوان المقال',
    'image_url': 'رابط الصورة',
    'article_content': 'محتوى المقال',
    'title_required': 'العنوان مطلوب',
    'image_required': 'رابط الصورة مطلوب',
    'content_required': 'المحتوى مطلوب',
    'add_article': 'إضافة المقال',
  }
};

const LANG_KEY = 'site_lang';

export function getBrowserLang(): SupportedLang {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    return lang.startsWith('ar') ? 'ar' : 'en';
  }
  return 'en';
}

export function getLang(): SupportedLang {
  // SSR-safe: fallback to 'en' if localStorage is not available
  if (typeof window === 'undefined') {
    return 'en';
  }
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'ar' || stored === 'en') {
      syncHtmlLangDir(stored);
      return stored;
    }
    const browserLang = getBrowserLang();
    localStorage.setItem(LANG_KEY, browserLang);
    syncHtmlLangDir(browserLang);
    return browserLang;
  } catch {
    return 'en';
  }
}

export function setLang(lang: SupportedLang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANG_KEY, lang);
    syncHtmlLangDir(lang);
  }
}

export function t(key: string): string {
  const lang = getLang();
  return translations[lang][key] || key;
}

// Helper for interpolating values in translation strings
export function tFormat(key: string, values: Record<string, string|number> = {}): string {
  const lang = getLang();
  let str = translations[lang][key] || key;
  Object.keys(values).forEach(k => {
    str = str.replace(`{${k}}`, String(values[k]));
  });
  return str;
}
