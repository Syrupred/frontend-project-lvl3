import path, { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const fileNamePath = fileURLToPath(import.meta.url);
const dirNamePath = dirname(fileNamePath);

export default {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: path.resolve(dirNamePath, './src/index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(dirNamePath, './dist'),
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
