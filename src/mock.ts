// `tests` is a singleton variable that will contain all our tests
export let tests: { name: string; fn: Function }[] = [];

// `afterPest` and `beforePests` are singleton variables that will contain all setup and clean up functions
export let afterPests: Function[] = [];
export let beforePests: Function[] = [];

// expose the test function as a global variable
global.pest = function (name: string, fn: Function) {
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

global.afterPest = function (fn: Function) {
  afterPests.push(fn);
};

global.beforePest = function (fn: Function) {
  beforePests.push(fn);
};
