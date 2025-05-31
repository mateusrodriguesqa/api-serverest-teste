import { defineConfig } from '@playwright/test';
import 'tsconfig-paths/register';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://serverest.dev',
    ignoreHTTPSErrors: true,
  },
});
