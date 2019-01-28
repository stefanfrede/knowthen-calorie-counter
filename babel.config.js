const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
      },
    ],
    isTest ? 'babel-plugin-dynamic-import-node' : null,
  ].filter(Boolean),
  presets: [['@babel/preset-env', { modules: isTest ? 'commonjs' : false }]],
};
