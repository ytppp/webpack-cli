module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
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
