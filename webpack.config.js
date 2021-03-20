const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: './' },
      ],
    }),
  ],
};