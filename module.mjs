import { defineNuxtModule } from "@nuxt/kit";
import lodash from "lodash-es";

export default defineNuxtModule({
  configKey: "lodash",
  defaults: { prefix: false, exclude: [], alias: [] },
  setup(options, nuxt) {
    const aliasMap = new Map(options.alias);
    const prefix = options.prefix || "";
    const autoImportNames = [];
    const exludes = [...options.exclude, "VERSION", "templateSettings"];

    for (const [key] of Object.entries(lodash)) {
      if (!exludes.includes(key)) {
        const name = aliasMap.has(key) ? aliasMap.get(key) : key;
        const formatedName = prefix ? lodash.upperFirst(name) : name;
        autoImportNames.push({ name: key, as: prefix + formatedName });
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
