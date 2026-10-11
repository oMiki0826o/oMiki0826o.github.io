/*
 * File: playwright.config.ts
 * Modification: 2026-10-11 — 針對正式靜態匯出執行 Chromium 與 WebKit 測試。
 */
import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
    {name: 'webkit', use: {...devices['Desktop Safari']}},
    {name: 'mobile-webkit', use: {...devices['iPhone 13']}}
  ],
  use: {baseURL: 'http://127.0.0.1:4173'},
  webServer: {
    command: 'python3 -m http.server 4173 --directory out',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
