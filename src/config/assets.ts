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
  localize: createNumberedThemeAssets(
    'localize',
    12,
    '.app.jpg',
    'Localize mobile application screen'
  ),

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