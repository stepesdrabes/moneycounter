<script lang="ts">
    import {onMount} from "svelte"
    import {showBottomNav} from "$lib/stores"

    export let bottomNav: boolean = true

    onMount(() => {
        showBottomNav.set(bottomNav)
    })
</script>

<div class="page-container">
    <slot/>
</div>

<style lang="scss">
  .page-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    animation: 0.3s ease-in-out 0s 1 slideInBottomPartially;
  }
</style>