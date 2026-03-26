(() => {
  const STORAGE_KEY = 'flixhub-theme';
  const READING_KEY = 'flixhub-reading-mode';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const READING_DEFAULT = 'default';
  const READING_DYSLEXIA = 'dyslexia';

  const root = document.documentElement;
  const toggleButton =
    document.getElementById('theme-toggle');
  const toggleText = toggleButton?.querySelector(
    '.theme-toggle-text'
  );
  const dyslexiaButton = document.getElementById(
    'dyslexia-toggle'
  );
  const dyslexiaText =
    dyslexiaButton?.querySelector('.dyslexia-toggle-text');
  const yearFooter = document.getElementById('year-footer');

  if (yearFooter) {
    yearFooter.textContent = String(
      new Date().getFullYear()
    );
  }

  const getPreferredTheme = () => {
    const prefersLight = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;
    return prefersLight ? THEME_LIGHT : THEME_DARK;
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);

    if (!toggleButton) return;

    const isLight = theme === THEME_LIGHT;
    toggleButton.setAttribute(
      'aria-pressed',
      String(isLight)
    );
    toggleButton.setAttribute(
      'title',
      isLight ? 'Ativar tema escuro' : 'Ativar tema claro'
    );

    if (toggleText) {
      toggleText.textContent = isLight
        ? 'Tema: Claro'
        : 'Tema: Escuro';
    }
  };

  const applyReadingMode = (mode) => {
    const isDyslexia = mode === READING_DYSLEXIA;

    root.setAttribute(
      'data-reading',
      isDyslexia ? READING_DYSLEXIA : READING_DEFAULT
    );

    if (!dyslexiaButton) return;

    dyslexiaButton.setAttribute(
      'aria-pressed',
      String(isDyslexia)
    );
    dyslexiaButton.setAttribute(
      'title',
      isDyslexia
        ? 'Desativar modo dislexia'
        : 'Ativar modo dislexia'
    );

    if (dyslexiaText) {
      dyslexiaText.textContent = isDyslexia
        ? 'Dislexia: On'
        : 'Dislexia: Off';
    }
  };

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const initialTheme =
    savedTheme === THEME_DARK || savedTheme === THEME_LIGHT
      ? savedTheme
      : getPreferredTheme();
  const savedReadingMode =
    localStorage.getItem(READING_KEY);
  const initialReadingMode =
    savedReadingMode === READING_DYSLEXIA
      ? READING_DYSLEXIA
      : READING_DEFAULT;

  applyTheme(initialTheme);
  applyReadingMode(initialReadingMode);

  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }

  toggleButton?.addEventListener('click', () => {
    toggleButton.classList.add('is-switching');

    const currentTheme =
      root.getAttribute('data-theme') || THEME_DARK;
    const nextTheme =
      currentTheme === THEME_DARK
        ? THEME_LIGHT
        : THEME_DARK;

    applyTheme(nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);

    window.setTimeout(() => {
      toggleButton.classList.remove('is-switching');
    }, 420);
  });

  dyslexiaButton?.addEventListener('click', () => {
    const currentMode =
      root.getAttribute('data-reading') || READING_DEFAULT;
    const nextMode =
      currentMode === READING_DYSLEXIA
        ? READING_DEFAULT
        : READING_DYSLEXIA;

    applyReadingMode(nextMode);
    localStorage.setItem(READING_KEY, nextMode);
  });
})();
