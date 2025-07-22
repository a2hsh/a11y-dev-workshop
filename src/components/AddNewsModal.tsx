import React from 'react';
import { useState } from 'react';
import Modal from './Modal';
import { t } from '../../app/i18n/i18n';

interface AddNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (article: { title: string; image: string; content: string }) => void;
}

export default function AddNewsModal({ isOpen, onClose, onAdd }: AddNewsModalProps) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({ title: '', image: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { title: '', image: '', content: '' };
    if (!title) {
      newErrors.title = t('title_required');
    }
    if (!image) {
      newErrors.image = t('image_required');
    }
    if (!content) {
      newErrors.content = t('content_required');
    }
    
    setErrors(newErrors);
    
    if (newErrors.title || newErrors.image || newErrors.content) {
      return;
    }
    
    onAdd({ title, image, content });
    setTitle('');
    setImage('');
    setContent('');
    setErrors({ title: '', image: '', content: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-2xl font-bold text-gray-900 mb-6">{t('add_news_article')}</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder={t('article_title')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <div className="text-red-500 text-sm mt-1">{errors.title}</div>
            )}
          </div>
          <div>
            <input
              type="url"
              placeholder={t('image_url')}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.image ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.image && (
              <div className="text-red-500 text-sm mt-1">{errors.image}</div>
            )}
          </div>
          <div>
            <textarea
              rows={4}
              placeholder={t('article_content')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.content && (
              <div className="text-red-500 text-sm mt-1">{errors.content}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {t('add_article')}
          </button>
        </form>
      </div>
    </Modal>
  );
}
