import nuxtLodash from '..';

export default defineNuxtConfig({
  modules: [
    nuxtLodash,
  ],
  lodash: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      ['kebabCase', 'stringToKebabCase'], // => useStringToKebabCase
    ],
  },
});
