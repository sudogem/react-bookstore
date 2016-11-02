var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: './src/index',
    // output: {
    //   path: path.join(__dirname, 'dist'),
    //   path: '/',
    //   filename: 'bundle.js',
    //   publicPath: '/static/'
    // },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          include: path.join(__dirname, 'src'),
          exclude: /(node_modules|bower_components)/,
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
}
