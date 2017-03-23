import path from 'path'
import webpack from 'webpack';

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
        ],
        loaders: ['babel-loader' ]
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ]
  }
}
