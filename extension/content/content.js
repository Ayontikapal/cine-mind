// Content script to detect relevant movie pages and movie queries locally

(function() {
  const url = window.location.href;
  const title = document.title;

  const isMovieKeywords = (text) => {
    const keywords = ['movie', 'film', 'trailer', 'cast', 'director', 'rating', 'review', 'imdb', 'rottentomatoes', 'letterboxd'];
    return keywords.some(kw => text.toLowerCase().includes(kw));
  };

  // 1. Google Search detection
  if (url.includes('google.com/search')) {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q');
    if (q && isMovieKeywords(q)) {
      chrome.runtime.sendMessage({
        type: 'SIGNAL_DETECTED',
        payload: {
          type: 'search',
          url,
          title,
          query: q,
        }
      });
    }
  } 
  // 2. Specific Movie Detail sites (IMDb, Letterboxd, Rotten Tomatoes)
  else if (url.includes('imdb.com/title/') || url.includes('letterboxd.com/film/') || url.includes('rottentomatoes.com/m/')) {
    chrome.runtime.sendMessage({
      type: 'SIGNAL_DETECTED',
      payload: {
        type: 'movie_page',
        url,
        title,
      }
    });
  }
})();
