import path from 'path'
import webpack from 'webpack';
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
export default {

  entry: [
   'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, './client/index.js')
  ],
  output: {
  	filename: 'bundle.js',
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['babel-loader' ]
      },
        {test: /\.json$/, loader: 'json-loader'},
        {test: /\.css$/, loader: "style-loader!css-loader"},
    ]
  },

  resolve: {
    extensions: [ '', '.js' ]
  },
  node:{
    dns:'empty',
    net:'empty'

  }
}
