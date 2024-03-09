<script lang="ts">
    import Spacer from "$components/layout/Spacer.svelte"
    import Button from "$components/inputs/Button.svelte"
    import LineDivider from "$components/layout/LineDivider.svelte"
    import CircleIconButton from "$components/inputs/CircleIconButton.svelte"
    import theme, {withoutThemeTransition} from "$lib/theme"
    import {onDestroy, onMount} from "svelte"
    import type {PageData} from './$types'
    import DonateModal from "$components/modals/DonateModal.svelte"
    import LabelText from "$components/misc/LabelText.svelte"
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
    import {convertToTwemoji, formatRelativeDate, getFlagEmoji} from "$lib/util"
    import {tweened} from "svelte/motion"
    import {cubicOut} from "svelte/easing"
    import {browser} from "$app/environment"
    import {InfoModalEnum} from "$type/infoModalEnum"
    import InfoModal from "$components/modals/InfoModal.svelte"

    export let data: PageData

    $: progress = data.amount / data.goal * 100
    let donateShown = false
    let infoModalShown: InfoModalEnum | undefined = undefined

    let dark = false
    const darkUnsubscribe = theme.subscribe(value => dark = value === "dark-theme")

    const toggleTheme = () => {
        withoutThemeTransition(() => {
            if (dark) theme.set('light-theme')
            else theme.set('dark-theme')
        })
    }

    const tweenedProgress = tweened(0, {
        duration: 2000,
        easing: cubicOut
    })

    const buttonLinkClick = (modalType: InfoModalEnum) => {
        infoModalShown = modalType
    }

    onMount(() => {
        if (!browser) return
        tweenedProgress.set(1)
    })

    onDestroy(() => {
        darkUnsubscribe()
    })
</script>

<InfoModal modalType="{infoModalShown}" onClose="{() => infoModalShown = undefined}"/>
<DonateModal shown="{donateShown}" onClose="{() => donateShown = false}"/>

<CenteredPageContainer>
    <div class="info-container">
        <h1 class="counter">{(data.amount * $tweenedProgress).toFixed(2)} €</h1>

        <Spacer value="var(--spacing-m)"/>

        <div class="progress-bar-container">
            <LabelText width="1.5rem" textAlign="right" text="{(progress * $tweenedProgress).toFixed(0)}%"/>

            <div class="progress-bar">
                <div class="progress" style="width: {(progress * $tweenedProgress)}%"></div>
            </div>
        </div>

        <Spacer value="var(--spacing-l)"/>

        <Button width="min-content" height="2.5rem" label="Donate" onClick={() => donateShown = true}/>
    </div>

    {#if data.lastDonator}
        <Spacer value="var(--spacing-l)"/>
        <LineDivider value="5rem"/>
        <Spacer value="var(--spacing-l)"/>

        <h3>Last Donator</h3>
        <Spacer value="var(--spacing-ms)"/>

        <div class="last-donator-container">
            {@html convertToTwemoji(data.lastDonator.anonymous || data.lastDonator.country === 'UNKNOWN' ? '🌍' : getFlagEmoji(data.lastDonator.country))}
            <div class="point-divider"></div>
            <p class="name">{data.lastDonator.anonymous ? 'Anonymous Donator' : data.lastDonator.name}</p>
            <div class="point-divider"></div>
            <p class="amount">{data.lastDonator.amount} €</p>
            <div class="point-divider"></div>
            <span class="date">{formatRelativeDate(data.lastDonator.timestamp)}</span>
        </div>
    {/if}

    <div class="theme-switch">
        <CircleIconButton icon="{dark ? 'sun' : 'moon'}" title="Switch theme" compact="{true}"
                          iconColor="var(--text-color)" onClick={toggleTheme}/>
    </div>

    <div class="bottom-links">
        <button on:click={() => buttonLinkClick(InfoModalEnum.IMPRINT)}>Imprint</button>
        <button on:click={() => buttonLinkClick(InfoModalEnum.GENERAL_TERMS)}>General Terms</button>
        <button on:click={() => buttonLinkClick(InfoModalEnum.CONTACT)}>Contact</button>
    </div>
</CenteredPageContainer>

<style lang="scss">
  .theme-switch {
    position: absolute;
    top: var(--spacing-m);
    right: var(--spacing-m);
  }

  .bottom-links {
    width: 100%;
    justify-content: center;
    position: absolute;
    bottom: var(--spacing-xl);
    left: 50%;
    transform: translateX(-50%);
    display: flex;

    button {
      font-size: var(--text-smaller);
      background: none;
      height: 2rem;
      padding: 0 1.1rem;
      color: var(--text-color);
      border-radius: 1rem;
      border: none;
      cursor: pointer;
      outline: none;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: rgba(var(--text-color-rgb), 0.075);
      }
    }
  }

  .counter {
    font-size: 2.25rem;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .progress-bar-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-ms);

    .progress-bar {
      width: 17rem;
      height: 0.5rem;
      border-radius: 0.25rem;
      overflow: hidden;
      background-color: var(--box-background-color);
      outline: 1px solid var(--outline-color);

      .progress {
        height: 100%;
        background-color: var(--okay-green);
        border-radius: 0.25rem;
        transition: width 0.1s;
      }
    }
  }

  .last-donator-container {
    display: flex;
    align-items: center;

    .name {
      font-size: var(--text-midsmaller);
      font-weight: 500;
    }

    .amount {
      font-size: var(--text-midsmaller);
      color: var(--accent-color);
      font-weight: 500;
    }

    .date {
      font-size: var(--text-small);
      color: var(--label-color);
    }

    .point-divider {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--outline-color);
      margin: 0 var(--spacing-ms);
    }
  }

  @media screen and (max-width: 600px) {
    .bottom-links button {
      font-size: var(--text-small);
    }
  }
</style>
