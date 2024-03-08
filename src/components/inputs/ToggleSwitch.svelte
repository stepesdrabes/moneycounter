<script lang="ts">
    import {createEventDispatcher} from 'svelte'

    export let id = ''
    export let checked = false

    const dispatch = createEventDispatcher()
    const handleChange = () => dispatch('change', !checked)
</script>

<label class="switch">
    <input id="{id}" type="checkbox" bind:checked={checked} on:change={handleChange}>
    <span class="toggle-switch-slider"></span>
</label>

<style lang="scss">
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    flex-shrink: 0;
    height: 1.4rem;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-switch-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--background-color);
      outline: 1px solid var(--outline-color);
      transition: .4s;
      border-radius: 1.4rem;

      &:before {
        position: absolute;
        content: "";
        height: 1.1rem;
        width: 1.1rem;
        left: 0.15rem;
        bottom: 0.15rem;
        background-color: var(--text-color);
        transition: .4s;
        border-radius: 50%;
      }
    }

    input:checked {
      &:hover + .toggle-switch-slider {
        outline: 1px solid var(--text-color);
      }

      + .toggle-switch-slider {
        background-color: var(--okay-green);

        &:before {
          background-color: white;
          transform: translateX(17px);
        }
      }
    }

    input:hover + .toggle-switch-slider {
      outline: 1px solid var(--accent-color);
    }
  }
</style>