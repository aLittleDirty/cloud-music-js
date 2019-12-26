module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'html',
    // standard风格的依赖包
    'standard',
    // standard风格的依赖包
    'promise'
  ],
}
