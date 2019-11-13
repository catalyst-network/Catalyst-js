// Import dependencies.
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// Import Configuration.
import config from '../config';
import CopyWebpackPlugin from "copy-webpack-plugin";

const {
    DIST,
    ENTRY,
    JSOUTPUT,
    OUTPUT
} = config;

/**
 * Default modules loader for JavaScript.
 */
const javascript = {
    test: /\.js$/,
    exclude: /\.wasm$/,
    use: ['babel-loader'],
};

/**
 * Shared plugins.
 *
 * CleanWebpackPlugin()
 * A webpack plugin to remove/clean your build folder(s) before building.
 */
const plugins = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
        path.resolve(__dirname, "../static")
    ])
];

/**
 * Entry point for the bundle.
 */
const entry = [
    'core-js/stable',
    'regenerator-runtime/runtime',
    ENTRY,
];

/**
 * Set output folder name for .js file for the dev server.
 */
const output = {
    path: DIST + '/dist',
    filename: JSOUTPUT,
};

/**
 * Array of resolve modules entry and file extension to prevent ESLint errors.
 */
const resolve = { extensions: ['.js', '.json'] };

/**
 * Default modules loaders.
 */
const modules = {
    rules: [javascript],
};

/**
 * Webpack configuration.
 */
const WebpackConfig = {
    node: {
        fs: 'empty',
    },
    entry,
    module: modules,
    output,
    plugins,
    resolve,
};

// Export WebpackConfig.
export default WebpackConfig;
