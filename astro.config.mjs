import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import {fileURLToPath} from 'node:url';

export default defineConfig({
  site: 'https://omiki0826o.github.io',
  output: 'static',
  trailingSlash: 'always',
  build: {format: 'directory'},
  integrations: [react()],
  vite: {resolve: {alias: {'@': fileURLToPath(new URL('.', import.meta.url))}}}
});
