type Theme = 'light' | 'dark';
type ThemeMode = Theme | 'system';

const root = document.documentElement;
const body = document.body;
const header = document.querySelector<HTMLElement>('[data-site-header]');
const heroShell = document.querySelector<HTMLElement>('.hero-shell');
const menuToggle =
  document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');
const lightbox = document.querySelector<HTMLDialogElement>(
  '[data-lightbox-dialog]'
);
const lightboxImage = document.querySelector<HTMLImageElement>(
  '[data-lightbox-image]'
);
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
const reducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const getThemeMode = (): ThemeMode => {
  const mode = root.dataset.themeMode;

  if (mode === 'light' || mode === 'dark' || mode === 'system') {
    return mode;
  }

  return 'system';
};

const getSystemTheme = (): Theme =>
  systemThemeQuery.matches ? 'dark' : 'light';

const resolveTheme = (mode: ThemeMode): Theme =>
  mode === 'system' ? getSystemTheme() : mode;

const updateThemeImages = (theme: Theme): void => {
  document
    .querySelectorAll<HTMLImageElement>('[data-theme-image]')
    .forEach((image) => {
      const source =
        theme === 'dark' ? image.dataset.darkSrc : image.dataset.lightSrc;

      if (source && image.src !== new URL(source, window.location.href).href) {
        image.src = source;
      }
    });

  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0c0e0c' : '#f4f1e8');
};

const updateThemeSwitcher = (mode: ThemeMode): void => {
  document
    .querySelectorAll<HTMLButtonElement>('[data-theme-mode]')
    .forEach((button) => {
      const selected = button.dataset.themeMode === mode;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-checked', String(selected));
    });
};

const setThemeMode = (mode: ThemeMode, persist = true): void => {
  const theme = resolveTheme(mode);

  root.dataset.themeMode = mode;
  root.dataset.theme = theme;

  if (persist) {
    localStorage.setItem('portfolio-theme-mode', mode);
  }

  updateThemeSwitcher(mode);
  updateThemeImages(theme);
};

setThemeMode(getThemeMode(), false);

document
  .querySelectorAll<HTMLButtonElement>('[data-theme-mode]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.dataset.themeMode;

      if (mode === 'light' || mode === 'dark' || mode === 'system') {
        setThemeMode(mode);
      }
    });
  });

systemThemeQuery.addEventListener('change', () => {
  if (getThemeMode() === 'system') {
    setThemeMode('system', false);
  }
});

const intro = document.querySelector<HTMLElement>('[data-intro-screen]');
const introSeen = sessionStorage.getItem('portfolio-intro-seen') === 'true';

if (intro) {
  if (reducedMotion || introSeen) {
    intro.remove();
  } else {
    body.classList.add('is-intro-active');
    sessionStorage.setItem('portfolio-intro-seen', 'true');

    window.setTimeout(() => {
      intro.classList.add('is-leaving');
      body.classList.remove('is-intro-active');
    }, 2500);

    window.setTimeout(() => intro.remove(), 3300);
  }
}

const updateHeader = (): void => {
  if (!header) {
    return;
  }

  header.classList.toggle('is-scrolled', window.scrollY > 14);

  if (!heroShell) {
    header.classList.remove('is-over-hero');
    return;
  }

  const heroBottom = heroShell.getBoundingClientRect().bottom;
  const headerHeight = header.offsetHeight;

  header.classList.toggle('is-over-hero', heroBottom > headerHeight);
};

updateHeader();

window.addEventListener('scroll', updateHeader, {
  passive: true,
});

window.addEventListener('resize', updateHeader, {
  passive: true,
});

