(() => {
  document.documentElement.classList.add('js-enabled');

  const STORAGE_KEY = 'flixhub-theme';
  const READING_KEY = 'flixhub-reading-mode';
  const SCALE_KEY = 'flixhub-font-scale';
  const ACTIVE_PROFILE_KEY = 'perfilAtivo';
  const PROFILE_LISTS_KEY = 'flixhub_jornadas';
  const LEGACY_PROFILE_LISTS_KEY = 'minhaListaPorPerfil';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const READING_DEFAULT = 'default';
  const READING_DYSLEXIA = 'dyslexia';
  const SCALE_OPTIONS = ['100', '110', '125'];
  const PROFILE_IDS = [
    'observador',
    'explorador',
    'guardiao',
  ];
  const DEFAULT_PROFILE_LABELS = {
    observador: 'O Observador',
    explorador: 'A Exploradora',
    guardiao: 'O Guardião',
  };
  const LEGACY_PROFILE_ID_MAP = {
    'perfil-1': 'observador',
    'perfil-2': 'explorador',
    'perfil-3': 'guardiao',
  };

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
  const a11yMenuContainer = document.querySelector(
    '.header-accessibility'
  );
  const a11yMenuToggle = document.getElementById(
    'a11y-menu-toggle'
  );
  const a11yMenuClose = document.getElementById(
    'a11y-menu-close'
  );
  const a11yDesktopMediaQuery = window.matchMedia(
    '(min-width: 768px)'
  );
  const yearFooter = document.getElementById('year-footer');
  const footerLogo = document.getElementById('footer-logo');
  const profilesHeading =
    document.getElementById('perfis-titulo');
  const profilesSection =
    profilesHeading?.closest('section') || null;
  const profileStatus = document.getElementById(
    'perfil-ativo-status'
  );
  const profileButtons = Array.from(
    document.querySelectorAll('.profile-selector')
  );
  const menuMinhaListaLink = document.getElementById(
    'menu-minha-lista'
  );
  const menuInicioLink =
    document.getElementById('menu-inicio');
  const minhaListaTitle = document.getElementById(
    'minha-lista-titulo'
  );
  const minhaListaList = document.querySelector(
    '#minha-lista ul'
  );
  const profileDialog = document.getElementById(
    'profile-dialog'
  );
  const profileDialogChooseButton = document.getElementById(
    'profile-dialog-choose'
  );
  const profileDialogCloseButton = document.getElementById(
    'profile-dialog-close'
  );
  const switchProfileTrigger = document.getElementById(
    'switch-profile-trigger'
  );
  const switchProfileModalOverlay = document.getElementById(
    'switch-profile-modal-overlay'
  );
  const switchProfileDialog = document.getElementById(
    'switch-profile-dialog'
  );
  const switchProfileConfirmButton =
    document.getElementById('switch-profile-confirm');
  const switchProfileCancelButton = document.getElementById(
    'switch-profile-cancel'
  );

  const profileLabels = profileButtons.reduce(
    (labels, button) => {
      const profileId = button.dataset.profileId;
      const profileName = button.dataset.profileName;

      if (profileId && profileName) {
        labels[profileId] = profileName;
      }

      return labels;
    },
    { ...DEFAULT_PROFILE_LABELS }
  );

  let focusBeforeDialog = null;
  let focusBeforeSwitchProfileModal = null;

  const setFooterYear = () => {
    const yearSpan = document.getElementById('year-footer');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  };

  const updateFooterLogo = (theme) => {
    if (footerLogo) {
      footerLogo.src =
        theme === THEME_LIGHT
          ? './src/assets/images/RicWerner-LogoDay.png'
          : './src/assets/images/RicWerner-LogoNight.png';
    }
  };

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

  const parseJSON = (value, fallback) => {
    if (!value) return fallback;

    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  };

  const createEmptyProfileLists = () =>
    PROFILE_IDS.reduce((lists, profileId) => {
      lists[profileId] = [];
      return lists;
    }, {});

  const normalizeProfileLists = (sourceLists = {}) =>
    PROFILE_IDS.reduce((lists, profileId) => {
      const rawItems = Array.isArray(sourceLists[profileId])
        ? sourceLists[profileId]
        : [];
      const uniqueItems = Array.from(
        new Set(
          rawItems.filter(
            (item) =>
              typeof item === 'string' && item.trim()
          )
        )
      );

      lists[profileId] = uniqueItems;

      return lists;
    }, createEmptyProfileLists());

  const mapProfileIdToSemanticId = (profileId) =>
    LEGACY_PROFILE_ID_MAP[profileId] || profileId;

  const mergeProfileListSources = (...sources) => {
    const mergedLists = createEmptyProfileLists();

    sources.forEach((source) => {
      if (!source || typeof source !== 'object') return;

      Object.entries(source).forEach(
        ([profileId, items]) => {
          const semanticProfileId =
            mapProfileIdToSemanticId(profileId);

          if (
            !PROFILE_IDS.includes(semanticProfileId) ||
            !Array.isArray(items)
          ) {
            return;
          }

          mergedLists[semanticProfileId] = [
            ...mergedLists[semanticProfileId],
            ...items,
          ];
        }
      );
    });

    return normalizeProfileLists(mergedLists);
  };

  const getStoredActiveProfile = () => {
    const storedValue = localStorage.getItem(
      ACTIVE_PROFILE_KEY
    );

    if (PROFILE_IDS.includes(storedValue)) {
      return storedValue;
    }

    const semanticProfileId =
      mapProfileIdToSemanticId(storedValue);

    if (!PROFILE_IDS.includes(semanticProfileId)) {
      return null;
    }

    localStorage.setItem(
      ACTIVE_PROFILE_KEY,
      semanticProfileId
    );

    return semanticProfileId;
  };

  const getStoredProfileLists = () => {
    const storedLists = parseJSON(
      localStorage.getItem(PROFILE_LISTS_KEY),
      null
    );
    const legacyStoredLists = parseJSON(
      localStorage.getItem(LEGACY_PROFILE_LISTS_KEY),
      null
    );

    const normalizedLists = mergeProfileListSources(
      storedLists,
      legacyStoredLists
    );

    const mustPersistNormalizedLists =
      !storedLists || Boolean(legacyStoredLists);

    if (mustPersistNormalizedLists) {
      localStorage.setItem(
        PROFILE_LISTS_KEY,
        JSON.stringify(normalizedLists)
      );
    }

    if (legacyStoredLists) {
      localStorage.removeItem(LEGACY_PROFILE_LISTS_KEY);
    }

    return normalizedLists;
  };

  const saveProfileLists = (lists) => {
    const normalizedLists = normalizeProfileLists(lists);

    localStorage.setItem(
      PROFILE_LISTS_KEY,
      JSON.stringify(normalizedLists)
    );
  };

  let activeProfileId = getStoredActiveProfile();
  let profileLists = getStoredProfileLists();
  let intentToScrollMinhaLista = false;

  const getProfileName = (profileId) =>
    profileLabels[profileId] || profileId;

  const getNormalizedProfileLists = () => {
    profileLists = normalizeProfileLists(profileLists);
    return profileLists;
  };

  const updateActiveProfileStatus = () => {
    if (!profileStatus) return;

    profileStatus.textContent = activeProfileId
      ? `Arquétipo ativo: ${getProfileName(activeProfileId)}`
      : 'Arquétipo ativo: nenhum selecionado';
  };

  const updateProfileButtonsState = () => {
    profileButtons.forEach((button) => {
      const profileId = button.dataset.profileId;
      const isActive = profileId === activeProfileId;

      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const setActiveProfile = (profileId) => {
    if (!PROFILE_IDS.includes(profileId)) return;

    activeProfileId = profileId;
    localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
    updateProfileButtonsState();
    updateActiveProfileStatus();
    renderCatalogActions();
    renderMinhaLista();
  };

  const clearActiveProfile = () => {
    activeProfileId = null;
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
    updateProfileButtonsState();
    updateActiveProfileStatus();
    renderCatalogActions();
    renderMinhaLista();
  };

  const openProfileDialog = (invoker) => {
    if (!profileDialog) return;

    focusBeforeDialog =
      invoker instanceof HTMLElement ? invoker : null;

    if (typeof profileDialog.showModal === 'function') {
      if (!profileDialog.open) {
        profileDialog.showModal();
      }

      profileDialogChooseButton?.focus();
      return;
    }

    jumpToProfilesSection();
  };

  const closeProfileDialog = ({
    restoreFocus = true,
  } = {}) => {
    if (
      profileDialog &&
      profileDialog.open &&
      typeof profileDialog.close === 'function'
    ) {
      profileDialog.close();
    }

    if (restoreFocus) {
      focusBeforeDialog?.focus();
    }

    focusBeforeDialog = null;
  };

  const jumpToProfilesSection = () => {
    if (!profilesHeading || !profilesSection) return;

    profilesSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (!profilesHeading.hasAttribute('tabindex')) {
      profilesHeading.setAttribute('tabindex', '-1');
    }

    profilesHeading.focus({ preventScroll: true });
  };

  const navigateToHomeSection = () => {
    if (menuInicioLink) {
      menuInicioLink.click();
      return;
    }

    jumpToProfilesSection();
  };

  const getFocusableElements = (container) => {
    if (!container) return [];

    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (element) =>
        element instanceof HTMLElement &&
        !element.hasAttribute('disabled') &&
        element.getAttribute('aria-hidden') !== 'true'
    );
  };

  const isSwitchProfileModalOpen = () =>
    Boolean(
      switchProfileModalOverlay &&
      !switchProfileModalOverlay.hidden
    );

  const openSwitchProfileModal = (invoker) => {
    if (
      !switchProfileModalOverlay ||
      !switchProfileDialog
    ) {
      return;
    }

    focusBeforeSwitchProfileModal =
      invoker instanceof HTMLElement ? invoker : null;
    switchProfileModalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';

    const focusables = getFocusableElements(
      switchProfileDialog
    );

    (focusables[0] || switchProfileDialog).focus();
  };

  const closeSwitchProfileModal = ({
    restoreFocus = true,
  } = {}) => {
    if (!switchProfileModalOverlay) return;

    switchProfileModalOverlay.hidden = true;
    document.body.style.overflow = '';

    if (restoreFocus) {
      focusBeforeSwitchProfileModal?.focus();
    }

    focusBeforeSwitchProfileModal = null;
  };

  const trapSwitchProfileModalFocus = (event) => {
    if (
      !isSwitchProfileModalOpen() ||
      !switchProfileDialog
    ) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeSwitchProfileModal();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusables = getFocusableElements(
      switchProfileDialog
    );

    if (!focusables.length) {
      event.preventDefault();
      switchProfileDialog.focus();
      return;
    }

    const firstElement = focusables[0];
    const lastElement = focusables[focusables.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const focusElementWhenVisible = (
    element,
    { threshold = 0.6 } = {}
  ) => {
    if (!element) return;

    const focusTarget = () => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }

      element.focus({ preventScroll: true });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (!entry?.isIntersecting) return;

          focusTarget();
          observer.disconnect();
        },
        {
          threshold,
        }
      );

      observer.observe(element);
      return;
    }

    const isElementInViewport = () => {
      const rect = element.getBoundingClientRect();

      return (
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight ||
            document.documentElement.clientHeight)
      );
    };

    const checkAndFocus = () => {
      if (!isElementInViewport()) return;

      window.removeEventListener('scroll', checkAndFocus);
      window.removeEventListener('resize', checkAndFocus);
      focusTarget();
    };

    window.addEventListener('scroll', checkAndFocus, {
      passive: true,
    });
    window.addEventListener('resize', checkAndFocus);
    checkAndFocus();
  };

  const focusMinhaListaTitleWhenVisible = () => {
    focusElementWhenVisible(minhaListaTitle, {
      threshold: 0.6,
    });
  };

  const focusProfilesHeadingWhenVisible = () => {
    focusElementWhenVisible(profilesHeading, {
      threshold: 0.6,
    });
  };

  const getCardTitle = (card) =>
    card?.dataset.title ||
    card
      ?.querySelector('.media-card-title')
      ?.textContent?.trim() ||
    '';

  const isInActiveProfileList = (title) => {
    if (!activeProfileId) return false;

    const lists = getNormalizedProfileLists();

    return lists[activeProfileId]?.includes(title);
  };

  const getCatalogActionAriaLabel = ({
    title,
    profileId,
    isAdded,
  }) => {
    const safeTitle = title || 'este título';

    if (!profileId) {
      return `Selecione um arquétipo para adicionar ${safeTitle} à jornada`;
    }

    const profileName = getProfileName(profileId);

    return isAdded
      ? `Remover ${safeTitle} da jornada de ${profileName}`
      : `Adicionar ${safeTitle} à jornada de ${profileName}`;
  };

  const updateCatalogActionButton = ({ button, title }) => {
    if (!button) return;

    if (!activeProfileId) {
      button.textContent = 'Adicionar à jornada';
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute(
        'aria-label',
        getCatalogActionAriaLabel({
          title,
          profileId: activeProfileId,
          isAdded: false,
        })
      );
      return;
    }

    const isAdded = isInActiveProfileList(title);

    button.textContent = isAdded
      ? 'Remover da jornada'
      : 'Adicionar à jornada';
    button.setAttribute('aria-pressed', String(isAdded));
    button.setAttribute(
      'aria-label',
      getCatalogActionAriaLabel({
        title,
        profileId: activeProfileId,
        isAdded,
      })
    );
  };

  function renderCatalogActions() {
    const catalogButtons = document.querySelectorAll(
      '#series [data-list-action], #filmes [data-list-action], #bombando [data-list-action]'
    );

    catalogButtons.forEach((button) => {
      const card = button.closest('.media-card');
      const title = getCardTitle(card);

      updateCatalogActionButton({
        button,
        title,
      });
    });
  }

  const createMinhaListaItem = (title) => {
    const listItem = document.createElement('li');
    listItem.className = 'media-card';
    listItem.tabIndex = 0;
    listItem.dataset.title = title;

    const titleElement = document.createElement('span');
    titleElement.className = 'media-card-title';
    titleElement.textContent = title;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className =
      'media-card-action is-remove-action';
    removeButton.setAttribute('data-remove-from-list', '');
    removeButton.setAttribute('aria-pressed', 'true');
    removeButton.setAttribute(
      'aria-label',
      `Remover ${title} da jornada`
    );
    removeButton.textContent = 'Remover da jornada';

    listItem.append(titleElement, removeButton);

    return listItem;
  };

  function renderMinhaLista() {
    if (!minhaListaTitle || !minhaListaList) return;

    minhaListaList.innerHTML = '';

    if (!activeProfileId) {
      minhaListaTitle.textContent = 'Minha Jornada';

      const emptyState = document.createElement('li');
      emptyState.className = 'empty-list-state';
      emptyState.textContent =
        'Selecione um arquétipo para começar a montar sua lista.';
      minhaListaList.append(emptyState);
      bindMediaCardKeyboardNavigation();
      return;
    }

    const activeProfileName =
      getProfileName(activeProfileId);
    const lists = getNormalizedProfileLists();
    const items = lists[activeProfileId] || [];

    minhaListaTitle.textContent = `Minha Jornada — ${activeProfileName}`;

    if (!items.length) {
      const emptyState = document.createElement('li');
      emptyState.className = 'empty-list-state';
      emptyState.textContent = `${activeProfileName} ainda não iniciou sua jornada...`;
      minhaListaList.append(emptyState);
      bindMediaCardKeyboardNavigation();
      return;
    }

    items.forEach((title) => {
      minhaListaList.append(createMinhaListaItem(title));
    });

    bindMediaCardKeyboardNavigation();
  }

  const toggleTitleInActiveProfile = (
    title,
    dialogInvoker
  ) => {
    if (!activeProfileId) {
      openProfileDialog(dialogInvoker);
      return;
    }

    const normalizedLists =
      normalizeProfileLists(profileLists);
    const currentList =
      normalizedLists[activeProfileId] || [];
    const alreadyAdded = currentList.includes(title);

    const updatedLists = {
      ...normalizedLists,
      [activeProfileId]: alreadyAdded
        ? currentList.filter((item) => item !== title)
        : [...currentList, title],
    };

    profileLists = updatedLists;

    saveProfileLists(updatedLists);
    renderCatalogActions();
    renderMinhaLista();
  };

  const handleCatalogActionClick = (event) => {
    const actionButton = event.currentTarget;
    const card = actionButton.closest('.media-card');
    const title = getCardTitle(card);

    if (!title) return;

    if (!activeProfileId) {
      event.preventDefault();
      openProfileDialog(actionButton);
      return;
    }

    toggleTitleInActiveProfile(title, actionButton);
  };

  const removeTitleFromActiveProfile = (title) => {
    if (!activeProfileId) return;

    const normalizedLists =
      normalizeProfileLists(profileLists);
    const currentList =
      normalizedLists[activeProfileId] || [];
    const updatedLists = {
      ...normalizedLists,
      [activeProfileId]: currentList.filter(
        (item) => item !== title
      ),
    };

    profileLists = updatedLists;
    saveProfileLists(updatedLists);
    renderCatalogActions();
    renderMinhaLista();
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);

    if (!toggleButton) return;

    const isDark = theme === THEME_DARK;
    toggleButton.setAttribute(
      'aria-pressed',
      String(isDark)
    );
    toggleButton.setAttribute(
      'title',
      isDark ? 'Ativar tema escuro' : 'Ativar tema claro'
    );

    if (toggleText) {
      toggleText.textContent = `Tema: ${
        isDark ? 'Escuro' : 'Claro'
      }`;
    }
    updateFooterLogo(theme);
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

  const isA11yMenuOpen = () =>
    Boolean(
      a11yMenuContainer?.classList.contains('is-open')
    );

  const setA11yMenuState = (openMenu) => {
    if (!a11yMenuContainer || !a11yMenuToggle) return;

    a11yMenuContainer.classList.toggle('is-open', openMenu);
    a11yMenuToggle.setAttribute(
      'aria-expanded',
      String(openMenu)
    );
  };

  const syncA11yMenuByViewport = () => {
    if (a11yDesktopMediaQuery.matches) {
      setA11yMenuState(false);
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
  updateFooterLogo(initialTheme);
  applyReadingMode(initialReadingMode);
  applyFontScale(initialScale);
  setFooterYear();
  syncA11yMenuByViewport();
  saveProfileLists(profileLists);
  updateProfileButtonsState();
  updateActiveProfileStatus();
  renderMinhaLista();
  renderCatalogActions();

  const renderLucideIcons = () => {
    if (!window.lucide?.createIcons) return false;

    window.lucide.createIcons();
    return true;
  };

  const ensureLucideIcons = () => {
    if (renderLucideIcons()) return;

    let attempts = 0;
    const maxAttempts = 20;
    const retryDelayMs = 120;

    const interval = window.setInterval(() => {
      attempts += 1;

      const rendered = renderLucideIcons();
      if (rendered || attempts >= maxAttempts) {
        window.clearInterval(interval);
      }
    }, retryDelayMs);
  };

  ensureLucideIcons();

  a11yMenuToggle?.addEventListener('click', () => {
    if (a11yDesktopMediaQuery.matches) return;

    const nextOpenState = !isA11yMenuOpen();
    setA11yMenuState(nextOpenState);

    if (nextOpenState) {
      a11yMenuClose?.focus();
    } else {
      a11yMenuToggle.focus();
    }
  });

  a11yMenuClose?.addEventListener('click', () => {
    setA11yMenuState(false);
    a11yMenuToggle?.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (
      event.key !== 'Escape' ||
      !isA11yMenuOpen() ||
      a11yDesktopMediaQuery.matches
    ) {
      return;
    }

    setA11yMenuState(false);
    a11yMenuToggle?.focus();
  });

  if (
    typeof a11yDesktopMediaQuery.addEventListener ===
    'function'
  ) {
    a11yDesktopMediaQuery.addEventListener(
      'change',
      syncA11yMenuByViewport
    );
  } else if (
    typeof a11yDesktopMediaQuery.addListener === 'function'
  ) {
    a11yDesktopMediaQuery.addListener(
      syncA11yMenuByViewport
    );
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
    root.setAttribute('data-theme', nextTheme);
    toggleButton.setAttribute(
      'aria-pressed',
      String(isDark)
    );
    toggleText.textContent = `Tema: ${
      isDark ? 'Escuro' : 'Claro'
    }`;
    updateFooterLogo(nextTheme);
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

  profileButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const profileId = button.dataset.profileId;

      if (!profileId) return;

      setActiveProfile(profileId);

      if (intentToScrollMinhaLista) {
        if (menuMinhaListaLink) {
          menuMinhaListaLink.click();
        } else {
          const minhaListaSection =
            document.getElementById('minha-lista');

          minhaListaSection?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }

        focusMinhaListaTitleWhenVisible();

        intentToScrollMinhaLista = false;
      }
    });
  });

  document
    .querySelectorAll(
      '#series [data-list-action], #filmes [data-list-action], #bombando [data-list-action]'
    )
    .forEach((button) => {
      button.addEventListener(
        'click',
        handleCatalogActionClick
      );
    });

  minhaListaList?.addEventListener('click', (event) => {
    const removeButton = event.target.closest(
      '[data-remove-from-list]'
    );

    if (!removeButton) return;

    const card = removeButton.closest('.media-card');
    const title = getCardTitle(card);

    if (!title) return;

    removeTitleFromActiveProfile(title);
  });

  menuMinhaListaLink?.addEventListener('click', (event) => {
    if (activeProfileId) return;

    event.preventDefault();
    intentToScrollMinhaLista = true;
    openProfileDialog(menuMinhaListaLink);
  });

  profileDialogChooseButton?.addEventListener(
    'click',
    () => {
      closeProfileDialog({ restoreFocus: false });
      navigateToHomeSection();
    }
  );

  profileDialogCloseButton?.addEventListener(
    'click',
    () => {
      intentToScrollMinhaLista = false;
      closeProfileDialog();
    }
  );

  profileDialog?.addEventListener('cancel', (event) => {
    event.preventDefault();
    intentToScrollMinhaLista = false;
    closeProfileDialog();
  });

  switchProfileTrigger?.addEventListener('click', () => {
    openSwitchProfileModal(switchProfileTrigger);
  });

  switchProfileCancelButton?.addEventListener(
    'click',
    () => {
      closeSwitchProfileModal();
    }
  );

  switchProfileConfirmButton?.addEventListener(
    'click',
    () => {
      closeSwitchProfileModal({ restoreFocus: false });
      clearActiveProfile();
      intentToScrollMinhaLista = false;

      profilesSection?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      focusProfilesHeadingWhenVisible();
    }
  );

  switchProfileModalOverlay?.addEventListener(
    'click',
    (event) => {
      if (event.target !== switchProfileModalOverlay) {
        return;
      }

      closeSwitchProfileModal();
    }
  );

  document.addEventListener(
    'keydown',
    trapSwitchProfileModalFocus
  );

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

  const getGridColumnCount = (section) => {
    const mediaList = section.querySelector('ul');

    if (!mediaList) return 1;

    const gridTemplateColumns = window
      .getComputedStyle(mediaList)
      .gridTemplateColumns.trim();

    if (!gridTemplateColumns) return 1;

    return gridTemplateColumns.split(' ').length;
  };

  const getNextCardIndex = ({
    currentIndex,
    key,
    columns,
    total,
  }) => {
    const getWrappedIndex = (step) =>
      (currentIndex + step + total) % total;
    const rowOffset = currentIndex % columns;
    const downCandidate = currentIndex + columns;
    const upCandidate = currentIndex - columns;
    const lastRowStart =
      Math.floor((total - 1) / columns) * columns;
    const upWrapped = lastRowStart + rowOffset;

    const keyMap = {
      ArrowRight: getWrappedIndex(1),
      ArrowLeft: getWrappedIndex(-1),
      ArrowDown:
        downCandidate < total ? downCandidate : null,
      ArrowUp:
        upCandidate >= 0
          ? upCandidate
          : Math.min(upWrapped, total - 1),
      Home: 0,
      End: total - 1,
    };

    if (!(key in keyMap)) return currentIndex;

    return keyMap[key];
  };

  function bindMediaCardKeyboardNavigation() {
    const mediaCards =
      document.querySelectorAll('.media-card');

    mediaCards.forEach((card) => {
      if (card.dataset.keyboardBound === 'true') return;

      card.dataset.keyboardBound = 'true';
      card.addEventListener('keydown', (event) => {
        if (event.target !== card) return;

        const supportedKeys = [
          'ArrowRight',
          'ArrowLeft',
          'ArrowDown',
          'ArrowUp',
          'Home',
          'End',
        ];

        if (!supportedKeys.includes(event.key)) return;

        const section = card.closest('.media-section');

        if (!section) return;

        const backButton =
          section.querySelector('.back-to-menu');
        const cardsInSection = Array.from(
          section.querySelectorAll('.media-card')
        );
        const currentIndex = cardsInSection.indexOf(card);

        if (currentIndex < 0) return;

        const columnCount = getGridColumnCount(section);
        const nextIndex = getNextCardIndex({
          currentIndex,
          key: event.key,
          columns: columnCount,
          total: cardsInSection.length,
        });

        if (
          event.key === 'ArrowDown' &&
          nextIndex === null
        ) {
          if (!backButton) return;

          event.preventDefault();
          backButton.focus();
          return;
        }

        if (nextIndex === currentIndex) return;

        event.preventDefault();
        cardsInSection[nextIndex]?.focus();
      });
    });
  }

  bindMediaCardKeyboardNavigation();

  backToMenuButtons.forEach((button) => {
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowUp') return;

      const section = button.closest('.media-section');

      if (!section) return;

      const cardsInSection = Array.from(
        section.querySelectorAll('.media-card')
      );

      if (!cardsInSection.length) return;

      event.preventDefault();
      cardsInSection[cardsInSection.length - 1].focus();
    });
  });
})();
