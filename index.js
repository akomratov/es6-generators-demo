const fetch = require('node-fetch');


class GeneratorRunner {
  constructor(generator, initialVal) {
    this.generator = generator;
    this.initialVal = initialVal;
  }

  run() {
    // Very first step is invoking a generator just to get
    // the iterator object. This is not running generator itself
    const it = this.generator(this.initialVal);

    let res = 0;
    let iteration = it.next(res);

    // Main loop, which is running the Generator passed to the constructor
    while(!iteration.done) {

      // get iterator actual value returned by 'yield'
      res = iteration.value;

      console.log('GeneratorRunner got the value:', res);

      // resume generator running till the next 'yield'
      // (or the end if no other 'yield' in the generator)
      iteration = it.next(res);
    }
  }
}


function *demoGenerator$SimpleValues(initialValue) {
  const res1 = yield initialValue + 1;
  const res2 = yield res1 + 1;
  const res3 = yield res2 + 1;
}

console.log('Running Generator on Simple Values', '\n');
const app$SimpleValues = new GeneratorRunner(demoGenerator$SimpleValues, 100);
app$SimpleValues.run();
