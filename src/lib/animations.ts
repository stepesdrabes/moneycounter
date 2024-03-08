import {crossfade} from "svelte/transition"
import {quintOut} from "svelte/easing"

export const [sendAnim, receiveAnim] = crossfade({
    fallback(node, params) {
        const style = getComputedStyle(node)
        const transform = style.transform === 'none' ? '' : style.transform

        return {
            duration: 500,
            easing: quintOut,
            css: (t) => `
					transform: ${transform} scale(${t / 20 + 0.95});
					opacity: ${t}
				`
        }
    }
})