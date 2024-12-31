class VirtualModulesPlugin {
  constructor(virtualModules) {
    this.virtualModules = virtualModules;
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(
      'VirtualModulesPlugin',
      (normalModuleFactory) => {
        const handler = (data, callback) => {
          if (this.virtualModules[data.request]) {
            // 如果请求的模块在虚拟模块中定义，则使用虚拟模块的内容
            const content = this.virtualModules[data.request];
            data.loaders = [];
            data.resource = `${data.request}?virtual`;
            data.factoryMeta = { virtual: true };
            callback(null, content);
          } else {
            callback();
          }
        };

        normalModuleFactory.hooks.beforeResolve.tapAsync(
          'VirtualModulesPlugin',
          handler
        );
        normalModuleFactory.hooks.afterResolve.tapAsync(
          'VirtualModulesPlugin',
          handler
        );
      }
    );
  }
}

module.exports = VirtualModulesPlugin;
