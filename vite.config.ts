import {sveltekit} from "@sveltejs/kit/vite"
import {defineConfig} from "vite"
import path from "node:path"

export default defineConfig({
    resolve: {
        alias: {
            '$components': path.resolve('./src/components'),
            '$texts': path.resolve('./src/texts'),
            '$lib': path.resolve('./src/lib'),
            '$type': path.resolve('./src/type')
        },
    },
    plugins: [sveltekit()]
})