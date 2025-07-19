import React from 'react';
import { useNavigate } from 'react-router';
import IconButton from './IconButton';
import { isLoggedIn } from '../utils/auth';

interface NewsCardProps {
  article: {
    id: number;
    title: string;
    image: string;
    content: string;
  };
  onDelete: (id: number) => void;
}

export default function NewsCard({ article, onDelete }: NewsCardProps) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleCardClick = () => {
    navigate(`/article/${article.id}`);
  };

  const handleDeleteClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onDelete(article.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group relative"
    >
      {loggedIn && (
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton onClick={handleDeleteClick} />
        </div>
      )}
      
      <div className="aspect-video overflow-hidden">
        <img 
          src={article.image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="text-xl font-semibold text-gray-400 mb-3 line-clamp-2">
          {article.title}
        </div>
        
        <div className="text-gray-300 text-sm mb-4 line-clamp-3">
          {article.content.length > 100 ? `${article.content.substring(0, 100)}...` : article.content}
        </div>
        
        <div className="text-gray-500 text-sm font-medium hover:text-gray-400 transition-colors">
          Read More →
        </div>
      </div>
    </div>
  );
}
