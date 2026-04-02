import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-red-600 tracking-tighter">
              MOVIEFLIX
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <Link to="/search" className="hover:text-white transition-colors">Movies</Link>
              <Link to="/about" className="hover:text-white text-red-500 font-bold transition-colors">Thông tin SV</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-full py-1.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:bg-black/50 transition-all w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  {/* Tên user */}
                  <span className="hidden md:block text-sm text-gray-300 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                  {isAdmin && (
                    <Link to="/admin" className="text-gray-300 hover:text-white transition-colors" title="Admin">
                      <Settings className="w-5 h-5" />
                    </Link>
                  )}
                  <Link to="/profile" className="text-gray-300 hover:text-white transition-colors" title="Hồ sơ">
                    <User className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
