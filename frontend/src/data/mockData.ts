export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  trailerUrl?: string;
  videoUrl?: string;
  genres: string[];
  releaseYear: number;
  rating: number;
  isSeries: boolean;
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  videoUrl: string;
  duration: string;
}

export const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Cyberpunk: Edgerunners",
    description: "A Street Kid trying to survive in a technology and body modification-obsessed city of the future.",
    posterUrl: "https://picsum.photos/seed/cyberpunk/400/600",
    bannerUrl: "https://picsum.photos/seed/cyberpunk_banner/1920/1080",
    genres: ["Action", "Sci-Fi", "Anime"],
    releaseYear: 2022,
    rating: 8.3,
    isSeries: true,
    episodes: [
      { id: "e1", title: "Let You Down", episodeNumber: 1, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "24m" },
      { id: "e2", title: "Like A Boy", episodeNumber: 2, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "25m" },
    ]
  },
  {
    id: "2",
    title: "The Matrix Resurrections",
    description: "Return to a world of two realities: one, everyday life; the other, what lies behind it.",
    posterUrl: "https://picsum.photos/seed/matrix/400/600",
    bannerUrl: "https://picsum.photos/seed/matrix_banner/1920/1080",
    genres: ["Action", "Sci-Fi"],
    releaseYear: 2021,
    rating: 5.7,
    isSeries: false,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "3",
    title: "Dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    posterUrl: "https://picsum.photos/seed/dune/400/600",
    bannerUrl: "https://picsum.photos/seed/dune_banner/1920/1080",
    genres: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2021,
    rating: 8.0,
    isSeries: false,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "4",
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    posterUrl: "https://picsum.photos/seed/stranger/400/600",
    bannerUrl: "https://picsum.photos/seed/stranger_banner/1920/1080",
    genres: ["Drama", "Fantasy", "Horror"],
    releaseYear: 2016,
    rating: 8.7,
    isSeries: true,
    episodes: [
      { id: "s1e1", title: "Chapter One: The Vanishing of Will Byers", episodeNumber: 1, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", duration: "47m" },
    ]
  },
  {
    id: "5",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterUrl: "https://picsum.photos/seed/inception/400/600",
    bannerUrl: "https://picsum.photos/seed/inception_banner/1920/1080",
    genres: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2010,
    rating: 8.8,
    isSeries: false,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "6",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://picsum.photos/seed/interstellar/400/600",
    bannerUrl: "https://picsum.photos/seed/interstellar_banner/1920/1080",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    releaseYear: 2014,
    rating: 8.6,
    isSeries: false,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export const GENRES = ["Action", "Adventure", "Sci-Fi", "Drama", "Fantasy", "Horror", "Anime"];
