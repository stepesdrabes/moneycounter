<script lang="ts">
    import CenteredPageContainer from "$components/layout/CenteredPageContainer.svelte"
    import IconInputField from "$components/inputs/IconInputField.svelte"
    import InputTextArea from "$components/inputs/InputTextArea.svelte"
    import Button from "$components/inputs/Button.svelte"
    import Spacer from "$components/layout/Spacer.svelte"
    import LineDivider from "$components/layout/LineDivider.svelte"
    import LabelText from "$components/misc/LabelText.svelte"
</script>

<svelte:head>
    <title>Contact</title>
</svelte:head>

<CenteredPageContainer>
    <section class="contact-section">
        <h1>Contact</h1>
        <Spacer value="var(--spacing-m)"/>
        <LineDivider/>
        <Spacer value="var(--spacing-xl)"/>

        <LabelText text="You will receive an answer as soon as possible to the E-mail address you provide."/>
        <Spacer value="var(--spacing-s)"/>
        <IconInputField icon="at" placeholder="E-Mail" onValueChange="{(value) => {}}"/>
        <Spacer value="var(--spacing-l)"/>

        <LabelText text="What's your message?"/>
        <Spacer value="var(--spacing-s)"/>
        <InputTextArea height="12.5rem" padding="0.75rem 1rem" placeholder="Message" onValueChange="{(value) => {}}"/>
        <Spacer value="var(--spacing-xl)"/>

        <Button width="15rem" label="Send ticket" onClick="{() => {}}" icon="paper-plane"/>
    </section>
</CenteredPageContainer>

<style lang="scss">
  .contact-section {
    max-width: 95%;
    width: 40rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      width: 100%;
    }
  }
</style>