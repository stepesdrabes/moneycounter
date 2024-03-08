<script lang="ts">
    import Spacer from "$components/Spacer.svelte"
    import Button from "$components/Button.svelte"
    import LineDivider from "$components/LineDivider.svelte"

    let progress = 25
</script>

<div class="counter-container">
    <h1 class="counter">5 000 €</h1>

    <Spacer value="var(--spacing-m)"/>

    <div class="progress-bar">
        <div class="progress" style="width: {progress}%"></div>
    </div>

    <Spacer value="var(--spacing-l)"/>

    <Button width="min-content" height="2.5rem" label="Donate" href="/"/>

    <Spacer value="var(--spacing-l)"/>
    <LineDivider value="5rem"/>
    <Spacer value="var(--spacing-l)"/>

    <h3>Last Donator</h3>
    <Spacer value="var(--spacing-ms)"/>

    <div class="last-donator-container">
        <span class="flag">🇩🇪</span>
        <div class="point-divider"></div>
        <p class="name">Max Mustermann</p>
        <div class="point-divider"></div>
        <p class="amount">10€</p>
        <div class="point-divider"></div>
        <span class="date">9 mins ago</span>
    </div>
</div>

<style lang="scss">
  .counter-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
      font-weight: 500;
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
</style>