const closeMobileMenu = (): void => {
  header?.classList.remove('is-menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = header?.classList.toggle('is-menu-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

const revealGroup = (group: HTMLElement): void => {
  if (group.matches('.reveal-item')) {
    group.style.transitionDelay = '0ms';
    group.classList.add('is-visible');
  }

  group.querySelectorAll<HTMLElement>('.reveal-item').forEach((item) => {
    item.style.transitionDelay = '0ms';
    item.classList.add('is-visible');
  });
};

if (reducedMotion) {
  document.querySelectorAll<HTMLElement>('.reveal-item').forEach((item) => {
    item.classList.add('is-visible');
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        revealGroup(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
  );

  document
    .querySelectorAll<HTMLElement>('[data-reveal-group]')
    .forEach((group) => {
      revealObserver.observe(group);
    });

  const singleRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll<HTMLElement>('.reveal-item').forEach((item) => {
    if (!item.closest('[data-reveal-group]')) {
      singleRevealObserver.observe(item);
    }
  });
}

const navigationLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a')
);
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navigationLinks.forEach((link) => {
        link.classList.toggle('is-active', link.hash === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
);

['about', 'projects', 'contacts', 'education'].forEach((id) => {
  const section = document.getElementById(id);
  if (section) {
    sectionObserver.observe(section);
  }
});

let scrollLockY = 0;

const syncDialogScrollLock = (): void => {
  const hasOpenDialog = Array.from(
    document.querySelectorAll<HTMLDialogElement>('dialog')
  ).some((dialog) => dialog.open);
  const isLocked = body.classList.contains('is-dialog-open');

  if (hasOpenDialog && !isLocked) {
    scrollLockY = window.scrollY;
    body.classList.add('is-dialog-open');
    body.style.position = 'fixed';
    body.style.top = `-${scrollLockY}px`;
    body.style.width = '100%';
    return;
  }

  if (!hasOpenDialog && isLocked) {
    body.classList.remove('is-dialog-open');
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: scrollLockY, behavior: 'auto' });
    window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
  }
};

const openDialog = (dialog: HTMLDialogElement): void => {
  if (!dialog.open) {
    dialog.showModal();
  }
  syncDialogScrollLock();
};

const closeDialog = (dialog: HTMLDialogElement): void => {
  if (dialog.open) {
    dialog.close();
  }
  syncDialogScrollLock();
};

document
  .querySelectorAll<HTMLButtonElement>('[data-gallery-open]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const galleryId = button.dataset.galleryOpen;
      const dialog = document.querySelector<HTMLDialogElement>(
        `[data-gallery-dialog="${galleryId}"]`
      );

      if (dialog) {
        openDialog(dialog);
      }
    });
  });

document
  .querySelectorAll<HTMLButtonElement>('[data-dialog-close]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = button.closest<HTMLDialogElement>('dialog');
      if (dialog) {
        closeDialog(dialog);
      }
    });
  });

document.querySelectorAll<HTMLDialogElement>('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      closeDialog(dialog);
    }
  });

  dialog.addEventListener('close', syncDialogScrollLock);
  dialog.addEventListener('cancel', () =>
    window.setTimeout(syncDialogScrollLock)
  );
});

const openLightbox = (button: HTMLElement): void => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  const theme = resolveTheme(getThemeMode());
  const source =
    theme === 'dark' ? button.dataset.darkSrc : button.dataset.lightSrc;
  const alt = button.dataset.lightboxAlt ?? 'Project screenshot';
  const imageKind = button.dataset.imageKind ?? 'desktop';

  if (!source) {
    return;
  }

  lightbox.classList.toggle('is-mobile-image', imageKind === 'mobile');
  lightboxImage.src = source;
  lightboxImage.alt = alt;

  openDialog(lightbox);
};

document
  .querySelectorAll<HTMLElement>('[data-lightbox-open]')
  .forEach((button) => {
    button.addEventListener('click', () => openLightbox(button));
  });

document
  .querySelector<HTMLButtonElement>('[data-lightbox-close]')
  ?.addEventListener('click', () => {
    if (lightbox) {
      closeDialog(lightbox);
    }
  });

const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canTilt && !reducedMotion) {
  document.querySelectorAll<HTMLElement>('[data-tilt-card]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      card.style.transform = `perspective(1100px) rotateX(${y * -2.4}deg) rotateY(${x * 3.2}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

const rail = document.querySelector<HTMLElement>('[data-section-rail]');
const railHandle = document.querySelector<HTMLButtonElement>(
  '[data-section-rail-handle]'
);

const railStations = Array.from(
  document.querySelectorAll<HTMLAnchorElement>('[data-section-rail-station]')
);

let isRailDragging = false;
let railDragMoved = false;
let railPointerStartY = 0;
let activeRailPointerId: number | null = null;

let railProgress = 0;
let railDragProgress = 0;
let railFrame = 0;

let railSnapTargetIndex: number | null = null;
let railSnapSettleTimer: number | undefined;
let railSnapFallbackTimer: number | undefined;

const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value));

