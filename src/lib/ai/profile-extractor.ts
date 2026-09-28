import { UserPreferences, UserInteraction } from '@/types/user';
import { BrowserEventSignal } from '@/types/browser';
import { LLMService } from './llm-service';

export interface StructuredSignalProfile {
  genres: Record<string, number>;
  themes: string[];
  directors: string[];
  actors: string[];
  preferences: {
    complex_story: number;
    emotional_depth: number;
    action: number;
    romance: number;
    animation: number;
  };
  summary: string;
}

export class ProfileExtractor {
  static async extractProfileFromSignals(
    interactions: UserInteraction[],
    searches: { query: string }[],
    browserEvents: BrowserEventSignal[],
    currentPreferences: UserPreferences
  ): Promise<UserPreferences> {
    const prompt = `
Analyze the following movie user interactions, search history, and browser signals to build an updated movie taste profile.

CURRENT FAVORITES:
- Favorite Genres: ${currentPreferences.favorite_genres.join(', ')}
- Favorite Actors: ${currentPreferences.favorite_actors.join(', ')}
- Favorite Directors: ${currentPreferences.favorite_directors.join(', ')}

RECENT USER SEARCHES:
${searches.map(s => `- ${s.query}`).join('\n') || '- None'}

RECENT USER INTERACTIONS:
${interactions.map(i => `- ${i.interaction_type} movie ID ${i.movie_id}${i.rating ? ` with rating ${i.rating}/5` : ''}`).join('\n') || '- None'}

AUTHORIZED BROWSER SIGNALS (Filtered movie-related pages & searches):
${browserEvents.map(b => `- Visited ${b.page_title} (${b.url}) - Query: ${b.query || 'N/A'}`).join('\n') || '- None'}

Return a valid JSON object matching EXACTLY this schema:
{
  "genres": { "Sci-Fi": 0.94, "Thriller": 0.84, "Mystery": 0.78, "Drama": 0.73, "Action": 0.51 },
  "themes": ["space", "time travel", "artificial intelligence", "psychological thriller"],
  "directors": ["Christopher Nolan", "Denis Villeneuve"],
  "actors": ["Leonardo DiCaprio", "Amy Adams", "Ryan Gosling"],
  "preferences": {
    "complex_story": 0.88,
    "emotional_depth": 0.82,
    "action": 0.65,
    "romance": 0.38,
    "animation": 0.45
  },
  "summary": "Synthesized profile summary paragraph about movie taste..."
}
`;

    const fallback: StructuredSignalProfile = {
      genres: currentPreferences.genre_affinity || { 'Sci-Fi': 0.94, 'Thriller': 0.84, 'Mystery': 0.78 },
      themes: currentPreferences.themes || ['mind-bending', 'space', 'psychological puzzle'],
      directors: currentPreferences.favorite_directors.length ? currentPreferences.favorite_directors : ['Christopher Nolan', 'Denis Villeneuve'],
      actors: currentPreferences.favorite_actors.length ? currentPreferences.favorite_actors : ['Leonardo DiCaprio', 'Ryan Gosling'],
      preferences: {
        complex_story: currentPreferences.dna_metrics.story_complexity / 100,
        emotional_depth: currentPreferences.dna_metrics.emotional_depth / 100,
        action: currentPreferences.dna_metrics.action_preference / 100,
        romance: currentPreferences.dna_metrics.romance_preference / 100,
        animation: currentPreferences.dna_metrics.animation_preference / 100,
      },
      summary: currentPreferences.profile_summary || 'Drawn to intelligent sci-fi, mind-bending thrillers, and immersive cinematic storytelling.',
    };

    const extracted = await LLMService.generateJson<StructuredSignalProfile>(prompt, fallback);

    // Convert decimal values to 0-100 scales for preferences
    const updatedGenreAffinity: Record<string, number> = {};
    Object.entries(extracted.genres || {}).forEach(([genre, val]) => {
      updatedGenreAffinity[genre] = Math.round(val > 1 ? val : val * 100);
    });

    const topGenres = Object.entries(updatedGenreAffinity)
      .sort((a, b) => b[1] - a[1])
      .map(([g]) => g)
      .slice(0, 5);

    return {
      ...currentPreferences,
      favorite_genres: topGenres.length ? topGenres : currentPreferences.favorite_genres,
      favorite_directors: extracted.directors?.length ? extracted.directors : currentPreferences.favorite_directors,
      favorite_actors: extracted.actors?.length ? extracted.actors : currentPreferences.favorite_actors,
      profile_summary: extracted.summary || currentPreferences.profile_summary,
      genre_affinity: updatedGenreAffinity,
      dna_metrics: {
        story_complexity: Math.round((extracted.preferences?.complex_story ?? 0.85) * 100),
        emotional_depth: Math.round((extracted.preferences?.emotional_depth ?? 0.80) * 100),
        action_preference: Math.round((extracted.preferences?.action ?? 0.60) * 100),
        romance_preference: Math.round((extracted.preferences?.romance ?? 0.40) * 100),
        animation_preference: Math.round((extracted.preferences?.animation ?? 0.40) * 100),
      },
      themes: extracted.themes || currentPreferences.themes,
    };
  }
}
