import { MOCK_MOVIES } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { User, Settings, Clock, Heart } from 'lucide-react';

export default function Profile() {
  const watchHistory = MOCK_MOVIES.slice(0, 3);
  const favoriteMovies = MOCK_MOVIES.slice(3, 6);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 border-b border-white/10 pb-12">
          <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700">
            <User className="w-16 h-16 text-gray-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">John Doe</h1>
            <p className="text-gray-400 mb-6">john.doe@example.com</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" /> Edit Profile
              </button>
              <button className="bg-red-600/10 text-red-500 hover:bg-red-600/20 px-6 py-2 rounded-md font-medium transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Watch History */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Continue Watching</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchHistory.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Favorites */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h2 className="text-2xl font-bold">My List</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favoriteMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
