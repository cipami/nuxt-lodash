declare type NuxtLodashOptions = {
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
};
declare module "nuxt3" {
  interface NuxtConfig {
    lodash?: NuxtLodashOptions;
  }
}
declare module "@nuxt/types" {
  interface NuxtConfig {
    lodash?: NuxtLodashOptions;
  }
}
declare module "@nuxt/kit" {
  interface NuxtConfig {
    lodash?: NuxtLodashOptions;
  }
}
export { NuxtLodashOptions };
