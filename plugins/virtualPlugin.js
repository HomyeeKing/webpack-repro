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
        console.log(
          'resolveData.createData.virtual',
          resolveData.createData.virtual
        );
        if (resolveData.createData.virtual) {
          // 创建一个虚拟模块
          const virtualModule = {
            // 设置虚拟模块的路径
            resource: 'virtual:test',
            buildInfo: {},
            buildMeta: {},
            // 定义模块的构建方法
            build(options, compilation, resolver, fs, callback) {
              this._source = new RawSource('export const a = 1;');
              callback();
            },
          };

          // 将虚拟模块添加到 resolveData 中
          resolveData.createData.resource = virtualModule.resource;
          resolveData.createData.module = virtualModule;
        }

        //   // 将虚拟模块添加到 resolveData 中
        //   resolveData.createData.resource = virtualModule.resource;
        //   resolveData.createData.module = virtualModule;
        // }
        // if (data.resource === 'virtual:test') {
        //   console.log('data.resource', data.resource);
        //   data.file = 'virtual:test';
        //   data.source = () => 'hello world'; // 这里可以替换为你的动态生成逻辑
        // }
      });
    });
  }
}

module.exports = VirtualModulePlugin;
