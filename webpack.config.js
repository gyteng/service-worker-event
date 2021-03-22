const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
    'service-worker': './src/sw.ts',
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    host: '0.0.0.0',
    port: 19000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        minifyCSS: true,
      },
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'],
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};