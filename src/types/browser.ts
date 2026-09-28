export type BrowserEventType = 'search' | 'movie_page' | 'review_read' | 'article_view';

export interface BrowserEventSignal {
  id?: string;
  user_id?: string;
  event_type: BrowserEventType;
  url: string;
  page_title: string;
  query?: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface PrivacySettings {
  allow_search_signals: boolean;
  allow_browsing_signals: boolean;
  use_browsing_for_recommendations: boolean;
  tracking_paused: boolean;
}
