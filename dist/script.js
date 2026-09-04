const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -35px' });
reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

const startedAt = new Date('2026-03-20T08:00:00+08:00').getTime();
function updateUptime() {
  const elapsed = Math.max(0, Date.now() - startedAt);
  const days = Math.floor(elapsed / 86400000);
  const hours = Math.floor(elapsed / 3600000) % 24;
  const minutes = Math.floor(elapsed / 60000) % 60;
  const seconds = Math.floor(elapsed / 1000) % 60;
  document.querySelector('[data-uptime-days]').textContent = days;
  document.querySelector('[data-uptime-hours]').textContent = String(hours).padStart(2, '0');
  document.querySelector('[data-uptime-minutes]').textContent = String(minutes).padStart(2, '0');
  document.querySelector('[data-uptime-seconds]').textContent = String(seconds).padStart(2, '0');
}
updateUptime();
setInterval(updateUptime, 1000);

const healthGrid = document.querySelector('.health-grid');
if (healthGrid) healthGrid.innerHTML = '<span></span>'.repeat(60);

document.querySelectorAll('.billing-toggle button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.billing-toggle button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
});

const copyButton = document.querySelector('.copy-code');
copyButton?.addEventListener('click', async () => {
  const code = document.querySelector('.code-demo code')?.innerText || '';
  try {
    await navigator.clipboard.writeText(code);
    copyButton.textContent = '已复制';
    setTimeout(() => copyButton.textContent = '复制', 1400);
  } catch {
    copyButton.textContent = '复制失败';
  }
});

