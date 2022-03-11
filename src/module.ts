import { defineNuxtModule } from '@nuxt/kit'
import * as lodash from 'lodash-es'
import exculdeDefaults from './exclude'

export interface ModuleOptions {
  /**
   * Prefix to be added before every lodash function.
   * False to disable prefix
   */
  prefix?: false | string;
  /**
   * Functions that starts with keywords in this array will be skipped by prefix
   */
  prefixSkip?: string[];
  /**
   * Array of lodash funcions to be exluded from auto-imports
   */
  exclude?: string[];
  /**
   * Iterable of string pairs to alias each function
   */
  alias?: Iterable<[string, string]>;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-lodash',
    configKey: 'lodash',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: [],
    alias: []
  },
  setup (options, nuxt) {
    const imports = []
    const prefix = options.prefix || ''
    const aliasMap = new Map(options.alias)
    const exludes = [...options.exclude, ...exculdeDefaults]

    for (const [name] of Object.entries(lodash)) {
      if (!exludes.includes(name)) {
        const alias = aliasMap.has(name) ? aliasMap.get(name) : name
        const as = (() => {
          const isPrefix = !options.prefixSkip.some(key => alias.startsWith(key)) && prefix
          return isPrefix ? prefix + lodash.upperFirst(alias) : alias
        })()
        imports.push({ name, as })
      }
    }

    nuxt.hook('vite:extend', ({ config }) => {
      config.optimizeDeps ||= {}
      config.optimizeDeps.exclude ||= []
      config.optimizeDeps.exclude.push('lodash-es')
    })

    nuxt.hook('autoImports:sources', (sources) => {
      if (sources.find(i => i.from === 'lodash-es'))
          return

      sources.push({ imports, from: 'lodash-es' })
    })
  }
})
