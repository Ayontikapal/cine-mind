import { Movie } from '@/types/movie';
import { MOCK_MOVIES } from '../tmdb/mock-data';

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export class OMDBClient {
  private static formatMovie(omdbItem: any): Movie {
    const poster = omdbItem.Poster && omdbItem.Poster !== 'N/A'
      ? omdbItem.Poster
      : 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop';

    const genres = omdbItem.Genre && omdbItem.Genre !== 'N/A'
      ? omdbItem.Genre.split(',').map((g: string) => g.trim())
      : ['Drama'];

    const directors = omdbItem.Director && omdbItem.Director !== 'N/A'
      ? omdbItem.Director.split(',').map((d: string) => ({ name: d.trim() }))
      : [];

    const cast = omdbItem.Actors && omdbItem.Actors !== 'N/A'
      ? omdbItem.Actors.split(',').map((a: string) => ({ name: a.trim(), character: 'Lead' }))
      : [];

    const runtimeMatch = omdbItem.Runtime ? omdbItem.Runtime.match(/\d+/) : null;
    const runtime = runtimeMatch ? parseInt(runtimeMatch[0], 10) : 120;

    const rating = omdbItem.imdbRating && omdbItem.imdbRating !== 'N/A'
      ? parseFloat(omdbItem.imdbRating)
      : 7.8;

    return {
      id: `omdb_${omdbItem.imdbID || Date.now()}`,
      tmdb_id: omdbItem.imdbID ? parseInt(omdbItem.imdbID.replace(/\D/g, ''), 10) || 101 : 101,
      title: omdbItem.Title || 'Untitled',
      description: omdbItem.Plot && omdbItem.Plot !== 'N/A' ? omdbItem.Plot : 'No detailed plot available.',
      release_date: omdbItem.Released && omdbItem.Released !== 'N/A' ? new Date(omdbItem.Released).toISOString().split('T')[0] : (omdbItem.Year || '2024'),
      poster_url: poster,
      backdrop_url: poster,
      genres,
      cast,
      directors,
      runtime,
      rating,
      language: omdbItem.Language ? omdbItem.Language.split(',')[0].trim() : 'en',
      tagline: omdbItem.Awards && omdbItem.Awards !== 'N/A' ? `Awards: ${omdbItem.Awards}` : '',
    };
  }

  static async searchMovies(query: string): Promise<Movie[]> {
    if (!OMDB_API_KEY || !query.trim()) {
      const q = query.toLowerCase();
      return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(q) || m.genres.some(g => g.toLowerCase().includes(q)));
    }

    try {
      const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
      if (!res.ok) throw new Error('OMDb search failed');
      const data = await res.json();
      if (data.Response === 'False' || !data.Search) {
        return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
      }

      // Fetch detailed data for top search results
      const detailedPromises = data.Search.slice(0, 8).map((item: any) => this.getMovieByImdbId(item.imdbID));
      const results = await Promise.all(detailedPromises);
      return results.filter((m): m is Movie => m !== null);
    } catch (err) {
      console.warn('OMDb search error, falling back to mock dataset:', err);
      const q = query.toLowerCase();
      return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(q));
    }
  }

  static async getMovieByImdbId(imdbId: string): Promise<Movie | null> {
    if (!OMDB_API_KEY) return null;
    try {
      const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`);
      if (!res.ok) return null;
      const data = await res.json();
      if (data.Response === 'False') return null;
      return this.formatMovie(data);
    } catch {
      return null;
    }
  }

  static async getMovieByTitle(title: string): Promise<Movie | null> {
    if (!OMDB_API_KEY) return null;
    try {
      const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&plot=full`);
      if (!res.ok) return null;
      const data = await res.json();
      if (data.Response === 'False') return null;
      return this.formatMovie(data);
    } catch {
      return null;
    }
  }
}
