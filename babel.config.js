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
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, // 修改主题是基于less提供的modifyVars变量进行修改的，所以按需加载时使用true
      },
    ],
  ],
};
