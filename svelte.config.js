import preprocess from "svelte-preprocess"
import adapter from '@sveltejs/adapter-node'
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess(),
	],

	kit: {
		adapter: adapter({
			out: 'build'
		}),
		csrf: {
			checkOrigin: false
		},
		alias: {
			'$components': './src/components',
			'$texts': './src/texts',
			'$lib': './src/lib',
			'$type': './src/types'
		}
	},
}

export default config