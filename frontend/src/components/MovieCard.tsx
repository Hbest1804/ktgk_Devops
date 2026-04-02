import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';
import { Movie } from '../data/mockData';
import { motion } from 'motion/react';

interface MovieCardProps {
  key?: React.Key;
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="group relative rounded-xl overflow-hidden bg-gray-900 aspect-[2/3]"
    >
      <img 
        src={movie.posterUrl} 
        alt={movie.title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">{movie.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
          <span className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            {movie.rating}
          </span>
          <span>•</span>
          <span>{movie.releaseYear}</span>
        </div>
        <div className="flex gap-2">
          <Link 
            to={`/movie/${movie.id}`}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2 rounded-lg text-center text-sm font-medium transition-colors"
          >
            Details
          </Link>
          <Link 
            to={`/watch/${movie.id}`}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-1 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> Play
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
