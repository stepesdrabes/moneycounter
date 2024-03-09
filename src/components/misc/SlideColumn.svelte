<script lang="ts">
    export let padding: string = "0"

    import {slide} from "svelte/transition"
</script>

<div class="slide-column" style="padding: {padding};" transition:slide|local={{axis: 'y'}}>
    <slot/>
</div>

<style lang="scss">
  .slide-column {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>