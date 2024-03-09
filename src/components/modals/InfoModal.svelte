<script lang="ts">
    import Modal from "$components/layout/Modal.svelte"
    import {InfoModalEnum} from "$type/infoModalEnum"

    export let modalType: InfoModalEnum | undefined
    export let onClose: () => void

    const getTitle = (modalType: InfoModalEnum) => {
        switch (modalType) {
            case InfoModalEnum.CONTACT:
                return "Contact"
            case InfoModalEnum.GENERAL_TERMS:
                return "General Terms"
            case InfoModalEnum.IMPRINT:
                return "Imprint"
        }
    }
</script>

<Modal width="35rem" height="43rem" shown="{modalType !== undefined}" onClose="{onClose}">
    <div class="donate-modal-container">
        <h2>{getTitle(modalType)}</h2>
    </div>
</Modal>

<style lang="scss">
  .donate-modal-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
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