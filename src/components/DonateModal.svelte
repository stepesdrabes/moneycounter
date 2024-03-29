<script lang="ts">
    import Modal from "$components/layout/Modal.svelte"
    import ToggleSwitch from "$components/inputs/ToggleSwitch.svelte"
    import LabelText from "$components/misc/LabelText.svelte"
    import Spacer from "$components/layout/Spacer.svelte"
    import IconInputField from "$components/inputs/IconInputField.svelte"
    import Button from "$components/inputs/Button.svelte"
    import MoneyInput from "$components/inputs/MoneyInput.svelte"
    import {onMount} from "svelte"
    import {browser} from "$app/environment"
    import SlideColumn from "$components/misc/SlideColumn.svelte"
    import TextDropdown from "$components/inputs/TextDropdown.svelte"
    import {contentCreators} from "$lib/constants"

    export let shown = false
    export let onClose: () => void

    let selectedAmount = 0
    let selectedName = ""
    let stayAnonymous = false
    let checkingOut = false
    let countryCode = ""
    let selectedContentCreator = ""

    $: valuesCorrect = selectedAmount >= 1
        && (selectedName.length > 0 || stayAnonymous)
        && selectedContentCreator.length > 0

    const handleAmountChange = (event: CustomEvent<{ value: string }>) => {
        selectedAmount = parseFloat(event.detail.value)
    }

    const checkout = async () => {
        if (checkingOut) return
        checkingOut = true

        const data = await fetch("/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: selectedAmount,
                name: selectedName,
                anonymous: stayAnonymous,
                country: countryCode
            }),
        }).then((data) => data.json())

        window.location.replace(data.url)
    }

    onMount(async () => {
        if (!browser) return
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        if (ipResponse.ok) {
            const ipJson = await ipResponse.json()
            let currentIpAddress = ipJson.ip

            const locationResponse = await fetch(`https://${location.hostname}/ip-api/${currentIpAddress}`)
            if (locationResponse.ok) {
                const locationJson = await locationResponse.json()
                countryCode = locationJson.countryCode
            }
        }
    })
</script>

<Modal width="30rem" height="40rem" shown="{shown}" onClose="{onClose}">
    <div class="donate-modal-container">
        <h2>How much do you want to donate?</h2>
        <Spacer value="var(--spacing-m)"/>

        <MoneyInput on:change={handleAmountChange}/>

        {#if selectedAmount > 0 && selectedAmount < 1}
            <SlideColumn>
                <Spacer value="var(--spacing-s)"/>
                <LabelText text="Minimum amount is 1€" textAlign="center" color="var(--danger-red)"/>
            </SlideColumn>
        {/if}

        <Spacer value="var(--spacing-s)"/>

        <div class="euro-label">
            <span class="label">EUR €</span>
        </div>

        <Spacer value="var(--spacing-xl)"/>

        <h2>To which <span class="yellow-underline">heroic donator</span> may we say thank you?</h2>
        <Spacer value="var(--spacing-m)"/>
        <IconInputField disabled="{stayAnonymous}" height="2.5rem" icon="user" placeholder="Name"
                        onValueChange="{(value) => selectedName = value}"/>

        <Spacer value="var(--spacing-ms)"/>

        <label class="checkbox-setting-row" for="setting-whole-day">
            <ToggleSwitch id="setting-whole-day" bind:checked={stayAnonymous}/>

            <span class="texts-container">
                <span class="description">Stay anonymous?</span>
            </span>
        </label>
        <Spacer value="var(--spacing-s)"/>
        <LabelText
                text="If you select this setting, your name will be hidden in 'last donator' section of the website."/>

        <Spacer value="var(--spacing-xl)"/>

        <TextDropdown options="{contentCreators}" placeholder="Select content creator..."
                      onSelect="{(value) => selectedContentCreator = value}"/>
        <Spacer value="var(--spacing-s)"/>
        <LabelText text="Select the content creator you want to support."/>

        <Spacer value="auto"/>
        <Spacer value="var(--spacing-l)"/>

        <Button loading="{checkingOut}" disabled="{!valuesCorrect}" height="2.5rem" label="Checkout"
                onClick={checkout}/>
    </div>
</Modal>

<style lang="scss">
  .donate-modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
    padding: 3.5rem var(--spacing-l) 2.25rem;

    h2 {
      text-align: center;
    }

    .yellow-underline {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        width: calc(100% + 0.2rem);
        height: 0.425rem;
        background-color: var(--golden-shine);
        bottom: 0.175rem;
        left: -0.1rem;
        z-index: -1;
      }
    }
  }

  .euro-label {
    padding: 0.35rem var(--spacing-s);
    border-radius: 1rem;
    background-color: var(--background-color);
    outline: 1px solid var(--outline-color);
    display: flex;

    .label {
      font-size: var(--text-smallest);
      color: var(--label-color);
      font-weight: 500;
      line-height: 1;
    }
  }

  .checkbox-setting-row {
    width: calc(100% + 1rem);
    cursor: pointer;
    padding: 0.62rem 0.5rem;
    margin: 0 -0.5rem;
    display: flex;
    align-items: center;
    border-radius: 2rem;
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