import * as __WEBPACK_EXTERNAL_MODULE__rsbuild_plugin_react_7b149ee4__ from "@rsbuild/plugin-react";
import * as __WEBPACK_EXTERNAL_MODULE__rslib_core_68de5877__ from "@rslib/core";
const rslib_config = (0, __WEBPACK_EXTERNAL_MODULE__rslib_core_68de5877__.defineConfig)({
    source: {
        entry: {
            index: [
                './src/**',
                '!src/**/*.md'
            ]
        }
    },
    lib: [
        {
            bundle: false,
            dts: true,
            format: 'esm',
            output: {
                filename: {
                    js: '[name].js'
                },
                distPath: {
                    root: './esm'
                }
            }
        },
        {
            bundle: false,
            dts: true,
            format: 'cjs',
            output: {
                filename: {
                    js: '[name].js'
                },
                distPath: {
                    root: './lib'
                }
            }
        }
    ],
    output: {
        target: 'web'
    },
    plugins: [
        (0, __WEBPACK_EXTERNAL_MODULE__rsbuild_plugin_react_7b149ee4__.pluginReact)()
    ]
});
export { rslib_config as default };
