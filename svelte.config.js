import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ precompress: true }),
		csp: {
			mode: 'auto',
			directives: {
				'default-src': ["'self'"],
				'script-src': ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
				'style-src': ["'self'", "'unsafe-inline'"],
				'img-src': ["'self'", 'data:', 'https://s3-us-west-2.amazonaws.com', 'https://i.ytimg.com'],
				'frame-src': ['https://www.youtube-nocookie.com'],
				'connect-src': ["'self'", 'https://s3-us-west-2.amazonaws.com', 'https://www.youtube-nocookie.com'],
				'font-src': ["'self'"],
				'object-src': ["'none'"]
			}
		}
	}
};

export default config;
