export type ThemeAsset = {
  light: string;
  dark: string;
  alt: string;
};

const baseUrl = import.meta.env.BASE_URL.replace(/\/+$/, '');

const publicAsset = (path: string): string => {
  const normalizedPath = path.replace(/^\/+/, '');

  return `${baseUrl}/${normalizedPath}`;
};

const createThemeAsset = (
  directory: string,
  filename: string,
  extension: string,
  alt: string
): ThemeAsset => ({
  light: publicAsset(
    `images/projects/${directory}/${filename}_light${extension}`
  ),
  dark: publicAsset(
    `images/projects/${directory}/${filename}_dark${extension}`
  ),
  alt,
});

const createNumberedThemeAssets = (
  directory: string,
  count: number,
  extension: string,
  altPrefix: string
): ThemeAsset[] =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1;

    return createThemeAsset(
      directory,
      String(number),
      extension,
      `${altPrefix} ${number}`
    );
  });

const createLocalizeAsset = (
  filename: string,
  alt: string,
  extension: '.jpg' | '.png' = '.jpg'
): ThemeAsset => ({
  light: publicAsset(`images/projects/localize/${filename}--light${extension}`),
  dark: publicAsset(`images/projects/localize/${filename}--dark${extension}`),
  alt,
});

export const ASSETS = {
  favicon: publicAsset('favicon.svg'),

  video: {
    hero: publicAsset('videos/hero-background.mp4'),
  },

  profile: {
    konstantin: publicAsset('images/profile/konstantin.jpg'),
  },

  education: {
    university: publicAsset('images/education/university.jpg'),
  },

  experience: {
    innowiseLogo: publicAsset('images/experience/innowise-logo.png'),
  },
} as const;

export const PROJECT_IMAGES = {
  localize: [
    {
      light: publicAsset('images/projects/localize/business-welcome.jpg'),
      dark: publicAsset('images/projects/localize/business-welcome.jpg'),
      alt: 'Localize business welcome',
    },
    createLocalizeAsset('customer-discovery', 'Localize discovery and current offers'),
    createLocalizeAsset('business-restaurant-profile', 'Localize restaurant profile overview'),
    createLocalizeAsset('business-restaurant-offers', 'Localize restaurant details and offers'),
    createLocalizeAsset('business-upcoming-appointments', 'Localize upcoming appointments'),
    createLocalizeAsset('business-pending-appointments', 'Localize pending appointment requests'),
    createLocalizeAsset('business-appointments-agenda', 'Localize appointment agenda'),
    createLocalizeAsset('customer-pending-appointment', 'Localize customer appointment details'),
    createLocalizeAsset('business-appointment-decline-reason', 'Localize appointment decline reason'),
    createLocalizeAsset('business-declined-appointment', 'Localize declined appointment details'),
    createLocalizeAsset('customer-appointment-check-in-qr', 'Localize guest appointment QR code'),
    createLocalizeAsset('business-appointment-qr-scanner', 'Localize QR check-in scanner'),
    createLocalizeAsset('business-checked-in-appointments', 'Localize checked-in appointments'),
    createLocalizeAsset('business-bonus-qr', 'Localize loyalty bonus QR actions'),
    createLocalizeAsset('business-give-stamp-qr', 'Localize QR for issuing loyalty stamps'),
    createLocalizeAsset('customer-stamp-added', 'Localize loyalty stamp confirmation'),
    createLocalizeAsset('customer-profile', 'Localize customer profile'),
    createLocalizeAsset('customer-wallet-stamps', 'Localize loyalty wallet and stamps'),
    createLocalizeAsset('customer-login', 'Localize customer sign-in'),
    createLocalizeAsset('business-customer-reviews', 'Localize customer reviews'),
  ],

  dOne: createNumberedThemeAssets(
    'd-one',
    9,
    '.app.jpg',
    'DOne diabetes diary mobile application screen'
  ),

  bookLibrary: createNumberedThemeAssets(
    'book_library',
    5,
    '.png',
    'Book Library interface screen'
  ),

  showBusinessSite: [
    createThemeAsset(
      'show-business-site',
      '1',
      '.png',
      'Show Business Website preview'
    ),
  ],

  reactSpaApp: [
    createThemeAsset('react-spa-app', '1', '.png', 'React SPA Store preview'),
  ],

  quotesApp: [
    createThemeAsset('quotes-app', '1', '.png', 'Quotes App main screen'),
    createThemeAsset('quotes-app', '2', '.png', 'Quotes App additional screen'),
  ],

  nextTalkApp: [
    createThemeAsset(
      'next-talk-app',
      '1',
      '.png',
      'NextTalk application preview'
    ),
  ],
};