import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    launchOptions: {
      executablePath: process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : undefined
    }
  },
  webServer: {
    command: 'python3 -m http.server 4173 --directory out',
    url: 'http://127.0.0.1:4173',
    stdout: 'ignore',
    reuseExistingServer: !process.env.CI
  }
});
