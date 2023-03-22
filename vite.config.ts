import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import { resolve } from 'path'

const config: UserConfig = {
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;',
			},
		},
	},
	resolve: {
		alias: {
			$components: resolve('./src/components'),
			$lib: resolve('./src/lib'),
			$utils: resolve('./src/utils'),
			$stores: resolve('./src/stores'),
			$models: resolve('./src/models'),
			$services: resolve('./src/services'),
			$common: resolve('./src/common'),
		},
	},
}

export default config
