import * as fs from 'fs';

// improve logic using regular expression
export function loadEnv(path?: string) {
  const env = fs.readFileSync(path || '.env', 'utf8');
  const lines = env.split('\n');
  lines.forEach((line) => {
    if (!line.startsWith('#') && line.trim() !== '') {
      const [key, value] = line.split('=');
      process.env[key.trim()] = value.trim();
    }
  });
}
