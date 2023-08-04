<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let title: string;
    export let content: string;
    export let show: boolean = true;

    let dialog: HTMLDialogElement;

    $: if (dialog && show) {
        dialog.showModal();
    } else if (dialog) {
        dialog.close();
    }

    const dispatch = createEventDispatcher();

    function dispatchConfirm() {
        show = false;
        dispatch("confirm");
    }

    function dispatchCancel() {
        show = false;
        dispatch("cancel");
    }
</script>

<dialog bind:this={dialog} on:close={() => (show = false)}>
    <h1>{title}</h1>
    <p>{content}</p>
    <button on:click={dispatchConfirm}>Ja</button>
    <button on:click={dispatchCancel}>Nej</button>
</dialog>

<style>
    dialog {
        top: 0;
        z-index: 100;
        border-radius: 0.2em;
        border: none;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }

    dialog[open] {
        animation: zoom 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    dialog[open]::backdrop {
        animation: fade 150ms ease-out;
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    button {
        padding: 0.4em 0.8em;
    }
</style>
