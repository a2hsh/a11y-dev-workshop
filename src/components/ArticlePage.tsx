import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import newsDataEn from '../data/news.json';
import newsDataAr from '../data/news.ar.json';
import { getLang } from '../../app/i18n/i18n';
import { t } from '../../app/i18n/i18n';

interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
}

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const articleId = parseInt(id || '0');
    const lang = getLang();
    const newsData = lang === 'ar' ? newsDataAr : newsDataEn;
    const found = newsData.find(a => a.id === articleId);
    if (found) {
      setArticle(found);
    }
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">{t('article_not_found')}</div>
          <div 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            ← {t('back_to_home')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div 
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800 cursor-pointer mb-8 inline-flex items-center"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="mr-2"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          {t('back_to_home')}
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={article.image} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="text-3xl font-bold text-gray-900 mb-6">
              {article.title}
            </div>
            <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
