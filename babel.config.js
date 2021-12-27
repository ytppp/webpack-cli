module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-runtime', // 减少冗余的代码
    [
      '@babel/plugin-transform-modules-commonjs', // 将 ECMAScript modules 转成 CommonJS.
      {
        allowTopLevelThis: true,
        loose: true,
        lazy: true,
      },
    ],
  ],
};
