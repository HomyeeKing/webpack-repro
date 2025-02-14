const dynamicModules = await import(
  /* webpackChunkName: "dynamic-modules" */ './dynamic-modules.mjs'
);

console.log('dynamicModules', dynamicModules);
const documentOnly = false,
  isDowngradeToCsr = true,
  disableOnErrorDowngrade = false;
const e = {
  isWormholeInternal: true,
};
if (
  !documentOnly && // true
  isDowngradeToCsr && // true
  !e.isWormholeInternal && // false
  !disableOnErrorDowngrade // true
) {
  console.log('hhh');
}
