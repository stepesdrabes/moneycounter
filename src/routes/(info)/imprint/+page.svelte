<script lang="ts">
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
    import Spacer from "$components/layout/Spacer.svelte"
    import LineDivider from "$components/layout/LineDivider.svelte"
</script>

<svelte:head>
    <title>Imprint</title>
</svelte:head>

<CenteredPageContainer>
    <section class="imprint-section">
        <h1>Imprint</h1>
        <Spacer value="var(--spacing-m)"/>
        <LineDivider/>
        <Spacer value="var(--spacing-xl)"/>
    </section>
</CenteredPageContainer>

<style lang="scss">
  .imprint-section {
    max-width: 95%;
    width: 40rem;
    display: flex;
    flex-direction: column;
  }
</style>