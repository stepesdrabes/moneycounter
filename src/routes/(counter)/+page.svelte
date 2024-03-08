<script lang="ts">
    import Spacer from "$components/layout/Spacer.svelte"
    import Button from "$components/inputs/Button.svelte"
    import LineDivider from "$components/layout/LineDivider.svelte"
    import Modal from "$components/layout/Modal.svelte"
    import CircleIconButton from "$components/inputs/CircleIconButton.svelte"
    import theme, {withoutThemeTransition} from "$lib/theme"
    import {onDestroy} from "svelte"
    import type {PageData} from './$types'
    import IconNumberField from "$components/inputs/IconNumberField.svelte"
    import IconInputField from "$components/inputs/IconInputField.svelte"
    import LabelText from "$components/misc/LabelText.svelte"
    import ToggleSwitch from "$components/inputs/ToggleSwitch.svelte"

    export let data: PageData

    $: progress = data.amount / data.goal * 100
    let donateShown = false

    let selectedAmount = 0
    let selectedName = ""
    let stayAnonymous = false
    $: valuesCorrect = selectedAmount > 0
        && selectedName.length > 0

    let dark = false
    const darkUnsubscribe = theme.subscribe(value => dark = value === "dark-theme")

    const toggleTheme = () => {
        withoutThemeTransition(() => {
            if (dark) theme.set('light-theme')
            else theme.set('dark-theme')
        })
    }

    onDestroy(() => {
        darkUnsubscribe()
    })
</script>

<Modal width="27.5rem" height="35rem" shown="{donateShown}" onClose="{() => donateShown = false}">
    <div class="donate-modal-container">
        <h2>How much do you want to donate?</h2>
        <Spacer value="var(--spacing-m)"/>
        <IconNumberField height="2.5rem" icon="money" placeholder="Amount"
                         onValueChange="{(value) => selectedAmount = value ?? 0}"/>
        <Spacer value="var(--spacing-xl)"/>

        <h2>What's your name?</h2>
        <Spacer value="var(--spacing-m)"/>
        <IconInputField height="2.5rem" icon="user" placeholder="Name"
                        onValueChange="{(value) => selectedName = value}"/>

        <Spacer value="var(--spacing-l)"/>

        <label class="checkbox-setting-row" for="setting-whole-day">
            <ToggleSwitch id="setting-whole-day" bind:checked={stayAnonymous}/>

            <span class="texts-container">
                <span class="description">Stay anonymous?</span>
            </span>
        </label>
        <Spacer value="var(--spacing-s)"/>
        <LabelText
                text="If you select this setting, your name will be hidden in 'last donator' section of the website."/>

        <Spacer value="auto"/>
        <Spacer value="var(--spacing-l)"/>

        <Button disabled="{!valuesCorrect}" width="min-content" height="2.5rem" icon="arrow-right"
                label="Pay through stripe" onClick={() => donateShown = false}/>
    </div>
</Modal>

<div class="counter-container">
    <h1 class="counter">{data.amount} €</h1>

    <Spacer value="var(--spacing-m)"/>

    <div class="progress-bar">
        <div class="progress" style="width: {progress}%"></div>
    </div>

    <Spacer value="var(--spacing-l)"/>

    <Button width="min-content" height="2.5rem" label="Donate" onClick={() => donateShown = true}/>

    {#if data.lastDonator}
        <Spacer value="var(--spacing-l)"/>
        <LineDivider value="5rem"/>
        <Spacer value="var(--spacing-l)"/>

        <h3>Last Donator</h3>
        <Spacer value="var(--spacing-ms)"/>

        <div class="last-donator-container">
            <span class="flag">{data.lastDonator.anonymous ? '🌍' : '🇩🇪'}</span>
            <div class="point-divider"></div>
            <p class="name">{data.lastDonator.anonymous ? 'Anonymous Donator' : data.lastDonator.name}</p>
            <div class="point-divider"></div>
            <p class="amount">{data.lastDonator.amount} €</p>
            <div class="point-divider"></div>
            <span class="date">9 mins ago</span>
        </div>
    {/if}

    <div class="theme-switch">
        <CircleIconButton icon="{dark ? 'sun' : 'moon'}" title="Switch theme" compact="{true}"
                          iconColor="var(--text-color)" onClick={toggleTheme}/>
    </div>
</div>

<style lang="scss">
  .donate-modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3.5rem var(--spacing-l) 2.25rem;
  }

  .counter-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .theme-switch {
      position: absolute;
      top: var(--spacing-m);
      right: var(--spacing-m);
    }
  }

  .counter {
    font-size: 2.25rem;
  }

  .progress-bar {
    width: 20rem;
    height: 0.5rem;
    border-radius: 0.25rem;
    overflow: hidden;
    background-color: var(--box-background-color);
    outline: 1px solid var(--outline-color);

    .progress {
      height: 100%;
      background-color: var(--okay-green);
      border-radius: 0.25rem;
    }
  }

  .last-donator-container {
    display: flex;
    align-items: center;

    .flag {
      font-size: 1.25rem;
    }

    .name {
      font-size: var(--text-midsmaller);
      font-weight: 500;
    }

    .amount {
      font-size: var(--text-midsmaller);
      color: var(--accent-color);
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

  .checkbox-setting-row {
    width: calc(100% + 1rem);
    cursor: pointer;
    padding: 0.75rem 0.5rem;
    margin: 0 -0.5rem;
    display: flex;
    align-items: center;
    border-radius: 0.25rem;
    gap: var(--spacing-m);
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: var(--box-background-color);
    }

    .texts-container {
      display: flex;
      flex-direction: column;
      align-items: start;

      .description {
        color: var(--label-color);
        font-size: var(--text-small);
      }
    }
  }
</style>
