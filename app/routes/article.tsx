import ArticlePage from '../../src/components/ArticlePage';
import newsDataEn from '../../src/data/news.json';
import newsDataAr from '../../src/data/news.ar.json';
import { getLang } from '../i18n/i18n';

export function meta({ params }: { params: { id?: string } }) {
  const lang = getLang();
  const newsData = lang === 'ar' ? newsDataAr : newsDataEn;
  const article = newsData.find(a => a.id === Number(params.id));
  return [
    { title: article ? `${article.title} - News Hub` : (lang === 'ar' ? 'مقال - مركز الأخبار' : 'Article - News Hub') },
    { name: 'description', content: article ? article.content.slice(0, 150) : (lang === 'ar' ? 'صفحة مقال إخباري' : 'News article page') }
  ];
}

export default function Article() {
  return <ArticlePage />;
}
