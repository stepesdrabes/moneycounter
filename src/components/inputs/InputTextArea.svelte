<script lang="ts">
    import {onMount} from "svelte"

    export let initialValue = ''
    export let placeholder = ''
    export let name = 'description'
    export let height = '10rem'
    export let padding = "1rem"
    export let autofocus = false
    export let textSize = "var(--text-smaller)"
    export let onValueChange: (value: string) => void = (_) => {
    }

    let value = initialValue ?? ''
    $: onValueChange(value)

    let area: HTMLTextAreaElement

    onMount(() => {
        if (area && autofocus) area.focus()
    })
</script>

<textarea bind:this={area} style="font-size: {textSize}; height: {height}; padding: {padding}" name="{name}"
          placeholder="{placeholder}" bind:value={value}></textarea>

<style lang="scss">
  textarea {
    width: 100%;
    background-color: var(--background-color) none;
    border-radius: var(--border-radius-big);
    flex-shrink: 0;
    font-weight: 400;
    flex-grow: 0;
    border: 1px solid var(--outline-color);
    outline: none;
    resize: none;
    color: var(--text-color);
    transition: border-color 0.3s ease-in-out;

    &::placeholder {
      color: var(--label-color);
    }

    &:focus {
      border-color: var(--accent-color);
    }
  }
</style>