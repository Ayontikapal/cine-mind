export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DNAMetrics {
  story_complexity: number; // 0-100
  emotional_depth: number;  // 0-100
  action_preference: number;// 0-100
  romance_preference: number;// 0-100
  animation_preference: number; // 0-100
}

export interface UserPreferences {
  favorite_genres: string[];
  favorite_actors: string[];
  favorite_directors: string[];
  preferred_languages: string[];
  profile_summary: string;
  genre_affinity: Record<string, number>; // e.g. { "Sci-Fi": 94, "Drama": 75 }
  dna_metrics: DNAMetrics;
  themes?: string[];
}

export type InteractionType = 'like' | 'dislike' | 'view' | 'rating' | 'watchlist_add' | 'watchlist_remove';

export interface UserInteraction {
  id: string;
  user_id: string;
  movie_id: string;
  interaction_type: InteractionType;
  rating?: number; // 1-5
  created_at: string;
}
