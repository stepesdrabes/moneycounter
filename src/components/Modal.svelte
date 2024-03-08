<script lang="ts">
    import CircleIconButton from "$components/CircleIconButton.svelte"
    import {fade} from 'svelte/transition'
    import {onDestroy, onMount} from "svelte"
    import {browser} from "$app/environment"
    import {sendAnim} from "$lib/animations"

    export let maxWidth = "95%"
    export let maxHeight = "95%"
    export let width = "40rem"
    export let height = "50rem"
    export let zIndex = "100"
    export let shown = false
    export let escToClose: boolean = true
    export let clickOutToClose: boolean = true
    export let onClose = () => {
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (!escToClose) return
        if (event.key === 'Escape') onClose()
    }

    onMount(() => {
        if (browser) window.addEventListener('keydown', handleKeyPress)
    })

    onDestroy(() => {
        if (browser) window.removeEventListener('keydown', handleKeyPress)
    })
</script>

{#if shown}
    <div class="modal-overlay" style="z-index: {zIndex}" in:fade|local={{duration: 150}}
         out:fade|local={{duration: 150}} on:click={clickOutToClose ? onClose : (() => {})}
         on:keydown={() => {}} on:keypress={() => {}} on:keyup={() => {}} role="button" tabindex="-1">
        <div class="modal-window" on:click|stopPropagation on:keydown={() => {}} on:keypress={() => {}}
             on:keyup={() => {}} role="button" tabindex="-1" out:sendAnim|local={{key: 100}}
             style="width: {width}; height: {height}; max-width: {maxWidth}; max-height: {maxHeight}">
            <div class="buttons-container">
                <CircleIconButton compact="{true}" iconColor="var(--danger-red)" icon="cross" onClick="{onClose}"/>
            </div>

            <slot/>
        </div>
    </div>
{/if}

<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);

    .modal-window {
      position: absolute;
      top: 50%;
      left: 50%;
      outline: none;
      transform: translate(-50%, -50%);
      border: 1px solid var(--outline-color);
      background-color: var(--background-color);
      border-radius: var(--border-radius-big);
      overflow-y: scroll;
      -ms-overflow-style: none;
      scrollbar-width: none;
      animation: 0.3s ease-in-out 0s 1 modalSlide;

      .buttons-container {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
    }
  }

  @keyframes modalSlide {
    0% {
      transform: translate(-50%, -48.75%);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%);
      opacity: 100%;
    }
  }
</style>