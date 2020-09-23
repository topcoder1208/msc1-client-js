const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { resolve, join } = require('path');

const ROOT = resolve(__dirname, '..');

module.exports = {
  mode: 'production',
  entry: {
    'msc1-client': join(ROOT, 'src', 'index.js'),
    'msc1-client.min': join(ROOT, 'src', 'index.js'),
  },
  output: {
    path: join(ROOT, 'dist'),
    filename: '[name].js',
    library: 'Msc1Client',
  },
  externals: {
    'stellar-sdk': 'StellarSdk',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.min\.js$/,
        uglifyOptions: {
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/ed25519/),
  ],
};
