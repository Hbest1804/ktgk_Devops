import { useState } from 'react';
import { MOCK_MOVIES } from '../data/mockData';
import { Plus, Edit, Trash2, Video, Image as ImageIcon } from 'lucide-react';

export default function Admin() {
  const [movies, setMovies] = useState(MOCK_MOVIES);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Movie
          </button>
        </div>

        <div className="bg-black rounded-xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Movie</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Year</th>
                  <th className="px-6 py-4 font-medium">Rating</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {movies.map(movie => (
                  <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img 
                          src={movie.posterUrl} 
                          alt={movie.title} 
                          className="w-12 h-16 object-cover rounded bg-gray-800"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="font-bold">{movie.title}</div>
                          <div className="text-sm text-gray-400">{movie.genres.join(', ')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${movie.isSeries ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                        {movie.isSeries ? 'Series' : 'Movie'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{movie.releaseYear}</td>
                    <td className="px-6 py-4 text-gray-300">{movie.rating}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Upload Video">
                          <Video className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors" title="Change Poster">
                          <ImageIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(movie.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
