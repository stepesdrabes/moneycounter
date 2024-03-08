<script lang="ts">
    import "../app.scss"
    import {browser} from "$app/environment"
    import theme from "$lib/theme"
    import {onDestroy} from "svelte"
    import type {LayoutData} from './$types'

    export let data: LayoutData
    const localTheme = data.theme

    theme.set(data.theme)

    let themeValue: string | null = null
    let themeUnsubscribe = theme.subscribe((value) => {
        if (browser && value) {
            document.body.classList.forEach((clazz) => document.body.classList.remove(clazz))
            document.body.classList.add(value)
        }

        themeValue = value
    })

    onDestroy(() => {
        themeUnsubscribe()
    })
</script>

<div class="app-container {themeValue ?? localTheme}">
    <slot/>
</div>

<style lang="scss">
  .app-container {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    color: var(--text-color);
    overflow: hidden;
    background-color: var(--background-color);
  }
</style>