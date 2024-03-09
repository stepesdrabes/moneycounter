<script lang="ts">
    import theme from "$lib/theme"
    import {onDestroy} from "svelte"

    export let placeholder = ""
    export let name = ""
    export let height = "3rem"
    export let outlineColor = "var(--outline-color)"
    export let outlineWidth = "1px"
    export let backgroundColor = "transparent"
    export let textColor = "var(--text-color)"
    export let textSize = "var(--text-smaller)"
    export let paddingLeftNoIcon = "1rem"
    export let paddingRightNoPassword = "1rem"
    export let initialValue = undefined
    export let passReference: (ref: HTMLInputElement) => void = (_) => {
    }
    export let icon: string | undefined = undefined
    export let password = false
    export let autoFocus = false
    export let disabled = false
    export let onValueChange = (value: string) => {
    }
    export let iconColor = "var(--accent-color)"
    export let value = initialValue ?? ""

    let displayPassword = false

    let reference: HTMLInputElement | undefined
    $: if (reference && autoFocus) reference.focus()
    $: if (reference) passReference(reference)

    $: onValueChange(value)

    let dark: boolean
    const themeUnsubscribe = theme.subscribe(value => dark = value === 'dark-theme')

    onDestroy(() => {
        themeUnsubscribe()
    })
</script>

<div class="icon-input-field" class:disabled={disabled}
     style="--height: {height}; height: {height}; --outlineColor: {outlineColor}; --bgColor: {backgroundColor}; --textColor: {textColor}; --outlineWidth: {outlineWidth}">
    {#if icon}
        <i class="icon fi fi-br-{icon}" style="color: {iconColor}"></i>
    {/if}

    {#if password && !displayPassword}
        <input bind:this={reference} bind:value={value} type="password"
               name="{name}" placeholder="{placeholder}"
               style="font-size: {textSize}; padding-left: {icon ? '3rem' : paddingLeftNoIcon}; padding-right: {password ? '3rem' : paddingRightNoPassword}; color-scheme: {dark ? 'dark' : 'light'};"
               disabled="{disabled}">
    {:else}
        <input bind:this={reference} bind:value={value} type="text"
               name="{name}" placeholder="{placeholder}"
               style="font-size: {textSize}; padding-left: {icon ? '3rem' : paddingLeftNoIcon}; padding-right: {password ? '3rem' : paddingRightNoPassword}; color-scheme: {dark ? 'dark' : 'light'};"
               disabled="{disabled}">
    {/if}

    {#if password}
        <button tabindex="-1" type="button" class="see-password-button"
                on:click={() => { displayPassword = !displayPassword }}>
            <i class="see-password-icon fi fi-br-{displayPassword ? 'eye-crossed' : 'eye'}"
               style="color: {iconColor}"></i>
        </button>
    {/if}
</div>

<style lang="scss">
  .icon-input-field {
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;
    width: 100%;
    border-radius: calc(var(--height) / 2);
    padding: 0 1rem;
    color: var(--textColor);
    isolation: isolate;
    border: var(--outlineWidth) solid var(--outlineColor);
    background-color: var(--bgColor);
    transition: background-color 0.3s ease-in-out, outline 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out;

    &.disabled {
      cursor: not-allowed;
      filter: blur(1px);
      opacity: 0.6;
    }

    .icon {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 1.5rem;
      transform: translate(-50%, -50%);
    }

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      background: none;
      border-radius: calc(var(--height) / 2);
      color: var(--textColor);
      accent-color: var(--accent-color);
      outline: 1px solid transparent;
      transition: outline-color 0.15s ease-in-out;

      &::placeholder {
        color: var(--label-color);
      }

      &:focus {
        outline-color: var(--accent-color);
      }

      &:-webkit-autofill {
        outline-color: var(--accent-color);
      }
    }

    .see-password-button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3rem;
      width: 3rem;
      border: none;
      outline: none;
      background: none;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
</style>