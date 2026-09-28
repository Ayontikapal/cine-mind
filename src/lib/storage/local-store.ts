import { UserPreferences, UserInteraction, InteractionType } from '@/types/user';
import { RecommendationItem } from '@/types/recommendation';
import { BrowserEventSignal } from '@/types/browser';
import { MOCK_MOVIES } from '../tmdb/mock-data';

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  favorite_genres: ['Sci-Fi', 'Thriller', 'Mystery', 'Drama'],
  favorite_actors: ['Leonardo DiCaprio', 'Amy Adams', 'Ryan Gosling', 'Timothée Chalamet'],
  favorite_directors: ['Christopher Nolan', 'Denis Villeneuve', 'Alex Garland'],
  preferred_languages: ['en'],
  profile_summary: 'Loves cerebral sci-fi, complex narratives, atmospheric thrillers, and philosophical questions about humanity and technology.',
  genre_affinity: {
    'Sci-Fi': 94,
    'Thriller': 84,
    'Mystery': 78,
    'Drama': 73,
    'Action': 62,
    'Comedy': 41,
    'Romance': 35,
    'Horror': 25,
  },
  dna_metrics: {
    story_complexity: 88,
    emotional_depth: 82,
    action_preference: 65,
    romance_preference: 38,
    animation_preference: 45,
  },
  themes: ['space', 'time travel', 'artificial intelligence', 'psychological puzzle', 'existential crisis'],
};

const STORAGE_KEYS = {
  USER: 'cinemind_user',
  PREFERENCES: 'cinemind_preferences',
  WATCHLIST: 'cinemind_watchlist',
  INTERACTIONS: 'cinemind_interactions',
  SEARCHES: 'cinemind_searches',
  BROWSER_EVENTS: 'cinemind_browser_events',
  CURRENT_INTENT: 'cinemind_current_intent',
};

export class LocalStore {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  static getUser() {
    if (!this.isClient()) return { id: 'demo-user-123', email: 'alex.cinephile@example.com', display_name: 'Alex Cinephile' };
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (!saved) {
      const defaultUser = { id: 'demo-user-123', email: 'alex.cinephile@example.com', display_name: 'Alex Cinephile' };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
      return defaultUser;
    }
    return JSON.parse(saved);
  }

  static setUser(user: any) {
    if (!this.isClient()) return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  static clearUser() {
    if (!this.isClient()) return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  static getPreferences(): UserPreferences {
    if (!this.isClient()) return DEFAULT_USER_PREFERENCES;
    const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!saved) {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(DEFAULT_USER_PREFERENCES));
      return DEFAULT_USER_PREFERENCES;
    }
    return JSON.parse(saved);
  }

  static setPreferences(prefs: UserPreferences) {
    if (!this.isClient()) return;
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  }

  static getWatchlist(): string[] {
    if (!this.isClient()) return ['m1', 'm2', 'm4'];
    const saved = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
    if (!saved) {
      const initial = ['m1', 'm2', 'm4'];
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(saved);
  }

  static toggleWatchlist(movieId: string): boolean {
    const list = this.getWatchlist();
    const index = list.indexOf(movieId);
    let added = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(movieId);
      added = true;
    }
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(list));
    }
    return added;
  }

  static getInteractions(): UserInteraction[] {
    if (!this.isClient()) return [
      { id: 'i1', user_id: 'demo-user-123', movie_id: 'm1', interaction_type: 'like' as InteractionType, created_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 'i2', user_id: 'demo-user-123', movie_id: 'm2', interaction_type: 'rating' as InteractionType, rating: 5, created_at: new Date(Date.now() - 86400000).toISOString() },
    ];
    const saved = localStorage.getItem(STORAGE_KEYS.INTERACTIONS);
    if (!saved) {
      const initial: UserInteraction[] = [
        { id: 'i1', user_id: 'demo-user-123', movie_id: 'm1', interaction_type: 'like' as InteractionType, created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: 'i2', user_id: 'demo-user-123', movie_id: 'm2', interaction_type: 'rating' as InteractionType, rating: 5, created_at: new Date(Date.now() - 86400000).toISOString() },
      ];
      localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(saved);
  }

  static recordInteraction(interaction: Omit<UserInteraction, 'id' | 'created_at'>) {
    const current = this.getInteractions();
    const newInteraction: UserInteraction = {
      ...interaction,
      id: 'i_' + Date.now(),
      created_at: new Date().toISOString(),
    };
    current.unshift(newInteraction);
    if (this.isClient()) {
      localStorage.setItem(STORAGE_KEYS.INTERACTIONS, JSON.stringify(current));
    }
    return newInteraction;
  }

  static clearHistory() {
    if (!this.isClient()) return;
    localStorage.removeItem(STORAGE_KEYS.INTERACTIONS);
    localStorage.removeItem(STORAGE_KEYS.SEARCHES);
    localStorage.removeItem(STORAGE_KEYS.BROWSER_EVENTS);
  }

  static saveSearch(query: string, source = 'web') {
    if (!this.isClient()) return;
    const saved = localStorage.getItem(STORAGE_KEYS.SEARCHES);
    const searches = saved ? JSON.parse(saved) : [];
    searches.unshift({ id: 's_' + Date.now(), query, source, created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.SEARCHES, JSON.stringify(searches.slice(0, 50)));
  }

  static getSearches() {
    if (!this.isClient()) return [];
    const saved = localStorage.getItem(STORAGE_KEYS.SEARCHES);
    return saved ? JSON.parse(saved) : [];
  }

  static saveBrowserEvent(event: BrowserEventSignal) {
    if (!this.isClient()) return;
    const saved = localStorage.getItem(STORAGE_KEYS.BROWSER_EVENTS);
    const events = saved ? JSON.parse(saved) : [];
    events.unshift({ ...event, id: 'b_' + Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.BROWSER_EVENTS, JSON.stringify(events.slice(0, 100)));
  }

  static getBrowserEvents(): BrowserEventSignal[] {
    if (!this.isClient()) return [];
    const saved = localStorage.getItem(STORAGE_KEYS.BROWSER_EVENTS);
    return saved ? JSON.parse(saved) : [];
  }

  static setCurrentIntent(intent: { query?: string; temporary_genres?: string[]; mood?: string; timestamp?: number }) {
    if (!this.isClient()) return;
    localStorage.setItem(STORAGE_KEYS.CURRENT_INTENT, JSON.stringify({ ...intent, timestamp: Date.now() }));
  }

  static getCurrentIntent() {
    if (!this.isClient()) return null;
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_INTENT);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (Date.now() - (parsed.timestamp || 0) > 2 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_INTENT);
      return null;
    }
    return parsed;
  }
}
