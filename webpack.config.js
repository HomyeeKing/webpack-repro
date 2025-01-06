const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack.config.js
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const VirtualPlugin = require('./plugins/virtualPlugin');
const VirtualPlugin1 = require('./plugins/vplugin1');
// const VirtualPlugin = require('./unplugins/virtualPlugin');
const esbuild = require('esbuild');

const toPascalCase = (str) =>
  str
    .split('-')
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');

const postcssPlugins = [autoprefixer(), cssnano()];

module.exports = {
  entry: './src/index.js', // 入口文件
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 每次构建前清理输出文件夹
  },
  module: {
    rules: [
      {
        //   // Match `.js`, `.jsx`, `.ts` or `.tsx` files
        test: /\.m?[jt]sx?$/,
        loader: 'esbuild-loader',
        // available options: https://github.com/evanw/esbuild/blob/88821b7e7d46737f633120f91c65f662eace0bcf/lib/shared/types.ts#L158-L172
        options: {
          target: 'ESNext',
          format: 'esm',
          loader: 'js',
          sourcemap: false,
          tsconfigRaw: JSON.stringify({
            compilerOptions: {
              esModuleInterop: true,
              isolatedModules: true,
              skipLibCheck: true,
            },
          }),
          implementation: esbuild,
          banner:
            "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
        },
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
    // new VirtualPlugin(),
    // new VirtualPlugin1({
    //   'virutal:test': 'export const a = "default value";',
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 使用的 HTML 模板
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 设置开发服务器的内容
    compress: true,
    port: 9000,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          filename: 'vendor.js',
          chunks: 'all',
        },
      },
    },
  },
};
