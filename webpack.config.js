const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist'; // поддержка браузеров в продакшн
}

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new Dotenv(),
];

if (process.env.SERVE) { // Используем плагин только если запускаем devServer
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode,
  target,
  plugins,
  entry: {
    app: [
      'react-app-polyfill/stable',
      './src/index.js',
    ],
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), // итоговый бандл
    assetModuleFilename: 'assets/[hash][ext][query]', // складываем ассеты в dist/assets
    clean: true, // очистка dist перед обновлением бандла
    publicPath: '/',
  },

  devServer: {
    hot: true, // автоперезагрузка страницы при изменениях
    historyApiFallback: true,
    compress: true,
    // allowedHosts: ['scientific-notes.ru'],
    // port: 80,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] }, // загрузчик для html
      {
        test: /\.(s[ac]|c)ss$/i, // загрузчик стилей
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i, // загрузчик изображений
        type: mode === 'production' ? 'asset' : 'asset/resource',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i, // загрузчик шрифтов
        type: 'asset/resource',
      },
      {
        test: /\.jsx?$/, // загрузчик js
        exclude: /node_modules/, // исключаем node_modules
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
