/** @type {import('prettier').Config} */
const config = {
  plugins: ['prettier-plugin-astro'],

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],

  printWidth: 80,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
};

export default config;
