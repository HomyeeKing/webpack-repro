class VirtualModulePlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('VirtualModulePlugin', (nft) => {
      nft.hooks.beforeResolve.tap('VirtualModulePlugin', (data) => {
        if (data.request === 'virtual:test') {
          data.createData.virtual = true;
        }
        return undefined;
      });

      nft.hooks.afterResolve.tap('VirtualModulePlugin', (resolveData) => {
        if (resolveData.createData.virtual) {
          resolveData.createData.content = `export const a = 1;`;
        }
      });
    });
  }
}

module.exports = VirtualModulePlugin;
