<script lang="ts">
    export let text: string
    export let opacity = "1"
    export let color = "var(--label-color)"
    export let fontSize = "var(--text-small)"
    export let fontWeight = "400"
    export let width = "100%"
    export let textAlign = "start"
    export let padding = "0"
    export let whiteSpace = "normal"
    export let lineHeight: string | undefined = undefined
</script>

<span class="label"
      style="opacity: {opacity}; color: {color}; font-size: {fontSize}; width: {width}; text-align: {textAlign}; padding: {padding}; font-weight: {fontWeight}; white-space: {whiteSpace}; {lineHeight ? `line-height: ${lineHeight};` : ''}">
    {text}
</span>