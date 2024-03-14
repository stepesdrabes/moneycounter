<script lang="ts">
    import "../app.scss"
    import {browser} from "$app/environment"
    import theme, {withoutThemeTransition} from "$lib/theme"
    import {onDestroy} from "svelte"
    import type {LayoutData} from './$types'
    import {page} from "$app/stores"
    import {showBottomNav} from "$lib/stores"
    import CircleIconButton from "$components/inputs/CircleIconButton.svelte"
    import {fly} from "svelte/transition"

    export let data: LayoutData
    const localTheme = data.theme

    theme.set(data.theme)

    let themeValue: string | null = null
    let dark = false
    let themeUnsubscribe = theme.subscribe((value) => {
        if (browser && value) {
            document.body.classList.forEach((clazz) => document.body.classList.remove(clazz))
            document.body.classList.add(value)
        }

        themeValue = value
        dark = value === 'dark-theme'
    })

    const toggleTheme = () => {
        withoutThemeTransition(() => {
            if (dark) theme.set('light-theme')
            else theme.set('dark-theme')
        })
    }

    onDestroy(() => {
        themeUnsubscribe()
    })
</script>

<div class="app-container {themeValue ?? localTheme}">
    <slot/>

    {#if $showBottomNav}
        <div class="bottom-links">
            {#if $page.url.pathname !== '/'}
                <a href="/" in:fly={{y: 10, duration: 300}}>Home</a>
            {/if}

            <a href="/imprint" class:selected={$page.url.pathname === '/imprint'}>Imprint</a>
            <a href="/terms" class:selected={$page.url.pathname === '/terms'}>General Terms</a>
            <a href="/contact" class:selected={$page.url.pathname === '/contact'}>Contact</a>
        </div>
    {/if}

    <div class="theme-switch">
        <CircleIconButton icon="{dark ? 'sun' : 'moon'}" title="Switch theme" compact="{true}"
                          iconColor="var(--text-color)" onClick={toggleTheme}/>
    </div>
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

    .bottom-links {
      width: 100%;
      justify-content: center;
      position: absolute;
      bottom: var(--spacing-xl);
      left: 50%;
      transform: translateX(-50%);
      display: flex;

      a {
        font-size: var(--text-smaller);
        background: none;
        height: 2rem;
        padding: 0 1.1rem;
        color: var(--text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
        border: none;
        cursor: pointer;
        outline: none;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

        &:hover {
          background-color: rgba(var(--text-color-rgb), 0.075);
        }

        &.selected {
          background-color: rgba(44, 109, 255, 0.075);
          color: var(--accent-color);

          &:hover {
            background-color: rgba(44, 109, 255, 0.15) !important;
          }
        }
      }
    }

    .theme-switch {
      position: absolute;
      top: var(--spacing-m);
      right: var(--spacing-m);
    }
  }

  @media screen and (max-width: 600px) {
    .app-container .bottom-links a {
      font-size: var(--text-small);
    }
  }
</style>