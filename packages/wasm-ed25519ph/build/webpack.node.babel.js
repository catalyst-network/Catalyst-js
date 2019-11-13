// Import dependencies.
import * as path from 'path';
import merge from 'webpack-merge';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

// Import Configuration.
import WebpackCommon from './webpack.common.babel';

/**
 * Plugins for node build.
 *  Transpile to nodejs compatible module.
 *  Uses CommonJS modules, for use with a require statement. main key in package.json
 *  Use to get a build to test with jest.
 */
const plugins = [
    new WasmPackPlugin({
        crateDirectory: path.resolve(__dirname, '..'),
        extraArgs: '--scope catalyst --target nodejs',
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
