<script lang="ts">
    export let options: string[]
    export let placeholder: string = "Select an option..."
    export let onSelect: (value: string) => void
    export let height: string = "2.5rem"
    export let disabled: boolean = false
    export let outlineColor: string = "var(--outline-color)"
    export let outlineWidth: string = "1px"
    export let backgroundColor: string = "transparent"
    export let textColor = "var(--text-color)"

    let selectedValue: string
    $: onSelect(selectedValue)
</script>

<div class="text-select-dropdown" class:disabled={disabled}
     style="--height: {height}; height: {height}; --outlineColor: {outlineColor}; --bgColor: {backgroundColor}; --textColor: {textColor}; --outlineWidth: {outlineWidth}">
    <select bind:value={selectedValue} style="--height: {height}">
        <option value="" disabled selected>{placeholder}</option>

        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>

    <i class="drop-down-arrow fi fi-br-angle-small-down"></i>
</div>

<style lang="scss">
  .text-select-dropdown {
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;
    width: 100%;
    border-radius: calc(var(--height) / 2);
    color: var(--textColor);
    isolation: isolate;
    border: var(--outlineWidth) solid var(--outlineColor);
    background-color: var(--bgColor);
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, outline 0.3s ease-in-out, opacity 0.3s ease-in-out, filter 0.3s ease-in-out;

    &.disabled {
      cursor: not-allowed;
      filter: blur(1px);
      opacity: 0.6;
    }

    select {
      width: 100%;
      height: 100%;
      border: none;
      background: none;
      border-radius: calc(var(--height) / 2);
      color: var(--textColor);
      accent-color: var(--accent-color);
      padding: 0 var(--spacing-m);
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

    .drop-down-arrow {
      position: absolute;
      font-size: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      right: var(--spacing-m);
      pointer-events: none;
    }
  }

  @supports (-webkit-appearance:none) {
    .text-select-dropdown select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
</style>