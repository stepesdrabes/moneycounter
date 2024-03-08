import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async ({cookies}) => {
    let theme = cookies.get('theme')
    if (theme !== 'light-theme' && theme !== 'dark-theme') theme = 'light-theme'
    return {theme: theme}
}