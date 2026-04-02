import { useSearchParams } from 'react-router-dom';
import { MOCK_MOVIES, GENRES } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const selectedGenre = searchParams.get('genre') || '';

  const filteredMovies = MOCK_MOVIES.filter(movie => {
    const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) || (selectedGenre === 'Series' && movie.isSeries) : true;
    return matchesQuery && matchesGenre;
  });

  const handleGenreClick = (genre: string) => {
    if (genre === selectedGenre) {
      searchParams.delete('genre');
    } else {
      searchParams.set('genre', genre);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">
            {query ? `Search results for "${query}"` : 'Explore Movies & Series'}
          </h1>
          
          {/* Mobile Search Input (visible only on small screens) */}
          <div className="md:hidden relative mb-6">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => {
                if (e.target.value) {
                  searchParams.set('q', e.target.value);
                } else {
                  searchParams.delete('q');
                }
                setSearchParams(searchParams);
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Genre Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleGenreClick('Series')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedGenre === 'Series' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              TV Series
            </button>
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === genre 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-xl font-medium">No titles found</h2>
            <p className="mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
