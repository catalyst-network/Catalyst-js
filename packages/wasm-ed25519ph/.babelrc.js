module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '55',
          ie: '11',
        }
      },
    ],
  ],
  plugins: [['@babel/plugin-proposal-class-properties']],
  env: {
    test: {
      plugins: [
        'babel-plugin-rewire',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-transform-async-to-generator'
      ],
    },
  },
};
