import { Movie } from './movie';

export interface ScoringWeights {
  semantic_similarity: number;   // default: 0.35
  genre_compatibility: number;   // default: 0.20
  actor_director_comp: number;   // default: 0.15
  search_intent_sim: number;     // default: 0.10
  interaction_similarity: number;// default: 0.10
  recency_context: number;       // default: 0.05
  popularity: number;            // default: 0.05
}

export interface RecommendationScoreBreakdown {
  total_score: number; // 0 - 1
  match_percentage: number; // 0 - 100
  semantic_score: number;
  genre_score: number;
  cast_crew_score: number;
  intent_score: number;
  interaction_score: number;
  recency_score: number;
  popularity_score: number;
}

export interface RecommendationItem {
  id: string;
  movie: Movie;
  match_percentage: number;
  score: number;
  reason: string;
  score_breakdown?: RecommendationScoreBreakdown;
  created_at?: string;
}

export interface CurrentIntent {
  query?: string;
  temporary_genres?: string[];
  mood?: string;
  timestamp?: number;
}
