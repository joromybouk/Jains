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
          path.join(__dirname, 'server/shared')
        ],
        loaders: ['babel-loader' ]
      },
        {test: /\.json$/, loader: 'json-loader'},
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
