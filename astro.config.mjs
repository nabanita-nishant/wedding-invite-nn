import { defineConfig } from 'astro/config';

const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  base,
  output: 'static',
  site: process.env.SITE_URL || 'http://localhost:4321',
});
