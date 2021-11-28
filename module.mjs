import { defineNuxtModule } from "@nuxt/kit";
import lodash from "lodash-es";

export default defineNuxtModule({
  configKey: "lodash",
  defaults: { prefix: false, exclude: [] },
  setup(options, nuxt) {
    const prefix = options.prefix || "";
    const autoImportNames = [];

    for (const [key] of Object.entries(lodash)) {
      if (!options.exclude.includes(key)) {
        const name = prefix ? lodash.upperFirst(key) : key;
        autoImportNames.push({ name: key, as: prefix + name });
      }
    }
    nuxt.hook("vite:extend", ({ config }) => {
      config.optimizeDeps ||= {};
      config.optimizeDeps.exclude ||= [];
      config.optimizeDeps.exclude.push("lodash-es");
    });

    nuxt.hook("autoImports:sources", (sources) => {
      sources.push({
        from: "lodash-es",
        names: autoImportNames,
      });
    });
  },
});
