<script lang="ts">
    import ContentLoader from "$components/misc/ContentLoader.svelte"

    export let color = "var(--accent-color)"
    export let size = "2.75rem"
    export let iconSize = "var(--text-smaller)"
    export let icon = "check"
    export let onClick: (() => void) | undefined = undefined
    export let showHoverTitle = false
    export let compact = false
    export let borderRadius = compact ? "var(--border-radius-normal)" : "50%"
    export let title = ""
    export let name = ""
    export let value = ""
    export let disabled = false
    export let submit = false
    export let loading = false
    export let iconColor = compact ? "var(--text-color)" : "white"
    export let hoverable = onClick !== undefined
    export let customSymbol: string | undefined = undefined
</script>

{#if submit}
    {#if compact}
        <button name="{name}" value="{value}" type="submit" disabled={disabled} title="{title}"
                on:click|stopPropagation={onClick ?? (() => {})} style="border-radius: {borderRadius};"
                class="compact-button {hoverable ? 'hoverable' : ''}">
            {#if loading}
                <ContentLoader size="{iconSize}" color="{iconColor}"/>
            {:else}
                {#if customSymbol}
                    <span style="color: {iconColor}; font-size: {iconSize}">{customSymbol}</span>
                {:else}
                    <i class="icon fi fi-br-{icon}" style="color: {iconColor}; font-size: {iconSize}"></i>
                {/if}

                {#if showHoverTitle}
                    <span class="hover-title">{title}</span>
                {/if}
            {/if}
        </button>
    {:else}
        <button name="{name}" value="{value}" type="submit" disabled={loading || disabled} title="{title}"
                on:click|stopPropagation={onClick ?? (() => {})}
                style="background-color: {color}; border-radius: {borderRadius}; width: {size}; height: {size}"
                class="circle-button {hoverable ? 'hoverable' : ''}">
            {#if loading}
                <ContentLoader size="{iconSize}" color="{iconColor}"/>
            {:else}
                {#if customSymbol}
                    <span style="color: {iconColor}; font-size: {iconSize}">{customSymbol}</span>
                {:else}
                    <i class="icon fi fi-br-{icon}" style="color: {iconColor}; font-size: {iconSize}"></i>
                {/if}

                {#if showHoverTitle}
                    <span class="hover-title">{title}</span>
                {/if}
            {/if}
        </button>
    {/if}
{:else}
    {#if compact}
        <button type="button" disabled={disabled} title="{title}" on:click|stopPropagation={onClick ?? (() => {})}
                style="border-radius: {borderRadius};" class="compact-button {hoverable ? 'hoverable' : ''}">
            {#if loading}
                <ContentLoader size="{iconSize}" color="{iconColor}"/>
            {:else}
                {#if customSymbol}
                    <span style="color: {iconColor}; font-size: {iconSize}">{customSymbol}</span>
                {:else}
                    <i class="icon fi fi-br-{icon}" style="color: {iconColor}; font-size: {iconSize}"></i>
                {/if}

                {#if showHoverTitle}
                    <span class="hover-title">{title}</span>
                {/if}
            {/if}
        </button>
    {:else}
        <button type="button" disabled={loading || disabled} title="{title}"
                on:click|stopPropagation={onClick ?? (() => {})}
                style="background-color: {color}; border-radius: {borderRadius}; width: {size}; height: {size}"
                class="circle-button {hoverable? 'hoverable' : ''}">
            {#if loading}
                <ContentLoader size="{iconSize}" color="{iconColor}"/>
            {:else}
                {#if customSymbol}
                    <span style="color: {iconColor}; font-size: {iconSize}">{customSymbol}</span>
                {:else}
                    <i class="icon fi fi-br-{icon}" style="color: {iconColor}; font-size: {iconSize}"></i>
                {/if}

                {#if showHoverTitle}
                    <span class="hover-title">{title}</span>
                {/if}
            {/if}
        </button>
    {/if}
{/if}

<style lang="scss">
  .compact-button {
    position: relative;
    border-radius: 0.2rem;
    width: 1.6rem;
    height: 1.6rem;
    background: none;
    flex-shrink: 0;
    outline: none;
    border: none;

    &.hoverable:hover {
      background-color: rgba(var(--text-color-rgb), 0.1);
    }
  }

  .circle-button {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    outline: 1px solid var(--outline-color);
    border: none;
    background: none;
    flex-shrink: 0;
  }

  button {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

    &:disabled {
      opacity: 0.25 !important;

      &:hover {
        cursor: not-allowed !important;
        opacity: 0.25 !important;
        transform: none !important;
      }
    }

    &.hoverable:hover {
      cursor: pointer;
      transform: translateY(-0.125rem);
      opacity: 0.75;

      .hover-title {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0.75rem);
      }
    }

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: color 0.15s ease-in-out;
    }

    .hover-title {
      top: 50%;
      left: 50%;
      opacity: 0;
      position: absolute;
      visibility: hidden;
      transform: translate(-50%, 0);
      border-radius: 0.25rem;
      outline: 1px solid var(--outline-color);
      background-color: var(--box-background-color);
      z-index: 100;
      color: var(--text-color);
      font-weight: 600;
      font-size: var(--text-small);
      white-space: nowrap;
      padding: 0.25rem 0.5rem;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    }
  }
</style>