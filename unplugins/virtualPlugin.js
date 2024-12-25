const { createUnplugin } = require('unplugin');

const unpluginFactory = (options) => ({
  name: 'unplugin-starter',
  // webpack's id filter is outside of loader logic,
  // an additional hook is needed for better perf on webpack
  resolveId(id) {
    if (id === 'virtual:test') {
      console.log('id1112', id);
      return id;
    }
  },
  load(id) {
    if (id === 'virtual:test') {
      console.log('id', id);
      return 'export const a = 1;';
    }
  },
  // more hooks coming
});

const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

module.exports = unplugin;
