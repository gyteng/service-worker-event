const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    benchmark: './src/benchmark.ts',
    'service-worker': './src/sw.ts',
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
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
        { from: 'src/benchmark.html', to: './' },
      ],
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};