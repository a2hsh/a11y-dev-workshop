import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { isLoggedIn } from '../../src/utils/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</div>
          <div className="text-gray-600">Please sign in to continue</div>
        </div>
        
        <div className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center cursor-pointer"
          >
            Sign In
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account? <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Sign up</span>
        </div>
      </div>
    </div>
  );
}
