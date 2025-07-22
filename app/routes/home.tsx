import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import logoDark from '../logo-dark.svg';
import NewsCard from '../../src/components/NewsCard';
import LoginModal from '../../src/components/LoginModal';
import AddNewsModal from '../../src/components/AddNewsModal';
import { isLoggedIn, logout } from '../../src/utils/auth';
import newsDataEn from '../../src/data/news.json';
import newsDataAr from '../../src/data/news.ar.json';
import { t, getLang, setLang } from '../i18n/i18n';

export function meta() {
  return [
    { title: t('site_title') },
    { name: "description", content: t('site_description') },
  ];
}

interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
}

export default function Home() {
  const [lang, setLangState] = useState(getLang());
  const [articles, setArticles] = useState<Article[]>(getLang() === 'ar' ? newsDataAr : newsDataEn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const currentLang = getLang();
    setLangState(currentLang);
    setArticles(currentLang === 'ar' ? newsDataAr : newsDataEn);
  }, []);
  // ...existing code...

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    window.location.reload(); // Force refresh to update state
  };

  // ...existing code...

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    window.location.reload(); // Force refresh to update state
  };

  const handleAddArticle = (newArticle: { title: string; image: string; content: string }) => {
    const id = Math.max(...articles.map(a => a.id)) + 1;
    setArticles([{ ...newArticle, id }, ...articles]);
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className={`min-h-screen bg-gray-50${lang === 'ar' ? ' rtl' : ''}`}> 
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src={logo}
                className="block h-10 w-auto dark:hidden"
                draggable="false"
              />
              <img
                src={logoDark}
                className="hidden h-10 w-auto dark:block"
                draggable="false"
              />
              <div>
                <div className="text-gray-600 mt-1">{t('site_tagline')}</div>
              </div>
              <div className="ml-4 flex gap-2">
                {lang !== 'en' && (
                  <span
                    onClick={() => { setLang('en'); setLangState('en'); window.location.reload(); }}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      background: '#eee',
                      color: '#222',
                      fontWeight: 600,
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >English</span>
                )}
                {lang !== 'ar' && (
                  <span
                    onClick={() => { setLang('ar'); setLangState('ar'); window.location.reload(); }}
                    style={{
                      padding: '6px 16px',
                      borderRadius: '20px',
                      background: '#eee',
                      color: '#222',
                      fontWeight: 600,
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                  >العربية</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {loggedIn ? (
                <>
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer font-medium"
                  >
                    {t('add_news')}
                  </div>
                  <div 
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer font-medium"
                  >
                    {t('logout')}
                  </div>
                </>
              ) : (
                <div 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
                >
                  {t('login')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-2xl font-bold text-gray-500 mb-4">{t('no_articles')}</div>
            {loggedIn && (
              <div 
                onClick={() => setIsAddModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                {t('add_first_article')}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <NewsCard 
                key={article.id} 
                article={article} 
                onDelete={handleDeleteArticle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
      
      <AddNewsModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddArticle}
      />
    </div>
  );
}
