<script lang="ts">
    export let value = "100%"
    export let padding = "0"
    export let type = "h"
</script>

<div class="line-divider-container"
     style="padding: {padding}; width: {type === 'v' ? '0' : value}; height: {type === 'h' ? '0' : value};">
    <div class="line-divider"
         style="width: {type === 'v' ? '0' : value}; height: {type === 'h' ? '0' : value}; border-left: {type === 'v' ? '1px solid var(--outline-color)' : ''}; border-top: {type === 'h' ? '1px solid var(--outline-color)' : ''}"></div>
</div>

<style lang="scss">
  .line-divider-container {
    box-sizing: content-box;
  }
</style>