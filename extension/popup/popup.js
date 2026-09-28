document.addEventListener('DOMContentLoaded', () => {
  const pauseBtn = document.getElementById('pauseBtn');
  const openDashBtn = document.getElementById('openDashBtn');
  const statusBadge = document.getElementById('statusBadge');
  const privacyLink = document.getElementById('privacyLink');

  let isPaused = false;

  pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
      pauseBtn.textContent = 'Resume Tracking';
      statusBadge.innerHTML = '<span class="dot"></span> Paused';
      statusBadge.classList.add('paused');
    } else {
      pauseBtn.textContent = 'Pause Tracking';
      statusBadge.innerHTML = '<span class="dot"></span> Active';
      statusBadge.classList.remove('paused');
    }
  });

  openDashBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/' });
  });

  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'http://localhost:3000/settings' });
  });
});
