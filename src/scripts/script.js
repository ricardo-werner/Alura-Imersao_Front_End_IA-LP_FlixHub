(() => {
  const STORAGE_KEY = 'flixhub-theme';
  const READING_KEY = 'flixhub-reading-mode';
  const SCALE_KEY = 'flixhub-font-scale';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const READING_DEFAULT = 'default';
  const READING_DYSLEXIA = 'dyslexia';
  const SCALE_OPTIONS = ['100', '110', '125'];

  const root = document.documentElement;
  const toggleButton =
    document.getElementById('theme-toggle');
  const toggleText = toggleButton?.querySelector(
    '.theme-toggle-text'
  );
  const dyslexiaButton = document.getElementById(
    'dyslexia-toggle'
  );
  const dyslexiaText = dyslexiaButton?.querySelector(
    '.dyslexia-toggle-text'
  );
  const visionButton =
    document.getElementById('vision-toggle');
  const visionText = visionButton?.querySelector(
    '.vision-toggle-text'
  );
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

  const applyFontScale = (scale) => {
    const validScale = SCALE_OPTIONS.includes(scale)
      ? scale
      : '100';

    root.setAttribute('data-scale', validScale);

    if (!visionButton) return;

    const isScaled = validScale !== '100';
    visionButton.setAttribute(
      'aria-pressed',
      String(isScaled)
    );
    visionButton.setAttribute(
      'title',
      `Escala de fonte atual: ${validScale}%`
    );

    if (visionText) {
      visionText.textContent = `Escala: ${validScale}%`;
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
  const savedScale = localStorage.getItem(SCALE_KEY);
  const initialScale = SCALE_OPTIONS.includes(savedScale)
    ? savedScale
    : '100';

  applyTheme(initialTheme);
  applyReadingMode(initialReadingMode);
  applyFontScale(initialScale);

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

  visionButton?.addEventListener('click', () => {
    const currentScale =
      root.getAttribute('data-scale') || '100';
    const currentIndex =
      SCALE_OPTIONS.indexOf(currentScale);
    const nextScale =
      SCALE_OPTIONS[
        (currentIndex + 1) % SCALE_OPTIONS.length
      ];

    applyFontScale(nextScale);
    localStorage.setItem(SCALE_KEY, nextScale);
  });

  const sidebarMenuLinks = Array.from(
    document.querySelectorAll('aside nav a[href^="#"]')
  );

  const getTargetSection = (menuLink) => {
    const targetId = menuLink
      .getAttribute('href')
      ?.replace('#', '');

    if (!targetId) return null;

    return document.getElementById(targetId);
  };

  const focusFirstCardInSection = (section) => {
    const firstCard = section.querySelector('.media-card');

    if (!firstCard) return;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    firstCard.focus();
  };

  const isSectionShortcutKey = (event) =>
    event.key === ' ' ||
    event.key === 'Spacebar' ||
    event.key === 'Enter';

  sidebarMenuLinks.forEach((menuLink) => {
    menuLink.addEventListener('keydown', (event) => {
      if (!isSectionShortcutKey(event)) return;

      const section = getTargetSection(menuLink);

      if (!section?.classList.contains('media-section')) {
        return;
      }

      event.preventDefault();
      focusFirstCardInSection(section);
    });
  });

  const backToMenuButtons = document.querySelectorAll(
    '.back-to-menu[data-return-link]'
  );

  backToMenuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const menuLinkId = button.getAttribute(
        'data-return-link'
      );

      if (!menuLinkId) return;

      const menuLink = document.getElementById(menuLinkId);

      if (!menuLink) return;

      menuLink.focus();
      menuLink.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  });
})();
