# 🎬 CineMind — Personalized AI Movie Recommendation Platform

> **"Movies that get you."**

CineMind is a complete, production-quality personalized movie recommendation platform with a distinctive **pastel purple (`#A78BFA`) + deep red (`#E63946`) visual identity** inspired by modern dark-mode streaming platforms.

Rather than returning a static list of movies, CineMind implements a **genuine multi-factor AI recommendation engine** that learns a user's movie taste from explicit interactions (likes, dislikes, ratings, watchlist), user preferences (genres, directors, actors), current intent, and explicitly authorized browser extension signals.

---

## 🚀 Key Features

* **Netflix-Inspired & Original Dashboard (`/`)**: Hero movie banner ("Your next obsession"), "Picked for You", "Because You Liked...", "Trending for You", "Hidden Gems", and "Continue Exploring" rows.
* **Match Percentage Engine**: Every recommended movie features a calculated **Match %** (e.g. `94% Match`) generated from a configurable 7-factor scoring formula rather than random outputs.
* **"Why This Movie?" Insights**: Transparent AI-generated explanations revealing why a movie was recommended without exposing raw timestamped URLs or sensitive browsing history.
* **Current Watching Intent vs Long-Term Taste**: Temporarily override your recommendation feed for specific moods (e.g., *"I want something funny tonight"*) without permanently altering your core taste DNA.
* **Spotify Wrapped-Style Taste Profile (`/taste-profile`)**: Visual **YOUR MOVIE DNA** dashboard with genre affinity bars, story complexity, emotional depth, action preference, and favorite directors/actors.
* **"Where to Watch" Streaming Availability**: Real-time watch provider data (Netflix, Prime Video, Apple TV) with direct links. Displays *"Availability information unavailable"* when data is unlisted (never invents streaming links).
* **Full Authentication Flow**: Complete `/login`, `/signup`, `/forgot-password`, `/reset-password`, and interactive `/onboarding` preference flow.
* **Movie Discovery & Detail Pages (`/discover`, `/movies/[id]`)**: Search, genre filters, rating filters, trailer player modals, personal ratings, and like/dislike reactions.
* **Chrome Manifest V3 Browser Extension (`/extension`)**: An optional browser extension structure that detects relevant movie searches/pages locally with explicit user authorization.
* **Zero-Config Fallback Mode**: If TMDB or Gemini API keys are unconfigured, CineMind operates seamlessly using built-in seed movie data and mock AI fallback services.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons.
* **Backend**: Next.js Server API Routes & Service Architecture.
* **Authentication**: Supabase Auth (with SSR cookies & local session fallback).
* **Database & Vector Search**: Supabase PostgreSQL with `pgvector` extension.
* **AI & LLM**: Google Gemini API (`gemini-2.0-flash`) for structured preference extraction & natural language recommendation reasons.
* **Movie & Watch Provider Metadata**: TMDB (The Movie Database) API.
* **Browser Extension**: Chrome Manifest V3 (`/extension`).

---

## 🎯 Match Percentage & Scoring Formula

CineMind computes recommendation match scores using a normalized multi-factor formula:

$$ \text{Total Score} = 0.35 \times \text{Semantic} + 0.20 \times \text{Genre} + 0.15 \times \text{Cast/Crew} + 0.10 \times \text{Intent} + 0.10 \times \text{Interactions} + 0.05 \times \text{Recency} + 0.05 \times \text{Popularity} $$

1. **35% Semantic Similarity**: Cosine similarity between movie description embeddings and user taste profile embedding (`pgvector`).
2. **20% Genre Compatibility**: Alignment with user genre affinity percentages.
3. **15% Actor & Director Compatibility**: Match with favorite directors (e.g. Christopher Nolan, Denis Villeneuve) and actors.
4. **10% Search Intent Match**: Cosine similarity with current watching query.
5. **10% Previous Interactions**: Boost for liked movies and penalization for disliked movies.
6. **5% Recency & Context**: Release recency.
7. **5% Popularity**: Critical acclaim & rating score.

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` to configure live API keys:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# TMDB API Key (Movie Metadata & Watch Providers)
TMDB_API_KEY=your_tmdb_api_key

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key

# LLM Model Name
LLM_MODEL=gemini-2.0-flash

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🗄️ Database Setup (Supabase & pgvector)

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase dashboard.
3. Run the schema script located at [`supabase/migrations/00001_initial_schema.sql`](file:///c:/Users/Ayontika%20pal/Cine-mind/supabase/migrations/00001_initial_schema.sql).
4. Run the seed data script located at [`supabase/seed.sql`](file:///c:/Users/Ayontika%20pal/Cine-mind/supabase/seed.sql).

---

## 🧩 Chrome Extension Setup

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in upper right corner).
3. Click **Load unpacked**.
4. Select the [`/extension`](file:///c:/Users/Ayontika%20pal/Cine-mind/extension) folder inside this repository.
5. The extension popup will display tracking status and sync signals with your CineMind instance at `http://localhost:3000`.

---

## 💻 Local Development Instructions

Run the development server locally:

```bash
# Install dependencies
npm install

# Start Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Privacy & Security

* CineMind **never** tracks general web browsing or secret search history.
* The optional Chrome extension only processes pages explicitly matching movie domains (IMDb, Letterboxd, Rotten Tomatoes, Google movie queries).
* Recommendation explanations mask raw URLs and specific timestamps, presenting only privacy-safe thematic explanations.
