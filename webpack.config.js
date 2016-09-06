/**
 *
 */
const webpack = require('webpack');
const path = require('path');

/**
 * Webpack Plugin Declarations
 */
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack Configuration
 */
const config = {
  context: path.join(__dirname, 'src'),
  entry: './app.js',
  devtool: 'source-map',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
    ],
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [

  ]
};

module.exports = config;
