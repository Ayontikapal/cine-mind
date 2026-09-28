// CineMind Chrome Extension Background Worker (Manifest V3)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SIGNAL_DETECTED') {
    const signalData = message.payload;
    console.log('[CineMind Extension] Transmitting movie signal:', signalData);

    // Send to backend local route if authorized
    fetch('http://localhost:3000/api/browser-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: signalData.type,
        url: signalData.url,
        page_title: signalData.title,
        query: signalData.query,
      })
    })
    .then(r => r.json())
    .then(res => sendResponse({ success: true, res }))
    .catch(err => sendResponse({ success: false, error: err.message }));

    return true; // Keep async response channel open
  }
});
