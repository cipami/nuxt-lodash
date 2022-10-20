import { addImports, defineNuxtModule } from '@nuxt/kit';
import * as lodash from 'lodash-es';
import defaultExcludes from './exclude';

export interface ModuleOptions {
  /**
   * Prefix to be added before every lodash function.
   * False to disable prefix
   *
   * @defaultValue `use`
   */
  prefix: false | string;

  /**
   * Functions that starts with keywords in this array will be skipped by prefix
   *
   * @defaultValue ['is']
   */
  prefixSkip: string[];

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
   * Uppercase letter after prefix
   * False to disable uppercasing
   *
   * @defaultValue true
   */
  uppercaseAfterPrefix: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-lodash',
    configKey: 'lodash',
    compatibility: {
      nuxt: '^3.0.0-rc.12',
    },
  },

  defaults: {
    prefix: 'use',
    prefixSkip: ['is'],
    exclude: [],
    alias: [],
    uppercaseAfterPrefix: true,
  },

  setup (options, nuxt) {
    const {
      prefix,
      prefixSkip,
      exclude,
      alias,
      uppercaseAfterPrefix,
    } = options;

    const aliasMap = new Map<string, string>(alias);
    const excludes = [...exclude, ...defaultExcludes];

    const isStartsWithSkipable = (name: string) => prefixSkip.some(start => name.startsWith(start));

    for (const name of Object.keys(lodash)) {
      if (excludes.includes(name)) continue;

      let as = aliasMap.get(name) ?? name;

      if (prefix) {
        if (!isStartsWithSkipable(as)) {
          if (uppercaseAfterPrefix) as = lodash.upperFirst(as);
          as = prefix + as;
        }
      }

      addImports({ name, as, from: 'lodash-es' });
    }

    nuxt.hook('vite:extend', ({ config }) => {
      config.optimizeDeps ||= {};
      config.optimizeDeps.exclude ||= [];
      config.optimizeDeps.exclude.push('lodash-es');
    });
  },
});
