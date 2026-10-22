const progress = document.getElementById('progress');
const fab = document.getElementById('fab');
const startBtn = document.getElementById('startBtn');
const blocks = document.querySelectorAll('.block');

// Плавная прокрутка в нужную позицию
function scrollToY(y) {
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function scrollToBottom() {
  scrollToY(document.documentElement.scrollHeight);
}

function scrollToTop() {
  scrollToY(0);
}

// Находимся ли мы почти в самом низу
function isNearBottom() {
  return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
}

// Индикатор прогресса + смена направления кнопки
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = percent + '%';

  const atBottom = isNearBottom();
  fab.classList.toggle('up', atBottom);
  fab.textContent = '↓';
  fab.setAttribute('aria-label', atBottom ? 'Наверх' : 'Прокрутить вниз');
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Кнопка: вниз или наверх
fab.addEventListener('click', () => {
  isNearBottom() ? scrollToTop() : scrollToBottom();
});

// Кнопка в шапке — к первому разделу
startBtn.addEventListener('click', () => {
  document.getElementById('s1').scrollIntoView({ behavior: 'smooth' });
});

// Горячие клавиши End / Home
window.addEventListener('keydown', (e) => {
  if (e.key === 'End') { e.preventDefault(); scrollToBottom(); }
  if (e.key === 'Home') { e.preventDefault(); scrollToTop(); }
});

// Появление разделов при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

blocks.forEach((b) => observer.observe(b));
