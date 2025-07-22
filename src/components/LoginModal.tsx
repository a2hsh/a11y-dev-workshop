import React, { useState } from 'react';
import Modal from './Modal';
import { login } from '../utils/auth';
import { t } from '../../app/i18n/i18n';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { username: '', password: '' };
    if (!username) {
      newErrors.username = t('username_required');
    }
    if (!password) {
      newErrors.password = t('password_required');
    }
    
    setErrors(newErrors);
    
    if (newErrors.username || newErrors.password) {
      return;
    }
    
    if (login(username, password)) {
      setUsername('');
      setPassword('');
      setErrors({ username: '', password: '' });
      onSuccess();
      onClose();
    } else {
      setErrors({ username: t('invalid_credentials'), password: t('invalid_credentials') });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="text-2xl font-bold text-gray-900 mb-6">{t('login')}</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder={t('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1">{errors.username}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {t('login')}
          </button>
        </form>
      </div>
    </Modal>
  );
}
