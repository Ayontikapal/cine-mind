import { Movie, MovieWatchProviders } from '@/types/movie';
import { MOCK_MOVIES, MOCK_WATCH_PROVIDERS } from './mock-data';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export class TMDBClient {
  private static formatMovie(tmdbMovie: any): Movie {
    const posterPath = tmdbMovie.poster_path
      ? `${IMAGE_BASE_URL}/w500${tmdbMovie.poster_path}`
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop';

    const backdropPath = tmdbMovie.backdrop_path
      ? `${IMAGE_BASE_URL}/w1280${tmdbMovie.backdrop_path}`
      : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop';

    const genres = tmdbMovie.genres
      ? tmdbMovie.genres.map((g: any) => g.name)
      : tmdbMovie.genre_ids ? tmdbMovie.genre_ids.map(genreIdToString) : ['Drama'];

    const cast = tmdbMovie.credits?.cast
      ? tmdbMovie.credits.cast.slice(0, 5).map((c: any) => ({
          name: c.name,
          character: c.character,
          profile_path: c.profile_path ? `${IMAGE_BASE_URL}/w185${c.profile_path}` : null,
        }))
      : [];

    const directors = tmdbMovie.credits?.crew
      ? tmdbMovie.credits.crew
          .filter((c: any) => c.job === 'Director')
          .map((c: any) => ({
            name: c.name,
            profile_path: c.profile_path ? `${IMAGE_BASE_URL}/w185${c.profile_path}` : null,
          }))
      : [];

    return {
      id: `tmdb_${tmdbMovie.id}`,
      tmdb_id: tmdbMovie.id,
      title: tmdbMovie.title || tmdbMovie.name || 'Untitled',
      description: tmdbMovie.overview || 'No overview available.',
      release_date: tmdbMovie.release_date || tmdbMovie.first_air_date || '2024-01-01',
      poster_url: posterPath,
      backdrop_url: backdropPath,
      genres,
      cast,
      directors,
      runtime: tmdbMovie.runtime || 120,
      rating: tmdbMovie.vote_average ? Number(tmdbMovie.vote_average.toFixed(1)) : 7.5,
      language: tmdbMovie.original_language || 'en',
      tagline: tmdbMovie.tagline || '',
    };
  }

  static async getTrending(): Promise<Movie[]> {
    if (!TMDB_API_KEY) {
      return MOCK_MOVIES;
    }
    try {
      const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error('Failed TMDB request');
      const data = await res.json();
      return data.results.map((m: any) => this.formatMovie(m));
    } catch (err) {
      console.warn('TMDB fetch failed, falling back to seed mock movies:', err);
      return MOCK_MOVIES;
    }
  }

  static async getMovieById(id: string | number): Promise<Movie | null> {
    const tmdbId = typeof id === 'string' && id.startsWith('tmdb_') ? id.replace('tmdb_', '') : id;
    
    // Check mock data first
    const mock = MOCK_MOVIES.find(m => m.id === id || m.tmdb_id === Number(tmdbId));
    if (mock) return mock;

    if (!TMDB_API_KEY) {
      return MOCK_MOVIES[0];
    }

    try {
      const res = await fetch(`${BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`, { next: { revalidate: 3600 } });
      if (!res.ok) return MOCK_MOVIES[0];
      const data = await res.json();
      const movie = this.formatMovie(data);
      if (data.videos?.results?.length > 0) {
        const trailer = data.videos.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || data.videos.results[0];
        if (trailer) {
          movie.trailer_url = `https://www.youtube.com/watch?v=${trailer.key}`;
        }
      }
      return movie;
    } catch {
      return MOCK_MOVIES[0];
    }
  }

  static async searchMovies(query: string): Promise<Movie[]> {
    if (!query) return MOCK_MOVIES;
    
    if (!TMDB_API_KEY) {
      const q = query.toLowerCase();
      return MOCK_MOVIES.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.description.toLowerCase().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q))
      );
    }

    try {
      const res = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      return data.results.map((m: any) => this.formatMovie(m));
    } catch {
      const q = query.toLowerCase();
      return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(q));
    }
  }

  static async getWatchProviders(tmdbId: number): Promise<MovieWatchProviders | null> {
    if (MOCK_WATCH_PROVIDERS[tmdbId]) {
      return MOCK_WATCH_PROVIDERS[tmdbId];
    }

    if (!TMDB_API_KEY) {
      return null;
    }

    try {
      const res = await fetch(`${BASE_URL}/movie/${tmdbId}/watch/providers?api_key=${TMDB_API_KEY}`);
      if (!res.ok) return null;
      const data = await res.json();
      const usProviders = data.results?.US || data.results?.GB || Object.values(data.results || {})[0];
      if (!usProviders) return null;
      
      const formatProv = (arr: any[]) => arr?.map((p: any) => ({
        provider_id: p.provider_id,
        provider_name: p.provider_name,
        logo_path: `${IMAGE_BASE_URL}/w92${p.logo_path}`,
        display_priority: p.display_priority,
        link: usProviders.link,
      }));

      return {
        flatrate: formatProv(usProviders.flatrate),
        rent: formatProv(usProviders.rent),
        buy: formatProv(usProviders.buy),
        link: usProviders.link,
      };
    } catch {
      return null;
    }
  }
}

function genreIdToString(id: number): string {
  const map: Record<number, string> = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
  };
  return map[id] || 'Drama';
}
