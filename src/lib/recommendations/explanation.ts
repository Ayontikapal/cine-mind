import { Movie } from '@/types/movie';
import { UserPreferences } from '@/types/user';
import { CurrentIntent } from '@/types/recommendation';
import { LLMService } from '../ai/llm-service';

export class ExplanationGenerator {
  static async generateExplanation(
    movie: Movie,
    preferences: UserPreferences,
    matchPercentage: number,
    currentIntent?: CurrentIntent | null
  ): Promise<string> {
    const directorName = movie.directors?.[0]?.name;
    const actorName = movie.cast?.[0]?.name;
    const matchedGenre = movie.genres.find(g => preferences.favorite_genres.includes(g)) || movie.genres[0];

    const prompt = `
Generate a 2-sentence concise, engaging Netflix-style recommendation explanation for the user.

MOVIE:
- Title: ${movie.title}
- Genres: ${movie.genres.join(', ')}
- Director: ${directorName || 'N/A'}
- Star: ${actorName || 'N/A'}

USER TASTE PROFILE:
- Favorite Genres: ${preferences.favorite_genres.join(', ')}
- Favorite Directors: ${preferences.favorite_directors.join(', ')}
- Favorite Actors: ${preferences.favorite_actors.join(', ')}
- Summary: ${preferences.profile_summary}
${currentIntent?.query ? `- Current Watching Intent: "${currentIntent.query}"` : ''}

MATCH SCORE: ${matchPercentage}%

IMPORTANT PRIVACY RULES:
- Never mention raw URLs, specific browser timestamps, or confidential browsing telemetry.
- Focus strictly on movie themes, directorial style, genre alignment, and actor affinity.

Output ONLY the final explanation text.
`;

    // Smart fallback in case LLM is offline
    let defaultReason = `You're receiving this recommendation because you love ${matchedGenre.toLowerCase()} films`;
    if (directorName && preferences.favorite_directors.includes(directorName)) {
      defaultReason += ` directed by ${directorName}`;
    } else if (actorName && preferences.favorite_actors.includes(actorName)) {
      defaultReason += ` starring ${actorName}`;
    }
    if (currentIntent?.query) {
      defaultReason += `, aligning with your current search for "${currentIntent.query}".`;
    } else {
      defaultReason += ` with complex narrative themes and high cinematic acclaim.`;
    }

    return LLMService.generateText(prompt, defaultReason);
  }
}
