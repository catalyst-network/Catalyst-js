// Import dependencies.
import * as path from 'path';
import merge from 'webpack-merge';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

// Import Configuration.
import WebpackCommon from './webpack.common.babel';

/**
 *  Plugins for web build.
 *  Outputs JS that can be natively imported as an ES module in a browser, but the WebAssembly must be manually instantiated and loaded.
 */
const plugins = [
    new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, '..'),
        extraArgs: '--scope catalyst --target web',
    }),
];
/**
 * Webpack configuration.
 */
const WebpackConfig = {
    plugins,
};

// Merge and export WebpackConfig module.
export default merge(WebpackCommon, WebpackConfig);
