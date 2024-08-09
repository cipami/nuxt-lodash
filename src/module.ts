import { addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import * as lodash from 'lodash-es'

import type { Import } from 'unimport'

import excludeDefaults from './exclude'

export interface ModuleOptions {
  /**
   * Prefix to be added before every lodash function
   *
   * `false` to disable uppercasing
   *
   * @defaultValue `use`
   */
  prefix: false | string;
  /**
   * Functions that starts with this keywords will be skipped by prefix
   *
   * `false` to disable uppercasing
   *
   * @defaultValue 'is'
   */
  prefixSkip: string | string[] | false;
  /**
   * Array of lodash funcions to be exluded from auto-imports
   *
   * @defaultValue []
   */
  exclude: string[];
  /**
   * Iterable of string pairs to alias each function
   *
   * @defaultValue []
   */
  alias: Iterable<[string, string]>;
  /**
   * Upper case first letter after prefix
   *
   * `false` to disable uppercasing
   *
   * @defaultValue true
   */
  upperAfterPrefix: boolean
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
    prefixSkip: 'is',
    exclude: [],
    alias: [],
    upperAfterPrefix: true
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const aliasMap = new Map<string, string>(options.alias)
    const excludes = [...options.exclude, ...excludeDefaults]
    const prefixSkip = options.prefixSkip ? lodash.isArray(options.prefixSkip) ? options.prefixSkip : [options.prefixSkip] : []

    const list: Import[] = Object.keys(lodash)
      .filter(name => !excludes.includes(name))
      .map((name) => {
        const alias = aliasMap.has(name) ? aliasMap.get(name)! : name
        const prefix = (!prefixSkip.some(key => alias.startsWith(key)) && options.prefix) || ''
        const as = prefix ? prefix + (options.upperAfterPrefix ? lodash.upperFirst(alias) : alias) : alias
        return { name, as, from: resolve('./runtime/lodash') }
      })

    // frontend side
    addImports(list)

    // backend side
    nuxt.hook('nitro:config', (content) => {
      if (!content.imports) {
        content.imports = {
          imports: list
        }
        return
      }

      if (!content.imports.imports) {
        content.imports.imports = list
        return
      }

      content.imports.imports.push(...list)
    })
  }
})
