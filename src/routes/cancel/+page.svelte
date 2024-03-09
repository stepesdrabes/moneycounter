<script lang="ts">
    import Spacer from "$components/layout/Spacer.svelte"
    import Button from "$components/inputs/Button.svelte"
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
</script>

<CenteredPageContainer>
    <i class="fi fi-br-cross-circle"></i>
    <Spacer value="var(--spacing-ms)"/>
    <h1>Donation has been cancelled</h1>
    <Spacer value="var(--spacing-m)"/>
    <Button height="2.75rem" width="min-content" label="Back to home" href="/" icon="arrow-left"/>
</CenteredPageContainer>


<style lang="scss">
  i {
    font-size: 2rem;
    color: var(--danger-red);
    animation: 2s ease-in-out 0s infinite iconBounce;
  }
</style>