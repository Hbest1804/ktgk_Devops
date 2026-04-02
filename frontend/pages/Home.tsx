import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { MOCK_MOVIES } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { motion } from 'motion/react';

export default function Home() {
  const featuredMovie = MOCK_MOVIES[0];
  const newMovies = MOCK_MOVIES.slice(0, 4);
  const hotMovies = [...MOCK_MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const recommendedMovies = [...MOCK_MOVIES].reverse().slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Banner */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={featuredMovie.bannerUrl} 
            alt={featuredMovie.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              {featuredMovie.title}
            </h1>
            <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
              <span className="text-green-500 font-semibold">{featuredMovie.rating * 10}% Match</span>
              <span>{featuredMovie.releaseYear}</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">
                {featuredMovie.isSeries ? 'SERIES' : 'MOVIE'}
              </span>
            </div>
            <p className="text-lg text-gray-300 mb-8 line-clamp-3">
              {featuredMovie.description}
            </p>
            <div className="flex items-center gap-4">
              <Link 
                to={`/watch/${featuredMovie.id}`}
                className="bg-white text-black px-8 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" /> Play
              </Link>
              <Link 
                to={`/movie/${featuredMovie.id}`}
                className="bg-gray-500/50 text-white px-8 py-3 rounded-md font-bold flex items-center gap-2 hover:bg-gray-500/70 transition-colors backdrop-blur-sm"
              >
                <Info className="w-5 h-5" /> More Info
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Movie Lists */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 space-y-12">
        <MovieSection title="New Releases" movies={newMovies} />
        <MovieSection title="Trending Now" movies={hotMovies} />
        <MovieSection title="Recommended for You" movies={recommendedMovies} />
      </div>
    </div>
  );
}

function MovieSection({ title, movies }: { title: string, movies: typeof MOCK_MOVIES }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
