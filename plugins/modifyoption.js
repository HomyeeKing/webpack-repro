const path = require('path');
const webpack = require('webpack');

class ModifySplitChunksPlugin {
  /**
   *
   * @param {webpack.Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.thisCompilation.tap(
      'ModifySplitChunksPlugin',
      (compilation) => {
        compilation.hooks.optimize.tap('ModifySplitChunksPlugin', () => {
          const options = compilation.options;
          options.optimization = {
            ...options.optimization,
            splitChunks: {
              cacheGroups: {
                default: false,
              },
            },
          };
          // console.log(' compiler.options', compiler.options);
        });
      }
    );
  }
}

module.exports = ModifySplitChunksPlugin;
