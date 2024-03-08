<script lang="ts">
    import Spacer from "$components/layout/Spacer.svelte"
    import Button from "$components/inputs/Button.svelte"
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
</script>

<CenteredPageContainer>
    <h1>Donation has been cancelled</h1>
    <Spacer value="var(--spacing-s)"/>
    <Button height="2.75rem" width="min-content" label="Back to home" href="/" icon="arrow-left"/>
</CenteredPageContainer>