const sectionTargets = (): HTMLElement[] =>
  railStations
    .map((station) => {
      const targetId = station.dataset.sectionTarget ?? '';

      return document.getElementById(targetId);
    })
    .filter((target): target is HTMLElement => Boolean(target));

const setRailProgress = (value: number): void => {
  railProgress = clamp(value);

  rail?.style.setProperty('--rail-progress', railProgress.toFixed(4));
};

const setRailActiveStation = (activeIndex: number): void => {
  railStations.forEach((station, index) => {
    station.classList.toggle('is-active', index === activeIndex);
  });
};

const getStationCenterY = (station: HTMLAnchorElement): number => {
  const point = station.querySelector<HTMLElement>('span') ?? station;

  const bounds = point.getBoundingClientRect();

  return bounds.top + bounds.height / 2;
};

const getDragProgress = (clientY: number): number => {
  const firstStation = railStations.at(0);
  const lastStation = railStations.at(-1);

  if (!firstStation || !lastStation) {
    return railProgress;
  }

  const startY = getStationCenterY(firstStation);
  const endY = getStationCenterY(lastStation);

  if (endY <= startY) {
    return railProgress;
  }

  return clamp((clientY - startY) / (endY - startY));
};

const getTargetScrollTop = (target: HTMLElement): number => {
  const scrollMarginTop =
    Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;

  return Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - scrollMarginTop
  );
};

const calculateRailProgress = (): number => {
  const targets = sectionTargets();

  if (targets.length < 2) {
    return 0;
  }

  const offsets = targets.map((target) => getTargetScrollTop(target));

  const pageAnchor = window.scrollY + Math.min(window.innerHeight * 0.32, 250);

  if (pageAnchor <= offsets[0]) {
    return 0;
  }

  const lastIndex = offsets.length - 1;

  if (pageAnchor >= offsets[lastIndex]) {
    return 1;
  }

  for (let index = 0; index < lastIndex; index += 1) {
    const start = offsets[index];
    const end = offsets[index + 1];

    if (pageAnchor < start || pageAnchor > end) {
      continue;
    }

    const sectionProgress = (pageAnchor - start) / Math.max(1, end - start);

    return (index + sectionProgress) / lastIndex;
  }

  return 0;
};

const updateRailFromPage = (): void => {
  railFrame = 0;

  if (!rail || isRailDragging || railSnapTargetIndex !== null) {
    return;
  }

  const progress = calculateRailProgress();
  const stationCount = Math.max(1, railStations.length - 1);

  setRailProgress(progress);
  setRailActiveStation(Math.round(progress * stationCount));
};

const requestRailUpdate = (): void => {
  if (railFrame !== 0) {
    return;
  }

  railFrame = window.requestAnimationFrame(updateRailFromPage);
};

const clearRailSnapTimers = (): void => {
  window.clearTimeout(railSnapSettleTimer);
  window.clearTimeout(railSnapFallbackTimer);
};

const finishRailSnap = (): void => {
  clearRailSnapTimers();
  railSnapTargetIndex = null;
  requestRailUpdate();
};

const scheduleRailSnapFinish = (): void => {
  if (railSnapTargetIndex === null) {
    return;
  }

  window.clearTimeout(railSnapSettleTimer);

  railSnapSettleTimer = window.setTimeout(() => {
    if (railSnapTargetIndex === null) {
      return;
    }

    const target = sectionTargets()[railSnapTargetIndex];

    if (!target) {
      finishRailSnap();
      return;
    }

    const targetScrollTop = getTargetScrollTop(target);
    const distance = Math.abs(window.scrollY - targetScrollTop);

    if (distance <= 5 || reducedMotion) {
      finishRailSnap();
    }
  }, 140);
};

