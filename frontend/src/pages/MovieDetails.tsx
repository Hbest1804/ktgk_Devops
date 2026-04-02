import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Star } from 'lucide-react';
import { MOCK_MOVIES } from '../data/mockData';
import { motion } from 'motion/react';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const movie = MOCK_MOVIES.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Movie not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Banner */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={movie.bannerUrl} 
            alt={movie.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-64 shrink-0 mx-auto md:mx-0"
          >
            <img 
              src={movie.posterUrl} 
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 pt-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
              <span className="text-green-500 font-semibold">{movie.rating * 10}% Match</span>
              <span>{movie.releaseYear}</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">
                {movie.isSeries ? 'SERIES' : 'MOVIE'}
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                {movie.rating}/10
              </div>
            </div>

            <p className="text-lg text-gray-300 mb-8 max-w-3xl leading-relaxed">
              {movie.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <Link 
                to={`/watch/${movie.id}`}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-bold flex items-center gap-2 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" /> Play
              </Link>
              <button className="w-12 h-12 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                <Plus className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full border-2 border-gray-500 flex items-center justify-center hover:border-white transition-colors">
                <ThumbsUp className="w-6 h-6" />
              </button>
            </div>

            <div className="text-sm text-gray-400">
              <span className="text-gray-500">Genres:</span>{' '}
              {movie.genres.join(', ')}
            </div>
          </motion.div>
        </div>

        {/* Episodes List (if series) */}
        {movie.isSeries && movie.episodes && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">Episodes</h2>
            <div className="space-y-4">
              {movie.episodes.map((episode) => (
                <Link 
                  key={episode.id}
                  to={`/watch/${movie.id}?episode=${episode.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/10"
                >
                  <div className="text-2xl font-bold text-gray-600 w-12 text-center">
                    {episode.episodeNumber}
                  </div>
                  <div className="relative w-40 aspect-video rounded-lg overflow-hidden shrink-0 bg-gray-800">
                    <img 
                      src={movie.bannerUrl} 
                      alt={episode.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-black/50 border border-white flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-red-500 transition-colors">{episode.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{movie.description}</p>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {episode.duration}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
