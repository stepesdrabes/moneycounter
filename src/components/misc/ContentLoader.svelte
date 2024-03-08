<script lang="ts">
    export let color = "var(--accent-color)"
    export let size = "2rem"
    export let borderWidth = "1px"
</script>

<span class="loader"
      style="border: {borderWidth} solid {color}; border-bottom-color: transparent; width: {size}; height: {size}"></span>

<style lang="scss">
  .loader {
    border-radius: 75%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 0.75s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>