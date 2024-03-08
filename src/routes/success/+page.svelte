<script lang="ts">
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
    import Spacer from "$components/layout/Spacer.svelte"
    import Button from "$components/inputs/Button.svelte"
    import LabelText from "$components/misc/LabelText.svelte"
    import type {PageData} from './$types'

    export let data: PageData
</script>

<CenteredPageContainer>
    <i class="fi fi-br-check-circle"></i>
    <Spacer value="var(--spacing-ms)"/>
    <h1>Donation was successful</h1>
    <Spacer value="var(--spacing-s)"/>
    <LabelText text="Thank you, {data.donate.name}, for donating {data.donate.amount} EUR!" textAlign="center"/>
    <Spacer value="var(--spacing-ml)"/>
    <Button height="2.75rem" width="min-content" label="Back to home" href="/" icon="arrow-left"/>
</CenteredPageContainer>

<style lang="scss">
  i {
    font-size: 2rem;
    color: var(--okay-green);
    animation: 2s ease-in-out 0s infinite bounce;
  }

  @keyframes bounce {
    0%, 10%, 90%, 100% {
      transform: translateY(-0.25rem);
    }
    50% {
      transform: translateY(0);
    }
  }
</style>