<script lang="ts">
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
    import Spacer from "$components/layout/Spacer.svelte"
    import LineDivider from "$components/layout/LineDivider.svelte"
</script>

<svelte:head>
    <title>General Terms</title>
</svelte:head>

<CenteredPageContainer>
    <section class="terms-section">
        <h1>General Terms</h1>
        <Spacer value="var(--spacing-m)"/>
        <LineDivider/>
        <Spacer value="var(--spacing-xl)"/>
    </section>
</CenteredPageContainer>

<style lang="scss">
  .terms-section {
    max-width: 95%;
    width: 40rem;
    display: flex;
    flex-direction: column;
  }
</style>