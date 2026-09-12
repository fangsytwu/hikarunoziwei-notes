// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hikarunoziwei-notes.pages.dev',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
