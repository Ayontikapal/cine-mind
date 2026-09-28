export interface CastMember {
  name: string;
  character: string;
  profile_path?: string | null;
}

export interface Director {
  name: string;
  profile_path?: string | null;
}

export interface Movie {
  id: string;
  tmdb_id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  backdrop_url: string;
  genres: string[];
  cast: CastMember[];
  directors: Director[];
  runtime: number;
  rating: number;
  language: string;
  trailer_url?: string;
  tagline?: string;
  match_percentage?: number;
  match_reason?: string;
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
  link?: string;
}

export interface MovieWatchProviders {
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  link?: string;
}
