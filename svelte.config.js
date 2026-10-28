import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

const runbook = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      extensions: ['.svx'],
      layout: { runbook }
    }),
    vitePreprocess()
  ],
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, strict: true }),
    alias: { '#lib': 'src/lib' },
    prerender: { entries: ['*'], handleHttpError: 'warn' }
  }
};

export default config;
