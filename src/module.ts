import { defineNuxtModule } from '@nuxt/kit'
import * as lodash from 'lodash-es'

export interface ModuleOptions {
  /**
   * Prefix to be added before every lodash function.
   * false to disable prefix
   */
  prefix?: false | string;
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
    exclude: [],
    alias: []
  },
  setup (options, nuxt) {
    const names = []
    const prefix = options.prefix || ''
    const aliasMap = new Map(options.alias)
    const exludes = [...options.exclude, 'VERSION', 'templateSettings']

    for (const [name] of Object.entries(lodash)) {
      if (!exludes.includes(name)) {
        const alias = aliasMap.has(name) ? aliasMap.get(name) : name
        const as = prefix + prefix ? lodash.upperFirst(alias) : alias
        names.push({ name, as })
      }
    }

    nuxt.hook('vite:extend', ({ config }) => {
      config.optimizeDeps ||= {}
      config.optimizeDeps.exclude ||= []
      config.optimizeDeps.exclude.push('lodash-es')
    })

    nuxt.hook('autoImports:sources', (sources) => {
      sources.push({ names, from: 'lodash-es' })
    })
  }
})
