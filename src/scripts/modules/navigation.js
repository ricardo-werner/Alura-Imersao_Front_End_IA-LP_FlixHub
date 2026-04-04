const HIDDEN_CLASS = 'is-hidden';

const MENU_ACTIVE_ATTR = 'aria-current';
const MENU_ACTIVE_VALUE = 'page';

const HOME_SECTION_TITLES = [
  'perfis-titulo',
  'destaque-titulo',
];
const MEDIA_SECTION_IDS = [
  'series',
  'filmes',
  'bombando',
  'minha-lista',
];

const getFocusableHeading = (section) => {
  if (!section) return null;

  const heading = section.querySelector('h2');
  if (!heading) return null;

  if (!heading.hasAttribute('tabindex')) {
    heading.setAttribute('tabindex', '-1');
  }

  return heading;
};

const setSectionVisible = (section, isVisible) => {
  if (!section) return;

  section.classList.toggle(HIDDEN_CLASS, !isVisible);
  section.setAttribute('aria-hidden', String(!isVisible));
};

const updateMenuState = (menuLinks, activeId) => {
  menuLinks.forEach((link) => {
    const targetId = link
      .getAttribute('href')
      ?.replace('#', '');
    const isActive = targetId === activeId;

    if (isActive) {
      link.setAttribute(
        MENU_ACTIVE_ATTR,
        MENU_ACTIVE_VALUE
      );
      return;
    }

    link.removeAttribute(MENU_ACTIVE_ATTR);
  });
};

const normalizeTargetId = (rawId) => {
  if (!rawId) return 'inicio';

  const targetId = rawId.replace('#', '');
  if (targetId === 'inicio') return 'inicio';

  return MEDIA_SECTION_IDS.includes(targetId)
    ? targetId
    : 'inicio';
};

const focusVisibleHeading = (section) => {
  const heading = getFocusableHeading(section);
  heading?.focus({ preventScroll: true });
};

const KEYBOARD_ACTIVATION_KEYS = ['Enter', ' ', 'Spacebar'];

const isKeyboardActivationKey = (event) =>
  KEYBOARD_ACTIVATION_KEYS.includes(event.key);

const getFirstInteractiveElement = (container) => {
  if (!container) return null;

  const interactiveSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const interactiveElements = Array.from(
    container.querySelectorAll(interactiveSelector)
  ).filter(
    (element) =>
      element instanceof HTMLElement &&
      !element.hasAttribute('disabled') &&
      element.getAttribute('aria-hidden') !== 'true'
  );

  return interactiveElements[0] || null;
};

export const initNavigation = ({
  mainSelector = '#main-content',
  menuSelector = 'aside nav a[href^="#"]',
} = {}) => {
  const mainContent = document.querySelector(mainSelector);
  const menuLinks = Array.from(
    document.querySelectorAll(menuSelector)
  );

  if (!mainContent || !menuLinks.length) {
    return {
      showSection: () => {},
      showHome: () => {},
    };
  }

  const allSections = Array.from(
    mainContent.querySelectorAll(':scope > section')
  );
  const homeSections = allSections.filter((section) => {
    const labelledBy = section.getAttribute(
      'aria-labelledby'
    );
    return HOME_SECTION_TITLES.includes(labelledBy);
  });

  const mediaSections = MEDIA_SECTION_IDS.map((id) =>
    document.getElementById(id)
  ).filter(Boolean);

  const sectionById = mediaSections.reduce(
    (acc, section) => {
      acc[section.id] = section;
      return acc;
    },
    {}
  );

  const showHome = ({
    shouldFocus = true,
    updateHash = true,
  } = {}) => {
    homeSections.forEach((section) =>
      setSectionVisible(section, true)
    );
    mediaSections.forEach((section) =>
      setSectionVisible(section, false)
    );

    updateMenuState(menuLinks, 'inicio');

    if (updateHash) {
      history.replaceState(null, '', '#inicio');
    }

    if (shouldFocus) {
      focusVisibleHeading(homeSections[0]);
    }
  };

  const showSection = (
    targetId,
    { shouldFocus = true, updateHash = true } = {}
  ) => {
    const normalizedId = normalizeTargetId(targetId);

    if (normalizedId === 'inicio') {
      showHome({ shouldFocus, updateHash });
      return;
    }

    const activeSection = sectionById[normalizedId];

    homeSections.forEach((section) =>
      setSectionVisible(section, false)
    );
    mediaSections.forEach((section) => {
      setSectionVisible(section, section === activeSection);
    });

    updateMenuState(menuLinks, normalizedId);

    if (updateHash) {
      history.replaceState(null, '', `#${normalizedId}`);
    }

    if (shouldFocus) {
      focusVisibleHeading(activeSection);
    }
  };

  const focusFirstInteractiveByTarget = (targetId) => {
    const normalizedId = normalizeTargetId(targetId);

    const container =
      normalizedId === 'inicio'
        ? homeSections.find(
            (section) =>
              !section.classList.contains(HIDDEN_CLASS)
          ) || homeSections[0]
        : sectionById[normalizedId];

    const firstInteractive =
      getFirstInteractiveElement(container);

    if (firstInteractive) {
      firstInteractive.focus({ preventScroll: true });
      return;
    }

    if (normalizedId === 'inicio') {
      focusVisibleHeading(homeSections[0]);
      return;
    }

    focusVisibleHeading(sectionById[normalizedId]);
  };

  const activateMenuNavigation = (
    targetId,
    { fromKeyboard = false } = {}
  ) => {
    showSection(targetId, {
      shouldFocus: !fromKeyboard,
      updateHash: true,
    });

    if (fromKeyboard) {
      focusFirstInteractiveByTarget(targetId);
    }
  };

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link
        .getAttribute('href')
        ?.replace('#', '');

      if (!targetId) return;

      event.preventDefault();
      activateMenuNavigation(targetId);
    });

    link.addEventListener('keydown', (event) => {
      if (!isKeyboardActivationKey(event)) return;

      const targetId = link
        .getAttribute('href')
        ?.replace('#', '');

      if (!targetId) return;

      event.preventDefault();
      activateMenuNavigation(targetId, {
        fromKeyboard: true,
      });
    });
  });

  const targetFromHash = normalizeTargetId(
    window.location.hash
  );
  showSection(targetFromHash, {
    shouldFocus: false,
    updateHash: false,
  });

  window.addEventListener('hashchange', () => {
    const hashTarget = normalizeTargetId(
      window.location.hash
    );
    showSection(hashTarget, {
      shouldFocus: false,
      updateHash: false,
    });
  });

  return {
    showSection,
    showHome,
  };
};
