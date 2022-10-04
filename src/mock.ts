// `tests` is a singleton variable that will contain all our tests
export let tests: { name: string; fn: Function }[] = [];

// `afterJest` and `beforeJests` are singleton variables that will contain all setup and clean up functions
export let afterJests: Function[] = [];
export let beforeJests: Function[] = [];

// expose the test function as a global variable
global.jest = function (name: string, fn: Function) {
  // it pushes the name and function as an object to
  // the `tests` array
  tests.push({ name, fn });
};

global.expect = function (actual: any) {
  return {
    toBe: function (expected: any) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    },

    toNotBe: function (expected: any) {
      if (actual === expected) {
        throw new Error(`${actual} is equal to ${expected}`);
      }
    },

    toInclude: function (expected: any) {
      if (!actual.includes(expected)) {
        throw new Error(`${actual} does not include ${expected}`);
      }
    },

    toNotInclude: function (expected: any) {
      if (actual.includes(expected)) {
        throw new Error(`${actual} includes ${expected}`);
      }
    },

    toOccur: function (occurence: any) {
      return {
        in: function (parent: any[]) {
          // check number of occurrences
          let count = 0;
          parent.forEach((item) => {
            if (item === actual) {
              count++;
            }
          });

          if (count !== occurence) {
            throw new Error(
              `${actual} does not occur ${occurence} times - occurs only ${count} times`
            );
          }
        },
      };
    },

    toBeObject: function (expected: any) {
      for (let key in expected) {
        if (expected[key] !== actual[key]) {
          throw new Error(`${actual} is not equal to ${expected}`);
        }
      }
    },

    toBeOfType: function (expected: any) {
      if (typeof actual !== expected) {
        throw new Error(`${actual} is not of type ${expected}`);
      }
    },
  };
};

global.afterJest = function (fn: Function) {
  afterJests.push(fn);
};

global.beforeJest = function (fn: Function) {
  beforeJests.push(fn);
};
