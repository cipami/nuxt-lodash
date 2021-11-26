import { defineNuxtModule } from "@nuxt/kit";
import fs from "fs";
import lodash from "lodash-es";

export default defineNuxtModule({
  configKey: "lodash",
  defaults: { prefix: "use", exclude: [] },
  setup(options, nuxt) {
    const prefix = options.prefix || "";
    const exportsArray = [];
    const typesArray = [];
    const names = [];

    for (const [key] of Object.entries(lodash)) {
      if (!options.exclude.includes(key)) {
        const name = prefix ? lodash.upperFirst(key) : key;
        exportsArray.push(`export const ${prefix}${name} = lodash.${key}`);
        typesArray.push(`export const ${prefix}${name}: typeof import('nuxt-lodash/functions')['${key}']`);
        names.push(prefix + name);
      }
    }
    const exportString = exportsArray.join("\n");
    const typesString = typesArray.join("\n");
    fs.writeFileSync("node_modules/nuxt-lodash/functions.mjs", `import lodash from 'lodash-es';\n\n${exportString}`);
    fs.writeFileSync("node_modules/nuxt-lodash/functions.d.ts", typesString);

    nuxt.hook("vite:extend", ({ config }) => {
      config.optimizeDeps ||= {};
      config.optimizeDeps.exclude ||= [];
      config.optimizeDeps.exclude.push("lodash-es");
    });

    nuxt.hook("autoImports:sources", (sources) => {
      sources.push({
        from: "nuxt-lodash/functions",
        names,
      });
    });
  },
});
