import { useState, useEffect } from 'react';
import logo from '../logo.svg';
import logoDark from '../logo-dark.svg';
import NewsCard from '../../src/components/NewsCard';
import LoginModal from '../../src/components/LoginModal';
import AddNewsModal from '../../src/components/AddNewsModal';
import { isLoggedIn, logout } from '../../src/utils/auth';
import newsData from '../../src/data/news.json';

export function meta() {
  return [
    { title: "News Hub - Stay Informed" },
    { name: "description", content: "Your premier destination for breaking news and insights" },
  ];
}

interface Article {
  id: number;
  title: string;
  image: string;
  content: string;
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>(newsData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    window.location.reload(); // Force refresh to update state
  };

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
    <div className="min-h-screen bg-gray-50">
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
                <div className="text-gray-600 mt-1">Your premier source for breaking news</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {loggedIn ? (
                <>
                  <div 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer font-medium"
                  >
                    Add News
                  </div>
                  <div 
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer font-medium"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <div 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
                >
                  Login
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
            <div className="text-2xl font-bold text-gray-500 mb-4">No articles available</div>
            {loggedIn && (
              <div 
                onClick={() => setIsAddModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Add the first article →
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
