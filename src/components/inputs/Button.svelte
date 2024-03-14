<script lang="ts">
    import ContentLoader from "$components/misc/ContentLoader.svelte"

    export let label = ""
    export let height = "2.5rem"
    export let width = "100%"
    export let onClick: (() => void) | undefined = undefined
    export let href: string | undefined = undefined
    export let outlined = false
    export let submit = false
    export let color = "var(--accent-color)"
    export let textColor = "#FFFFFF"
    export let textSize = "var(--text-smaller)"
    export let hoverTextColor = "var(--accent-second-color)"
    export let icon: string | undefined = undefined
    export let formAction: string | undefined = undefined
    export let disabled = false
    export let loading = false
</script>

<div class="button-styles-container" style="--btnHeight: {height}; --btnWidth: {width}">
    {#if outlined}
        <div class="outlined-button-container">
            {#if onClick || submit}
                {#if submit}
                    {#if formAction}
                        <button disabled="{disabled || loading}" formaction="{formAction}" type="submit"
                                class="outlined-button"
                                style="border: 2px solid {color}; color: {textColor}; font-size: {textSize}"
                                aria-label="{label}"
                                on:click={onClick ?? (() => {})}>
                            {#if loading}
                                <ContentLoader size="1.5rem" color="{textColor}"/>
                            {:else}
                                {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                                {label}
                            {/if}
                        </button>
                    {:else}
                        <button disabled="{disabled || loading}" type="submit" class="outlined-button"
                                style="border: 2px solid {color}; color: {textColor}; font-size: {textSize}"
                                aria-label="{label}"
                                on:click={onClick ?? (() => {})}>
                            {#if loading}
                                <ContentLoader size="1.5rem" color="{textColor}"/>
                            {:else}
                                {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                                {label}
                            {/if}
                        </button>
                    {/if}
                {:else}
                    <button disabled="{disabled || loading}" type="button" class="outlined-button"
                            style="border: 2px solid {color}; color: {textColor}; font-size: {textSize}"
                            aria-label="{label}" on:click={onClick}>
                        {#if loading}
                            <ContentLoader size="1.5rem" color="{textColor}"/>
                        {:else}
                            {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                            {label}
                        {/if}
                    </button>
                {/if}
            {/if}

            {#if href}
                <a href="{href}">
                    <button disabled="{disabled || loading}" class="outlined-button"
                            style="border: 2px solid {color}; color: {textColor}; font-size: {textSize}"
                            aria-label="{label}">
                        {#if loading}
                            <ContentLoader size="1.5rem" color="{textColor}"/>
                        {:else}
                            {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                            {label}
                        {/if}
                    </button>
                </a>
            {/if}

            {#if !disabled && !loading}
                <span class="hover-text" style="color: {hoverTextColor}">{label}</span>

                <div class="background-fill" style="background-color: {color}; color: {textColor};"></div>
            {/if}
        </div>
    {:else}
        {#if onClick}
            {#if onClick || submit}
                {#if submit}
                    {#if formAction}
                        <button disabled="{disabled || loading}" formaction="{formAction}" type="submit"
                                class="filled-button"
                                style="background-color: {color}; color: {textColor}; font-size: {textSize}"
                                on:click={onClick ?? (() => {})} aria-label="{label}">
                            {#if loading}
                                <ContentLoader size="1.5rem" color="{textColor}"/>
                            {:else}
                                {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                                {label}
                            {/if}
                        </button>
                    {:else}
                        <button disabled="{disabled || loading}" type="submit" class="filled-button"
                                style="background-color: {color}; color: {textColor}; font-size: {textSize}"
                                on:click={onClick ?? (() => {})}
                                aria-label="{label}">
                            {#if loading}
                                <ContentLoader size="1.5rem" color="{textColor}"/>
                            {:else}
                                {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                                {label}
                            {/if}
                        </button>
                    {/if}
                {:else}
                    <button disabled="{disabled || loading}" type="button" class="filled-button"
                            style="background-color: {color}; color: {textColor}; font-size: {textSize}"
                            aria-label="{label}" on:click={onClick}>
                        {#if loading}
                            <ContentLoader size="1.5rem" color="{textColor}"/>
                        {:else}
                            {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                            {label}
                        {/if}
                    </button>
                {/if}
            {/if}
        {/if}

        {#if href}
            <a href="{href}">
                <button class="filled-button"
                        style="background-color: {color}; color: {textColor}; font-size: {textSize}"
                        aria-label="{label}">
                    {#if loading}
                        <ContentLoader size="1.5rem" color="{textColor}"/>
                    {:else}
                        {#if icon}<i class="icon fi fi-br-{icon}"></i>{/if}
                        {label}
                    {/if}
                </button>
            </a>
        {/if}
    {/if}
</div>

<style lang="scss">
  .button-styles-container {
    width: var(--btnWidth);
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    justify-content: center;
    width: 100%;
    outline: none;
    border: none;
    height: var(--btnHeight);
    padding: 0 1.5rem;
    border-radius: calc(var(--btnHeight) / 2);
    font-weight: 500;
    font-size: var(--text-smaller);
    cursor: pointer;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .filled-button {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
      opacity: 0.75;
    }

    &:disabled {
      opacity: 0.25;

      &:hover {
        transform: none;
        cursor: not-allowed;
      }
    }
  }

  .outlined-button-container {
    cursor: pointer;
    position: relative;
    border-radius: 0.33rem;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
      opacity: 0.75;

      .background-fill {
        transform: translateY(0);
      }

      .hover-text {
        opacity: 1;
      }
    }

    .outlined-button {
      background-color: transparent;
    }

    .hover-text {
      pointer-events: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-weight: 500;
      font-size: var(--text-smaller);
      cursor: pointer;
      text-transform: uppercase;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      white-space: nowrap;
    }

    .background-fill {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(100%);
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease-in-out;
    }
  }
</style>