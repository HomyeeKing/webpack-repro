const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack.config.js
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const VirtualPlugin = require('./plugins/virtualPlugin');
const VirtualPlugin1 = require('./plugins/vplugin1');
const ModifySplitChunksPlugin = require('./plugins/modifyoption');
const TerserPlugin = require('terser-webpack-plugin');
// const VirtualPlugin = require('./unplugins/virtualPlugin');

const toPascalCase = (str) =>
  str
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');

const postcssPlugins = [autoprefixer(), cssnano()];

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    main: './src/index.mjs',
  }, // 入口文件

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
