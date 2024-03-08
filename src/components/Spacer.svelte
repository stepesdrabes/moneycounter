<script lang="ts">
    export let value: string
    export let type = "h"
</script>

<div class="spacer" style="margin-left: {type === 'w' ? value : 0}; margin-top: {type === 'h' ? value : 0};"></div>