const NormalModule = require('webpack/lib/NormalModule');
const PLUGIN_NAME = 'VirtualModulePlugin';
const webpack = require('webpack');

class VirtualModulePlugin {
  apply(/**@type {webpack.Compiler} */ compiler) {
    compiler.hooks.compilation.tap(
      PLUGIN_NAME,
      (compilation, { normalModuleFactory }) => {
        normalModuleFactory.hooks.resolveForScheme
          .for('virtual')
          .tap(PLUGIN_NAME, (resolveData) => {
            resolveData.data.mimetype = 'json';
          });
        normalModuleFactory.hooks.beforeResolve.tap(
          PLUGIN_NAME,
          (resolveData) => {
            if (resolveData.request === 'virtual:test') {
              console.log('resolveData', resolveData);
              resolveData.assertions = {
                type: 'json',
              };
            }
          }
        );

        const compilationHooks = NormalModule.getCompilationHooks(compilation);
        compilationHooks.readResource
          .for('virtual')
          .tap(PLUGIN_NAME, (loaderContext) => {
            if (loaderContext.request === 'virtual:test') {
              const obj = { message: 'hello world' };
              return Buffer.from(JSON.stringify(obj), 'utf-8');
            }
          });
      }
    );
  }
}

module.exports = VirtualModulePlugin;
