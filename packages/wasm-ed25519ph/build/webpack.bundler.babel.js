// Import dependencies.
import * as path from 'path';
import merge from 'webpack-merge';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

// Import Configuration.
import WebpackCommon from './webpack.common.babel';

/**
 *  Plugins for bundler build.
 *  Outputs JS that is suitable for interpolation with a bundler like Webpack.
 *  Import the JS and the module key is specified in package.json.
 *  Use to get a build you can publish to npm.
 */
const plugins = [
    new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, '..'),
        extraArgs: '--scope catalyst --target bundler',
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
