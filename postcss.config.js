/* eslint-disabled */
module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {}, // 添加的配置选项
    'postcss-pxtorem': {
      rootValue: 100, // 哪些需要进行px转rem
      // Px 就不会转换
      propList: ['*']
    }
  }
}
