(() => {
  const STORAGE_KEY = 'netflix-theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  const root = document.documentElement;
  const toggleButton =
    document.getElementById('theme-toggle');
  const toggleText = toggleButton?.querySelector(
    '.theme-toggle-text'
  );

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

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const initialTheme =
    savedTheme === THEME_DARK || savedTheme === THEME_LIGHT
      ? savedTheme
      : getPreferredTheme();

  applyTheme(initialTheme);

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
})();
