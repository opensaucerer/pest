# Jest

An implementation of a testing framework for Typescript applications.

## Testing

To test this implementation, you can clone the repository and run...

```bash
npm test
```

Running the above in the root directory will execute the tests in the `test` directory.

## Contributing

Open an issue or create a pull request.
To create a pull request first create a fork and then clone the forked repository. For example...

```bash
git clone https://github.com/opensaucerer/jest.git
```

Modify the code and include tests for your changes then open a pull requests against the `main` branch. Please make sure that all tests pass before opening a pull request.

## Milestones

- [x] Implement basic test runner functionality
- [x] Implement basic assertion functionalities
- [x] Add support for `beforeAll` and `afterAll` hooks
- [x] Allow asynchronous tests
- [ ] Add support for `beforeEach` and `afterEach` hooks
- [ ] Add support for `describe` blocks
- [ ] Add support for `it` blocks
- [ ] Allow for more complex assertions
- [ ] Implement a CLI command for running tests
- [ ] Compile code into an npm package

## Usage

#### Test a function with an object response

```ts
function parsePathVariables(
  path: string,
  route: string
): Record<string, string> {
  let pathVariables = path.split('/');
  let routeVariables = route.split('/');
  let pathVariablesObject: Record<string, string> = {};
  if (routeVariables.length === pathVariables.length) {
    for (let i = 0; i < routeVariables.length; i++) {
      if (routeVariables[i].startsWith(':')) {
        pathVariablesObject[routeVariables[i].slice(1)] = pathVariables[i];
      }
    }
  }
  return pathVariablesObject;
}

jest('Should parse path variables', async () => {
  const path = '/test/1234567890';
  const route = '/test/:id';
  const params = parsePathVariables(path, route);
  expect(params).toBeObject({
    id: '1234567890',
  });
});
```

#### Test a function with before and after hooks

```ts
import * as fs from 'fs';

function loadEnv(path?: string) {
  const env = fs.readFileSync(path || '.env', 'utf8');
  const lines = env.split('\n');
  lines.forEach((line) => {
    if (!line.startsWith('#') && line.trim() !== '') {
      const [key, value] = line.split('=');
      process.env[key.trim()] = value.trim();
    }
  });
}

beforeJest(() => {
  // create a .env file and write some data
  fs.writeFileSync(
    '.env.test',
    'PORT=3000\nDUMMY_KEY=1234567890\nDUMMY_KEY_2=0987654321'
  );
});

jest('Should load env into process', async () => {
  // load the .env file
  loadEnv('.env.test');

  // check if the process.env object has the correct data
  expect(process.env.PORT).toBe('3000');
  expect(process.env.DUMMY_KEY).toBe('1234567890');
  expect(process.env.DUMMY_KEY_2).toBe('0987654321');
});

afterJest(() => {
  // delete the .env file
  fs.unlinkSync('.env.test');
});
```

#### Test the occurrence of an element in an array

```ts
function removeFirstOccurence(list: string[], item: string) {
  let index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
  return list;
}

jest('Should remove first occurence from a list', async () => {
  const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'd'];
  const item = 'd';
  const newList = removeFirstOccurence(list, item);
  expect(item).toOccur(1).in(newList);
});
```

### Test a function that returns a promise

```ts
import * as http from 'http';

function makeRequest(options: { url: string }) {
  return new Promise((resolve, reject) => {
    http.get(options.url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    });
  });
}

jest('Should make an api call', async () => {
  const data = await makeRequest({
    url: 'http://abbrefy.xyz/api/v1/me/links/',
  });
  expect(JSON.parse(data as string)).toBeObject(
    JSON.parse(`{"error":"Please provide your API key.","status":false}`)
  );
});
```
