const { AsyncParallelBailHook } = require('tapable');

class Car {
  constructor() {
    this.hooks = {
      calcRoutes: new AsyncParallelBailHook(),
    };
  }
  calcRoutesAsync(callback) {
    this.hooks.calcRoutes.callAsync(callback);
  }
}

const car = new Car();

car.hooks.calcRoutes.tapAsync('calcRoutes1', (callback) => {
  setTimeout(() => {
    console.log('计算路线1');
    callback(1); // 此时第一个注册的钩子执行结束，直接调用最终的回调函数输出1
  }, 1000);
});

car.hooks.calcRoutes.tapAsync('calcRoutes2', (callback) => {
  setTimeout(() => {
    console.log('计算路线2');
    callback(2);
  }, 1000);
});

car.calcRoutesAsync((result) => {
  console.log(result);
});
