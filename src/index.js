import * as lodash from 'lodash-es';
import * as Stream from 'stream';
import util from 'util';
import virtual from 'virtual:foo'

console.log('virtual', virtual)
// import foo from './foo';
// console.log('foo', foo);
console.log('lodash', lodash);
console.log(util.format());
const { Writable } = Stream;
new Writable();

// function foo1() {
//   const a = 1;
//   console.log('a', a);
// }
// foo1();

import * as React from 'react';
console.log('react', React.createContext);

const dynamicModules = await import(
  /* webpackChunkName: "dynamic-modules" */ './dynamic-modules'
);

console.log('dynamicModules', dynamicModules);