const snapPageToStation = (targetIndex: number): void => {
  const targets = sectionTargets();
  const target = targets[targetIndex];

  if (!target) {
    return;
  }

  const lastIndex = Math.max(1, railStations.length - 1);

  const normalizedIndex = Math.min(lastIndex, Math.max(0, targetIndex));

  clearRailSnapTimers();

  railSnapTargetIndex = normalizedIndex;

  setRailProgress(normalizedIndex / lastIndex);
  setRailActiveStation(normalizedIndex);

  window.scrollTo({
    top: getTargetScrollTop(target),
    behavior: reducedMotion ? 'auto' : 'smooth',
  });

  if (reducedMotion) {
    window.requestAnimationFrame(finishRailSnap);
    return;
  }

  railSnapFallbackTimer = window.setTimeout(finishRailSnap, 1800);
};

const cancelCurrentRailSnap = (): void => {
  clearRailSnapTimers();
  railSnapTargetIndex = null;
};

window.addEventListener(
  'scroll',
  () => {
    if (railSnapTargetIndex !== null) {
      scheduleRailSnapFinish();
    }

    requestRailUpdate();
  },
  { passive: true }
);

window.addEventListener('resize', requestRailUpdate, { passive: true });

railStations.forEach((station, index) => {
  station.addEventListener('click', (event) => {
    event.preventDefault();
    snapPageToStation(index);
  });
});

railHandle?.addEventListener('pointerdown', (event) => {
  if (
    activeRailPointerId !== null ||
    (event.pointerType === 'mouse' && event.button !== 0)
  ) {
    return;
  }

  event.preventDefault();

  cancelCurrentRailSnap();

  isRailDragging = true;
  railDragMoved = false;
  railPointerStartY = event.clientY;
  railDragProgress = railProgress;
  activeRailPointerId = event.pointerId;

  railHandle.classList.add('is-dragging');

  try {
    railHandle.setPointerCapture(event.pointerId);
  } catch {}
});

const updateRailDrag = (event: PointerEvent): void => {
  if (
    !isRailDragging ||
    activeRailPointerId === null ||
    event.pointerId !== activeRailPointerId
  ) {
    return;
  }

  event.preventDefault();

  railDragMoved =
    railDragMoved || Math.abs(event.clientY - railPointerStartY) > 3;

  railDragProgress = getDragProgress(event.clientY);

  setRailProgress(railDragProgress);
};

const finishRailDrag = (event?: PointerEvent): void => {
  if (!isRailDragging || !railHandle) {
    return;
  }

  if (
    event &&
    activeRailPointerId !== null &&
    event.pointerId !== activeRailPointerId
  ) {
    return;
  }

  const pointerId = activeRailPointerId;

  isRailDragging = false;
  activeRailPointerId = null;
  railHandle.classList.remove('is-dragging');

  if (pointerId !== null) {
    try {
      if (railHandle.hasPointerCapture(pointerId)) {
        railHandle.releasePointerCapture(pointerId);
      }
    } catch {}
  }

  if (!railDragMoved) {
    snapPageToStation(0);
    return;
  }

  const lastIndex = Math.max(1, railStations.length - 1);

  const nearestIndex = Math.round(railDragProgress * lastIndex);

  snapPageToStation(nearestIndex);
};

window.addEventListener('pointermove', updateRailDrag, { passive: false });

window.addEventListener('pointerup', finishRailDrag);
window.addEventListener('pointercancel', finishRailDrag);

window.addEventListener('blur', () => {
  if (isRailDragging) {
    finishRailDrag();
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && isRailDragging) {
    finishRailDrag();
  }
});

railHandle?.addEventListener('lostpointercapture', () => {
  if (isRailDragging) {
    finishRailDrag();
  }
});

requestRailUpdate();

const heroBackgroundVideo = document.querySelector<HTMLVideoElement>(
  '[data-hero-background-video]'
);

if (heroBackgroundVideo) {
  const showHeroBackgroundVideo = (): void => {
    heroBackgroundVideo.classList.add('is-ready');
  };

  heroBackgroundVideo.addEventListener('playing', showHeroBackgroundVideo, {
    once: true,
  });

  if (heroBackgroundVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    showHeroBackgroundVideo();
  }

  void heroBackgroundVideo.play().catch(() => {});
}
