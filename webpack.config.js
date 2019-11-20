const path = require(`path`);

module.exports = {
  entry: `./src/main.js`,
  mode: `development`,
  output: {
    path: path.resolve(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http:!/localhost:8080/`,
    compress: true,
    watchContentBase: true
  }
};
