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

window.addEventListener('message', event => {
  if (event.data?.themeMode === 'dark' || event.data?.themeMode === 'light') {
    document.documentElement.dataset.theme = event.data.themeMode;
  }
  if (typeof event.data?.lang === 'string') {
    document.documentElement.lang = event.data.lang;
  }
});

