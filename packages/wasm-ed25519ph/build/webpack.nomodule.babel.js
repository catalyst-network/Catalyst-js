// Import dependencies.
import * as path from 'path';
import merge from 'webpack-merge';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

// Import Configuration.
import WebpackCommon from './webpack.common.babel';

const webpack = require('webpack');

/**
 *  Plugins for no-module build.
 *  Same as web, except the JS is included on a page and modifies global state, and doesn't support as many wasm-bindgen features as web
 *  Use to get a vanilla es2015 build.
 */
const plugins = [
    new webpack.ProvidePlugin({
        TextDecoder: ['text-encoding', 'TextDecoder'],
        TextEncoder: ['text-encoding', 'TextEncoder'],
    }),
    new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, '..'),
        extraArgs: '--scope catalyst --target no-modules',
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
