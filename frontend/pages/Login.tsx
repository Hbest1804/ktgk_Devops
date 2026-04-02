import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    localStorage.setItem('isLoggedIn', 'true');
    if (email === 'admin@movieflix.com') {
      localStorage.setItem('isAdmin', 'true');
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/movieflix_bg/1920/1080" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link to="/" className="text-3xl font-bold text-red-600 tracking-tighter">
          MOVIEFLIX
        </Link>
      </header>

      {/* Login Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="bg-black/80 p-10 rounded-xl w-full max-w-md border border-white/10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition-colors"
            >
              Sign In
            </button>
            
            <div className="flex justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded bg-gray-800 border-gray-700 text-red-600 focus:ring-red-500" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Need help?</a>
            </div>
          </form>

          <div className="mt-10 text-gray-400">
            New to MovieFlix?{' '}
            <Link to="/register" className="text-white hover:underline">
              Sign up now.
            </Link>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
          </div>
        </div>
      </div>
    </div>
  );
}
