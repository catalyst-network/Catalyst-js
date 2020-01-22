const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
  mode: 'production',
  entry: './lib/src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'tx',
    libraryTarget: 'umd',
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, '.'),
      withTypeScript: true, // this is new
    }),
  ],
  resolve: {
    alias: {
      lodash: path.resolve(__dirname, 'node_modules/lodash'),
      'bn.js': path.resolve(__dirname, 'node_modules/bn.js'),
    },
  },
  node: {
    process: true,
    Buffer: false,
  },
};
