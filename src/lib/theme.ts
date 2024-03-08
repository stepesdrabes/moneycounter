import {browser} from '$app/environment'
import {writable} from 'svelte/store'

const initialValue: string | null = browser ? window.localStorage.getItem('theme') ?? null : null

const theme = writable<string | null>(initialValue)

let timeoutAction: NodeJS.Timeout | undefined
let timeoutEnable: NodeJS.Timeout | undefined

export const withoutThemeTransition = (action: () => any) => {
    if (timeoutAction || timeoutEnable) return

    clearTimeout(timeoutAction)
    clearTimeout(timeoutEnable)

    const style = document.createElement("style")
    const css = document.createTextNode(`*:not(.toggle-switch-slider), *:not(.toggle-switch-slider)::before, *:not(.toggle-switch-slider)::after {
        transition: none !important;
    }`)
    style.appendChild(css)

    const disable = () => document.head.appendChild(style)
    const enable = () => document.head.removeChild(style)

    disable()
    timeoutAction = setTimeout(() => {
        action()
        timeoutAction = undefined

        timeoutEnable = setTimeout(() => {
            enable()
            timeoutEnable = undefined
        }, 75)
    }, 75)
}

theme.subscribe(value => {
    if (browser) {
        document.cookie = `theme=${value};path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT`

        if (value == null) {
            window.localStorage.removeItem('theme')
            return
        }

        window.localStorage.setItem('theme', value)
    }
})

export default theme