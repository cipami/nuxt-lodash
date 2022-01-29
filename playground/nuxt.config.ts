import { defineNuxtConfig } from 'nuxt3'
import nuxtLodash from '..'

export default defineNuxtConfig({
  buildModules: [
    nuxtLodash
  ],
  lodash: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      ['kebabCase', 'stringToKebabCase'] // => useStringToKebabCase
    ]
  }
})
