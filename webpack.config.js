const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack.config.js
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const VirtualPlugin = require('./plugins/virtualPlugin');
const VirtualPlugin1 = require('./plugins/vplugin1');
const ModifySplitChunksPlugin = require('./plugins/modifyoption');
// const VirtualPlugin = require('./unplugins/virtualPlugin');

const toPascalCase = (str) =>
  str
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');

const postcssPlugins = [autoprefixer(), cssnano()];

/** @type {import('webpack').Configuration} */
module.exports = {
  target: 'node12.20',
  entry: {
    main: './src/index.js',
    foo: './src/foo.js',
    another: './src/another-module.js',
  }, // 入口文件
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 每次构建前清理输出文件夹
    chunkFormat: 'commonjs',
    library: {
      type: 'commonjs2',
    },
  },
  externalsPresets: {
    node: false,
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      util: false,
      buffer: false,
    },
    alias: {
      stream: require.resolve('@ali/stream-browserify'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /^virtual:.+/,
        use: [
          {
            loader: `val-loader`,
          },
        ],
      },
      {
        test: /\.less$/, // 匹配所有 LESS 文件
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:8]',
                localIdentHashPrefix: toPascalCase('skill-card-group-homepage'),
              }, // 启用 CSS Modules
              sourceMap: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postcssPlugins,
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/index.html', // 使用的 HTML 模板
    // }),
  ],
  devServer: {
    compress: true,
    port: 9000,
  },
  stats: {
    errorDetails: true,
  },
};
