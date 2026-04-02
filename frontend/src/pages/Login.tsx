import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Background */}
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

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="bg-black/80 p-10 rounded-xl w-full max-w-md border border-white/10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>

          {/* Thông báo lỗi */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-600/20 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                id="login-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <input
                id="login-password"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-md transition-colors"
            >
              {loading ? 'Đang đăng nhập...' : 'Sign In'}
            </button>

            <div className="flex justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded bg-gray-800 border-gray-700 text-red-600 focus:ring-red-500" />
                Ghi nhớ đăng nhập
              </label>
              <a href="#" className="hover:underline">Cần hỗ trợ?</a>
            </div>
          </form>

          <div className="mt-10 text-gray-400">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-white hover:underline">
              Đăng ký ngay.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
