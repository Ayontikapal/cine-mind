import { Movie } from '@/types/movie';
import { UserPreferences, UserInteraction } from '@/types/user';
import { ScoringWeights, RecommendationScoreBreakdown, CurrentIntent } from '@/types/recommendation';
import { VectorService } from '../ai/vector-service';

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  semantic_similarity: 0.35,
  genre_compatibility: 0.20,
  actor_director_comp: 0.15,
  search_intent_sim: 0.10,
  interaction_similarity: 0.10,
  recency_context: 0.05,
  popularity: 0.05,
};

export class RecommendationScorer {
  static async scoreMovie(
    movie: Movie,
    preferences: UserPreferences,
    interactions: UserInteraction[],
    currentIntent?: CurrentIntent | null,
    weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
  ): Promise<RecommendationScoreBreakdown> {
    // 1. Semantic Similarity (35%)
    const movieText = `${movie.title}: ${movie.description} ${movie.genres.join(' ')} ${movie.tagline || ''}`;
    const profileText = `${preferences.profile_summary} ${preferences.favorite_genres.join(' ')} ${preferences.themes?.join(' ') || ''}`;
    
    const movieVec = await VectorService.getEmbedding(movieText);
    const profileVec = await VectorService.getEmbedding(profileText);
    const semanticScore = VectorService.cosineSimilarity(movieVec, profileVec);

    // 2. Genre Compatibility (20%)
    let genreScore = 0;
    if (movie.genres.length > 0) {
      const affinities = movie.genres.map(g => {
        if (currentIntent?.temporary_genres?.includes(g)) return 1.0;
        const affinityPct = preferences.genre_affinity?.[g] ?? (preferences.favorite_genres.includes(g) ? 80 : 30);
        return affinityPct / 100;
      });
      genreScore = affinities.reduce((a, b) => a + b, 0) / affinities.length;
    }

    // 3. Actor & Director Compatibility (15%)
    let castCrewScore = 0;
    const hasFavDirector = movie.directors?.some(d => preferences.favorite_directors.includes(d.name));
    const hasFavActor = movie.cast?.some(c => preferences.favorite_actors.includes(c.name));
    if (hasFavDirector && hasFavActor) castCrewScore = 1.0;
    else if (hasFavDirector) castCrewScore = 0.85;
    else if (hasFavActor) castCrewScore = 0.70;
    else castCrewScore = 0.20;

    // 4. Search Intent Similarity (10%)
    let intentScore = 0.5;
    if (currentIntent?.query) {
      const intentVec = await VectorService.getEmbedding(currentIntent.query);
      intentScore = VectorService.cosineSimilarity(movieVec, intentVec);
    }

    // 5. Previous Interaction Similarity (10%)
    let interactionScore = 0.5;
    if (interactions.length > 0) {
      const likedMovieIds = interactions
        .filter(i => i.interaction_type === 'like' || (i.interaction_type === 'rating' && (i.rating || 0) >= 4))
        .map(i => i.movie_id);

      const dislikedMovieIds = interactions
        .filter(i => i.interaction_type === 'dislike' || (i.interaction_type === 'rating' && (i.rating || 0) <= 2))
        .map(i => i.movie_id);

      if (likedMovieIds.includes(movie.id)) interactionScore = 0.95;
      else if (dislikedMovieIds.includes(movie.id)) interactionScore = 0.05;
      else interactionScore = 0.65;
    }

    // 6. Recency / Context (5%)
    const releaseYear = new Date(movie.release_date).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearDiff = currentYear - releaseYear;
    const recencyScore = yearDiff <= 2 ? 1.0 : yearDiff <= 10 ? 0.8 : 0.6;

    // 7. Popularity (5%)
    const popularityScore = Math.min(movie.rating / 10, 1.0);

    // Weighted Sum calculation
    const totalScore = (
      semanticScore * weights.semantic_similarity +
      genreScore * weights.genre_compatibility +
      castCrewScore * weights.actor_director_comp +
      intentScore * weights.search_intent_sim +
      interactionScore * weights.interaction_similarity +
      recencyScore * weights.recency_context +
      popularityScore * weights.popularity
    );

    const matchPercentage = Math.min(99, Math.max(45, Math.round(totalScore * 100)));

    return {
      total_score: totalScore,
      match_percentage: matchPercentage,
      semantic_score: semanticScore,
      genre_score: genreScore,
      cast_crew_score: castCrewScore,
      intent_score: intentScore,
      interaction_score: interactionScore,
      recency_score: recencyScore,
      popularity_score: popularityScore,
    };
  }
}
