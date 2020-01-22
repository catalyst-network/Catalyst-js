const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
    mode: 'production',
    entry: './js/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    plugins: [
        new WasmPackPlugin({
            crateDirectory: path.resolve(__dirname, '.'),
            withTypeScript: true, // this is new
            extraArgs: '--scope catalyst --target nodejs',
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.wasm'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
};
