import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
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
      <header className="relative z-10 p-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-red-600 tracking-tighter">
          MOVIEFLIX
        </Link>
        <Link to="/login" className="text-white font-medium hover:underline">
          Sign In
        </Link>
      </header>

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="bg-black/80 p-10 rounded-xl w-full max-w-md border border-white/10 backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-white mb-8">Đăng Ký</h1>

          {/* Thông báo lỗi */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-600/20 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              id="reg-name"
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              id="reg-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              autoComplete="email"
            />
            <input
              id="reg-password"
              type="password"
              placeholder="Mật khẩu (ít nhất 6 ký tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              autoComplete="new-password"
            />
            <input
              id="reg-confirm-password"
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              autoComplete="new-password"
            />

            <button
              id="reg-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-md transition-colors"
            >
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
            </button>
          </form>

          <div className="mt-10 text-gray-400">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-white hover:underline">
              Đăng nhập ngay.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
