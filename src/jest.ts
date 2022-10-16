import * as fs from 'fs';
import { afterPests, beforePests, tests } from './mock';
let passed = 0;

function run() {
  return new Promise(async (resolve, reject) => {
    if (tests.length === 0) {
      reject(0);
    }

    // run set ups
    for (let i = 0; i < beforePests.length; i++) {
      await beforePests[i]();
    }

    // run tests
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      try {
        await test.fn();
        console.log('✅ Test passed:', `\x1b[32m${test.name}\x1b[0m`);
        passed++;
      } catch (error: any) {
        console.log('❌ Test failed:', `\x1b[31m${test.name}\x1b[0m`);
        // log the error stack
        console.log(error.stack);
      }
    }

    // run clean ups
    for (let i = 0; i < afterPests.length; i++) {
      await afterPests[i]();
    }

    resolve(1);
  });
}

// import files with the -test.js suffix
const goImportTestFiles = (dir: string) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = `${dir}/${file}`;
    if (fs.statSync(filePath).isDirectory()) {
      goImportTestFiles(filePath);
    } else if (filePath.endsWith('-test.js')) {
      require(filePath);
    }
  });
};

goImportTestFiles(process.cwd());

// run all the test in the `tests` array
run()
  .then(() => {
    if (passed === tests.length) {
      console.log('\x1b[34m' + `   All test(s) passed` + '\x1b[0m');
    } else {
      console.log(
        '\x1b[33m' +
          `   ${passed} of ${tests.length} test(s) passed` +
          '\x1b[0m'
      );
    }
    process.exit(0);
  })
  .catch((e: Error) => {
    if (String(e.message) !== String(0)) {
      console.log('\x1b[33m' + 'Some tests failed' + '\x1b[0m');
    }
    console.log('\x1b[33m' + 'No tests found' + '\x1b[0m');
    process.exit(1);
  });
