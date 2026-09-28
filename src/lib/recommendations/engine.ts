import { Movie } from '@/types/movie';
import { UserPreferences, UserInteraction } from '@/types/user';
import { RecommendationItem, CurrentIntent } from '@/types/recommendation';
import { TMDBClient } from '../tmdb/client';
import { MOCK_MOVIES } from '../tmdb/mock-data';
import { RecommendationScorer } from './scoring';
import { ExplanationGenerator } from './explanation';

export class RecommendationEngine {
  static async getRecommendations(
    preferences: UserPreferences,
    interactions: UserInteraction[],
    currentIntent?: CurrentIntent | null,
    limit = 12
  ): Promise<RecommendationItem[]> {
    let candidates: Movie[] = [];
    try {
      const trending = await TMDBClient.getTrending();
      candidates = trending.length > 0 ? trending : MOCK_MOVIES;
    } catch {
      candidates = MOCK_MOVIES;
    }

    const candidateMap = new Map<string, Movie>();
    candidates.forEach(m => candidateMap.set(m.id, m));
    MOCK_MOVIES.forEach(m => {
      if (!candidateMap.has(m.id)) candidateMap.set(m.id, m);
    });
    const allCandidates = Array.from(candidateMap.values());

    const dislikedIds = new Set(
      interactions.filter(i => i.interaction_type === 'dislike').map(i => i.movie_id)
    );
    const filteredCandidates = allCandidates.filter(c => !dislikedIds.has(c.id));

    const scoredList: RecommendationItem[] = [];

    for (const movie of filteredCandidates) {
      const breakdown = await RecommendationScorer.scoreMovie(
        movie,
        preferences,
        interactions,
        currentIntent
      );

      const explanation = await ExplanationGenerator.generateExplanation(
        movie,
        preferences,
        breakdown.match_percentage,
        currentIntent
      );

      const movieWithMatch = {
        ...movie,
        match_percentage: breakdown.match_percentage,
        match_reason: explanation,
      };

      scoredList.push({
        id: `rec_${movie.id}_${Date.now()}`,
        movie: movieWithMatch,
        match_percentage: breakdown.match_percentage,
        score: breakdown.total_score,
        reason: explanation,
        score_breakdown: breakdown,
      });
    }

    scoredList.sort((a, b) => b.match_percentage - a.match_percentage);

    return scoredList.slice(0, limit);
  }

  static async getCategorizedFeeds(
    preferences: UserPreferences,
    interactions: UserInteraction[],
    currentIntent?: CurrentIntent | null
  ) {
    const allRecs = await this.getRecommendations(preferences, interactions, currentIntent, 20);

    const heroMovie = allRecs[0]?.movie || MOCK_MOVIES[0];
    const pickedForYou = allRecs.slice(0, 8);

    const favGenre = preferences.favorite_genres[0] || 'Sci-Fi';
    const becauseYouLiked = allRecs.filter(r => r.movie.genres.includes(favGenre)).slice(0, 6);
    const trendingForYou = [...allRecs].sort((a, b) => b.movie.rating - a.movie.rating).slice(0, 6);
    const hiddenGems = allRecs.filter(r => r.movie.rating <= 8.2 && r.match_percentage >= 75).slice(0, 6);
    const continueExploring = allRecs.slice(6, 14);

    return {
      heroMovie,
      pickedForYou,
      becauseYouLiked,
      trendingForYou,
      hiddenGems,
      continueExploring,
      favGenre,
    };
  }
}
