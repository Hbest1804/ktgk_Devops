import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { MOCK_MOVIES } from '../data/mockData';

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const movie = MOCK_MOVIES.find(m => m.id === id);
  const episodeId = searchParams.get('episode');
  
  if (!movie) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Movie not found</div>;
  }

  let videoUrl = movie.videoUrl;
  let currentTitle = movie.title;

  if (movie.isSeries && movie.episodes) {
    const episode = episodeId 
      ? movie.episodes.find(e => e.id === episodeId)
      : movie.episodes[0];
      
    if (episode) {
      videoUrl = episode.videoUrl;
      currentTitle = `${movie.title} - Episode ${episode.episodeNumber}: ${episode.title}`;
    }
  }

  const recommendedMovies = MOCK_MOVIES.filter(m => m.id !== movie.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 z-50 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">{currentTitle}</h1>
      </div>

      {/* Video Player */}
      <div className="w-full h-screen bg-black flex items-center justify-center relative">
        {videoUrl ? (
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
            poster={movie.bannerUrl}
          />
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <Play className="w-16 h-16 mb-4 opacity-50" />
            <p>Video source not available</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedMovies.map(rec => (
            <Link 
              key={rec.id} 
              to={`/watch/${rec.id}`}
              className="group relative rounded-xl overflow-hidden aspect-video bg-gray-900"
            >
              <img 
                src={rec.bannerUrl} 
                alt={rec.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-12 h-12 fill-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <p className="font-medium text-sm truncate">{rec.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
