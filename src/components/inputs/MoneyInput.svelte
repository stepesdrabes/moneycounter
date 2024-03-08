<script lang="ts">
    import {createEventDispatcher, onMount} from 'svelte'
    import {browser} from "$app/environment"

    let amountFormatted = '0.00'
    let currencyInput: HTMLInputElement
    const dispatch = createEventDispatcher()

    const handleChange = () => {
        let cleanedInput = currencyInput.value
            .replace(/\D*/gm, '')
            .replace(/^0+/gm, '')

        if (cleanedInput.length === 0) amountFormatted = '0.00'
        else amountFormatted = (parseInt(cleanedInput, 10) / 100).toFixed(2)

        dispatch('change', {value: amountFormatted})
    }

    onMount(() => {
        if(!browser) return
        setTimeout(() => currencyInput.focus(), 100)
    })
</script>

<input type="tel" bind:value={amountFormatted} bind:this={currencyInput} on:input={handleChange}/>

<style lang="scss">
  input[type=tel] {
    text-align: center;
    background: none;
    outline: none;
    font-size: 2rem;
    font-weight: 500;
  }
</style>