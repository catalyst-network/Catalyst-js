// Import dependencies.
import CopyWebpackPlugin from 'copy-webpack-plugin';
import merge from 'webpack-merge';
import * as path from 'path';

// Import Configuration.
import WebpackCommon from './webpack.common.babel';

/**
 * Plugins for production build.
 *
 * CopyWebpackPlugin()
 * A webpack plugin that copies individual files or entire directories to the build directory.
 *
 * UglifyJsPlugin()
 * A webpack plugin to minify your JavaScript.
 *
 * LoaderOptionsPlugin()
 * A webpack plugin to edit loader options.
 */
const plugins = [

];

/**
 * Webpack configuration.
 */
const WebpackConfig = {
  plugins,
};

// Merge and export WebpackConfig module.
export default merge(WebpackCommon, WebpackConfig);
