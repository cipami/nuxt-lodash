import { defineNuxtConfig } from 'nuxt3'
import nuxtLodash from '..'

export default defineNuxtConfig({
  buildModules: [
    nuxtLodash
  ],
  lodash: {
    prefix: 'use',
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      ['kebabCase', 'stringToKebabCase'] // => useStringToKebabCase
    ]
  }
})
