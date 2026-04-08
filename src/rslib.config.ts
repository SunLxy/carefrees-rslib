// import { pluginReact } from "@rsbuild/plugin-react";
// import { pluginSvgr } from "@rsbuild/plugin-svgr";
// import { pluginUnpluginVue } from "rsbuild-plugin-unplugin-vue";
// import { pluginVueTsc } from "./plugins/vue-tsc";
// import { pluginSass } from "@rsbuild/plugin-sass";
import { defineConfig, RslibConfig } from "@rslib/core";

export default defineConfig(async function () {
  const isNode = process.env.CAREFREE_RSLIB_TARGET === "node";
  const isOnlyESM = process.env.CAREFREE_RSLIB_ESM === "true";
  const isVue = process.env.CAREFREE_RSLIB_VUE === "true";
  const isSass = process.env.CAREFREE_RSLIB_SASS === "true";
  let plugins = []
  if (!isNode && !isVue) {
    try {
      const reactPlugin = await import("@rsbuild/plugin-react");
      plugins.push(reactPlugin.pluginReact());
    } catch (error) {
      console.log(error)
    }
    try {
      const svgrPlugin = await import("@rsbuild/plugin-svgr");
      plugins.push(svgrPlugin.pluginSvgr({
        mixedImport: true,
        svgrOptions: { exportType: "named" },
      }));
    } catch (error) {
      console.log(error)
    }
  }
  // let plugins = isNode
  //   ? []
  //   : [
  //     pluginReact(),
  //     pluginSvgr({
  //       mixedImport: true,
  //       svgrOptions: { exportType: "named" },
  //     }),
  //   ];
  if (!isNode && isVue) {
    plugins = []
    try {
      const vuePlugin = await import("rsbuild-plugin-unplugin-vue");
      plugins.push(vuePlugin.pluginUnpluginVue({}));
    } catch (error) {
      console.log(error)
    }
    try {
      const vuePlugin2 = await import("./plugins/vue-tsc");
      plugins.push(vuePlugin2.pluginVueTsc());
    } catch (error) {
      console.log(error)
    }
    // plugins = [pluginUnpluginVue({}), pluginVueTsc()];
  }
  if (isSass) {
    try {
      const sassPlugin = await import("@rsbuild/plugin-sass");
      plugins.push(sassPlugin.pluginSass());
    } catch (error) {
      console.log(error)
    }
    // plugins.push(pluginSass());
  }
  return {
    source: {
      entry: {
        index: ["./src/**", "!src/**/*.md"],
      },
    },
    lib: [
      {
        bundle: false,
        dts: isVue ? false : true,
        format: "esm",
        output: {
          filename: {
            js: "[name].js",
          },
          distPath: {
            root: "./esm",
          },
        },
      },
      isOnlyESM
        ? undefined
        : {
          bundle: false,
          dts: isVue ? false : true,
          format: "cjs",
          output: {
            filename: {
              js: "[name].js",
            },
            distPath: {
              root: "./lib",
            },
          },
        },
    ].filter(Boolean),
    output: {
      target: isNode ? "node" : "web",
    },
    plugins,
  } as RslibConfig;
});
