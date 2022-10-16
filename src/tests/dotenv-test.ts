import { loadEnv } from './dotenv';
import * as fs from 'fs';
import '../mock';
import * as http from 'http';

beforePest(() => {
  // create a .env file and write some data
  fs.writeFileSync(
    '.env.test',
    'PORT=3000\nDUMMY_KEY=1234567890\nDUMMY_KEY_2=0987654321'
  );
});

pest('Should load env into process', async () => {
  // load the .env file
  loadEnv('.env.test');

  // check if the process.env object has the correct data
  expect(process.env.PORT).toBe('3000');
  expect(process.env.DUMMY_KEY).toBe('1234567890');
  expect(process.env.DUMMY_KEY_2).toBe('0987654321');
});

pest('Should make an api call', async () => {
  const data = await makeRequest({
    url: 'http://abbrefy.xyz/api/v1/me/links/',
  });
  expect(JSON.parse(data as string)).toBeObject(
    JSON.parse(`{"error":"Please provide your API key.","status":false}`)
  );
});

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

afterPest(() => {
  // delete the .env file
  fs.unlinkSync('.env.test');
});
