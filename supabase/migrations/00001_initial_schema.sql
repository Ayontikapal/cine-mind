-- CineMind PostgreSQL Schema with pgvector support

-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Users / Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Movies table
CREATE TABLE IF NOT EXISTS public.movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tmdb_id INT UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    release_date DATE,
    poster_url TEXT,
    backdrop_url TEXT,
    genres TEXT[] DEFAULT '{}',
    "cast" JSONB DEFAULT '[]'::jsonb,
    directors JSONB DEFAULT '[]'::jsonb,
    runtime INT,
    rating NUMERIC(3, 1),
    language VARCHAR(10) DEFAULT 'en',
    embedding vector(768), -- pgvector representation for Gemini embeddings
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Movie Interactions table
CREATE TABLE IF NOT EXISTS public.user_movie_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
    interaction_type VARCHAR(30) NOT NULL CHECK (interaction_type IN ('like', 'dislike', 'view', 'rating', 'watchlist_add', 'watchlist_remove')),
    rating NUMERIC(2, 1), -- 1.0 to 5.0
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Watchlist table
CREATE TABLE IF NOT EXISTS public.watchlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, movie_id)
);

-- User Searches table
CREATE TABLE IF NOT EXISTS public.user_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    source VARCHAR(30) DEFAULT 'web', -- 'web', 'extension', 'ephemeral'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Authorized Browser Events table (Extension signals)
CREATE TABLE IF NOT EXISTS public.browser_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'search', 'movie_view', 'article_read'
    url TEXT,
    page_title TEXT,
    query TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Taste Preferences & Embeddings table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    favorite_genres TEXT[] DEFAULT '{}',
    favorite_actors TEXT[] DEFAULT '{}',
    favorite_directors TEXT[] DEFAULT '{}',
    preferred_languages TEXT[] DEFAULT '{"en"}',
    profile_summary TEXT,
    genre_affinity JSONB DEFAULT '{}'::jsonb,
    dna_metrics JSONB DEFAULT '{"story_complexity": 75, "emotional_depth": 70, "action_preference": 50, "romance_preference": 40, "animation_preference": 30}'::jsonb,
    embedding vector(768),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommendations Cache table
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    movie_id UUID NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
    match_percentage INT NOT NULL CHECK (match_percentage BETWEEN 0 AND 100),
    score NUMERIC(5, 4) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, movie_id)
);

-- Indexes for optimal vector and relational query performance
CREATE INDEX IF NOT EXISTS idx_movies_tmdb_id ON public.movies(tmdb_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_movie ON public.user_movie_interactions(user_id, movie_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON public.watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_browser_events_user_id ON public.browser_events(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_movie_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.browser_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Movies are publicly readable
CREATE POLICY "Public read movies" ON public.movies FOR SELECT USING (true);

-- User data policies (Users can read/write their own data)
CREATE POLICY "Users access own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users access own interactions" ON public.user_movie_interactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own watchlist" ON public.watchlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own searches" ON public.user_searches FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own browser events" ON public.browser_events FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own preferences" ON public.user_preferences FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own recommendations" ON public.recommendations FOR ALL USING (auth.uid() = user_id);
