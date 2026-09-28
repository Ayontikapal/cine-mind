import { Movie } from '@/types/movie';

export const MOCK_MOVIES: Movie[] = [
  {
    id: 'm1',
    tmdb_id: 27205,
    title: 'Inception',
    description: 'Cobb, a skilled thief who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.',
    release_date: '2010-07-16',
    poster_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    cast: [
      { name: 'Leonardo DiCaprio', character: 'Dom Cobb' },
      { name: 'Joseph Gordon-Levitt', character: 'Arthur' },
      { name: 'Elliot Page', character: 'Ariadne' }
    ],
    directors: [{ name: 'Christopher Nolan' }],
    runtime: 148,
    rating: 8.4,
    language: 'en',
    tagline: 'Your mind is the scene of the crime.',
    trailer_url: 'https://www.youtube.com/watch?v=YoHD9XEInc0'
  },
  {
    id: 'm2',
    tmdb_id: 157336,
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival as Earth faces catastrophic famine and environmental collapse.',
    release_date: '2014-11-05',
    poster_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    cast: [
      { name: 'Matthew McConaughey', character: 'Cooper' },
      { name: 'Anne Hathaway', character: 'Brand' },
      { name: 'Jessica Chastain', character: 'Murph' }
    ],
    directors: [{ name: 'Christopher Nolan' }],
    runtime: 169,
    rating: 8.7,
    language: 'en',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    trailer_url: 'https://www.youtube.com/watch?v=zSWdZVtXT7E'
  },
  {
    id: 'm3',
    tmdb_id: 329865,
    title: 'Arrival',
    description: 'Linguistics professor Louise Banks leads an elite team of investigators when gigantic spaceships touch down in 12 locations around the world. As nations teeter on the brink of global war, Banks races against time to communicate with the extraterrestrial visitors.',
    release_date: '2016-11-11',
    poster_url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    cast: [
      { name: 'Amy Adams', character: 'Louise Banks' },
      { name: 'Jeremy Renner', character: 'Ian Donnelly' },
      { name: 'Forest Whitaker', character: 'Colonel Weber' }
    ],
    directors: [{ name: 'Denis Villeneuve' }],
    runtime: 116,
    rating: 7.9,
    language: 'en',
    tagline: 'Why are they here?',
    trailer_url: 'https://www.youtube.com/watch?v=tFMo3UJ4B4g'
  },
  {
    id: 'm4',
    tmdb_id: 335984,
    title: 'Blade Runner 2049',
    description: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what remains of society into chaos.',
    release_date: '2017-10-04',
    poster_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    cast: [
      { name: 'Ryan Gosling', character: 'K' },
      { name: 'Harrison Ford', character: 'Rick Deckard' },
      { name: 'Ana de Armas', character: 'Joi' }
    ],
    directors: [{ name: 'Denis Villeneuve' }],
    runtime: 164,
    rating: 8.0,
    language: 'en',
    tagline: 'There\'s still a page left to write.',
    trailer_url: 'https://www.youtube.com/watch?v=gCcx85zbxz4'
  },
  {
    id: 'm5',
    tmdb_id: 264660,
    title: 'Ex Machina',
    description: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.',
    release_date: '2014-12-16',
    poster_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Thriller'],
    cast: [
      { name: 'Domhnall Gleeson', character: 'Caleb' },
      { name: 'Alicia Vikander', character: 'Ava' },
      { name: 'Oscar Isaac', character: 'Nathan' }
    ],
    directors: [{ name: 'Alex Garland' }],
    runtime: 108,
    rating: 7.7,
    language: 'en',
    tagline: 'To erase the line between man and machine is to obscure the line between men and gods.',
    trailer_url: 'https://www.youtube.com/watch?v=EoQuVnKhxaM'
  },
  {
    id: 'm6',
    tmdb_id: 438631,
    title: 'Dune',
    description: 'A mythic and emotionally charged hero\'s journey, Dune tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding.',
    release_date: '2021-09-15',
    poster_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Adventure'],
    cast: [
      { name: 'Timothée Chalamet', character: 'Paul Atreides' },
      { name: 'Zendaya', character: 'Chani' },
      { name: 'Rebecca Ferguson', character: 'Lady Jessica' }
    ],
    directors: [{ name: 'Denis Villeneuve' }],
    runtime: 155,
    rating: 8.0,
    language: 'en',
    tagline: 'It begins.',
    trailer_url: 'https://www.youtube.com/watch?v=n9xhJrPXop4'
  },
  {
    id: 'm7',
    tmdb_id: 155,
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    release_date: '2008-07-16',
    poster_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Crime', 'Drama', 'Thriller'],
    cast: [
      { name: 'Christian Bale', character: 'Bruce Wayne' },
      { name: 'Heath Ledger', character: 'Joker' },
      { name: 'Aaron Eckhart', character: 'Harvey Dent' }
    ],
    directors: [{ name: 'Christopher Nolan' }],
    runtime: 152,
    rating: 8.5,
    language: 'en',
    tagline: 'Welcome to a world without rules.',
    trailer_url: 'https://www.youtube.com/watch?v=EXeTwQWrcwY'
  },
  {
    id: 'm8',
    tmdb_id: 693134,
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.',
    release_date: '2024-02-27',
    poster_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Adventure'],
    cast: [
      { name: 'Timothée Chalamet', character: 'Paul Atreides' },
      { name: 'Zendaya', character: 'Chani' },
      { name: 'Florence Pugh', character: 'Princess Irulan' }
    ],
    directors: [{ name: 'Denis Villeneuve' }],
    runtime: 166,
    rating: 8.3,
    language: 'en',
    tagline: 'Long live the fighters.',
    trailer_url: 'https://www.youtube.com/watch?v=Way9Dexny3w'
  },
  {
    id: 'm9',
    tmdb_id: 496243,
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    release_date: '2019-05-30',
    poster_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop',
    genres: ['Comedy', 'Drama', 'Thriller'],
    cast: [
      { name: 'Song Kang-ho', character: 'Kim Ki-taek' },
      { name: 'Lee Sun-kyun', character: 'Park Dong-ik' },
      { name: 'Cho Yeo-jeong', character: 'Park Yeon-kyo' }
    ],
    directors: [{ name: 'Bong Joon-ho' }],
    runtime: 132,
    rating: 8.5,
    language: 'ko',
    tagline: 'Act like you own the place.',
    trailer_url: 'https://www.youtube.com/watch?v=5xH0HfJHsaY'
  },
  {
    id: 'm10',
    tmdb_id: 372058,
    title: 'Your Name.',
    description: 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?',
    release_date: '2016-08-26',
    poster_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genres: ['Animation', 'Romance', 'Drama', 'Fantasy'],
    cast: [
      { name: 'Ryunosuke Kamiki', character: 'Taki Tachibana' },
      { name: 'Mone Kamishibai', character: 'Mitsuha Miyamizu' }
    ],
    directors: [{ name: 'Makoto Shinkai' }],
    runtime: 106,
    rating: 8.5,
    language: 'ja',
    tagline: 'I am looking for you, whom I have never met.',
    trailer_url: 'https://www.youtube.com/watch?v=xU47nhruN-Q'
  },
  {
    id: 'm11',
    tmdb_id: 508442,
    title: 'Soul',
    description: 'After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife.',
    release_date: '2020-12-25',
    poster_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop',
    genres: ['Animation', 'Comedy', 'Fantasy', 'Drama'],
    cast: [
      { name: 'Jamie Foxx', character: 'Joe Gardner' },
      { name: 'Tina Fey', character: '22' }
    ],
    directors: [{ name: 'Pete Docter' }],
    runtime: 100,
    rating: 8.2,
    language: 'en',
    tagline: 'Is all this living really worth dying for?',
    trailer_url: 'https://www.youtube.com/watch?v=Gs--6BVt8vU'
  },
  {
    id: 'm12',
    tmdb_id: 872585,
    title: 'Oppenheimer',
    description: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II and its dramatic political aftermath.',
    release_date: '2023-07-19',
    poster_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    backdrop_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1600&auto=format&fit=crop',
    genres: ['Drama', 'History'],
    cast: [
      { name: 'Cillian Murphy', character: 'J. Robert Oppenheimer' },
      { name: 'Emily Blunt', character: 'Katherine Oppenheimer' },
      { name: 'Matt Damon', character: 'Leslie Groves' }
    ],
    directors: [{ name: 'Christopher Nolan' }],
    runtime: 180,
    rating: 8.2,
    language: 'en',
    tagline: 'The world changes forever.',
    trailer_url: 'https://www.youtube.com/watch?v=uYPbbksJxIg'
  }
];

export const MOCK_WATCH_PROVIDERS: Record<number, any> = {
  27205: {
    flatrate: [
      { provider_id: 8, provider_name: 'Netflix', logo_path: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=120&auto=format&fit=crop', link: 'https://www.netflix.com' },
      { provider_id: 119, provider_name: 'Prime Video', logo_path: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop', link: 'https://www.primevideo.com' }
    ],
    rent: [
      { provider_id: 2, provider_name: 'Apple TV', logo_path: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=120&auto=format&fit=crop', link: 'https://tv.apple.com' }
    ]
  },
  157336: {
    flatrate: [
      { provider_id: 119, provider_name: 'Prime Video', logo_path: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=120&auto=format&fit=crop', link: 'https://www.primevideo.com' },
      { provider_id: 337, provider_name: 'Paramount+', logo_path: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=120&auto=format&fit=crop', link: 'https://www.paramountplus.com' }
    ]
  }
};
