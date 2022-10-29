export default defineNuxtConfig({
  modules: ['nuxt-lodash'],
  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: true,
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => stringToCamelCase
      ['kebabCase', 'stringToKebab'], // => stringToKebab
      ['isDate', 'isLodashDate'] // => _isLodashDate
    ]
  }
})
