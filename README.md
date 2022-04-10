 <h1>Lodash for Nuxt</h1>
 
<p>
  <a href="https://www.npmjs.com/package/nuxt-lodash"><img src="https://badgen.net/npm/v/nuxt-lodash" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-lodash"><img src="https://badgen.net/npm/license/nuxt-lodash" alt="License"></a>
  <a href="https://www.npmjs.com/package/nuxt-lodash"><img src="https://badgen.net/npm/types/nuxt-lodash" alt="Types"></a>
</p>
   
## 💡 About

[Lodash](https://lodash.com) auto-import module for [Nuxt](https://nuxtjs.org).

## 📦 Install

1. Install `nuxt-lodash` as development dependency:

```bash
npm i nuxt-lodash -D
```

2. Add it to the `modules` section of your `nuxt.config`:

```ts
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  modules: ['nuxt-lodash']
})
```

## 🚀 Example

Use any [Lodash](https://lodash.com) methods in your Nuxt application, they will be auto-imported!

```html
<script setup>
const text = useToUpper('it works!');
</script>

<template>
  <div>{{ text }}</div>
</template>
```

## 🔨 Config

| Name         | Default  | Description                                                                      |
| ------------ | -------- | -------------------------------------------------------------------------------- |
| `prefix`     | `'use'`  | String to prepend before each Lodash function (false to disable)                 |
| `prefixSkip` | `['is']` | Functions that starts with keywords in this array will be skipped by prefix      |
| `exclude`    | `[]`     | Array of Lodash functions to exlude from auto-imports                            |
| `alias`      | `[]`     | Array of array pairs to rename specific Lodash functions (prefix is still added) |

## 💻 Example - Config

```ts
import { defineNuxtConfig } from 'nuxt3';

export default defineNuxtConfig({
  modules: ['nuxt-lodash'],
  lodash: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: ['map'],
    alias: [
      ['camelCase', 'stringToCamelCase'], // => useStringToCamelCase
      ['kebabCase', 'stringToKebabCase'], // => useStringToKebabCase
    ]
  }
});
```

## 📄 License

[MIT License](https://github.com/cipami/nuxt-lodash/blob/master/LICENSE) © 2021-2022 - [Michal Čípa](https://github.com/cipami)
