<script lang="ts">
    import Question from "./Question.svelte";
    import { scorecardStore } from "../stores/scorecardStore";
    import { settingsStore } from "../stores/settingsStore";
    import Confirm from "./Confirm.svelte";

    export let numberOfRows = 0;
    export let totalSum = 0;

    let showMenu = false;
    let confirmReset = false;

    function reset_scorecard() {
        showMenu = false;
        scorecardStore.reset();
    }
</script>

<div id="menu-container" class:show={showMenu}>
    <div id="menu">
        <div id="menu-content">
            <div>
                Antal frågor
                <div id="slider">
                    <button
                        class:selected={!$settingsStore.infinityModeEnabled}
                        on:click={() => ($settingsStore.infinityModeEnabled = !$settingsStore.infinityModeEnabled)}
                        >21</button
                    >
                    <button
                        class:selected={$settingsStore.infinityModeEnabled}
                        on:click={() => ($settingsStore.infinityModeEnabled = !$settingsStore.infinityModeEnabled)}
                        >∞</button
                    >
                </div>
            </div>
            <div>
                <button on:click={() => (confirmReset = true)} class="action-button">
                    <span class=" button-icon material-symbols-outlined">restart_alt</span>
                    Börja om
                </button>
                <button on:click={scorecardStore.undo} class="action-button">
                    <span class="button-icon material-symbols-outlined">undo</span>
                    Ångra
                </button>
            </div>
        </div>
    </div>
    <div id="menu-overlay">
        {#if numberOfRows % 7 === 0 && numberOfRows >= 20 && !$settingsStore.infinityModeEnabled}
            <span id="sum-display-header">Totalsumma</span>
            <div id="sum-display-value">{totalSum}</div>
        {:else}
            <Question />
        {/if}
    </div>
    <button id="menu-toggle" class="button-icon material-symbols-outlined" on:click={() => (showMenu = !showMenu)}>
        {#if showMenu}
            close
        {:else}
            menu
        {/if}
    </button>
</div>

<Confirm
    on:confirm={reset_scorecard}
    bind:show={confirmReset}
    title={"Är du säker?"}
    content={"Om du börjar om kommer du att förlora alla dina svar."}
/>

<style>
    .action-button {
        margin: 2px 0;
        padding: 6px;
        display: block;
        background: none;
        color: white;
        border: 1px rgba(256, 256, 256, 0.4) solid;
        width: 100%;
        text-align: left;
    }

    .action-button:hover {
        background-color: #2fb3a1;
    }

    #menu-container {
        position: relative;
        height: 9em;
    }

    #menu-content {
        display: flex;
        justify-content: space-between;
        width: 14em;
        margin: 0 auto;
    }

    #slider {
        font-size: 0;
        margin-top: 0.3rem;
    }

    #slider > button {
        font-size: initial;
        width: 2.5rem;
        margin: 0;
        transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
        border: 0;
    }

    #slider > button:not(.selected) {
        background: darkgrey;
        color: white;
        box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
    }

    #menu-toggle {
        position: absolute;
        right: 1em;
        top: 0.3em;
        background: none;
        border: none;
        font-weight: bold;
        font-size: 1.3em;
        color: white;
    }

    #menu,
    #menu-overlay {
        position: absolute;
        padding: 10px 0;
        border-radius: 4em 0;
        width: 100%;
        height: inherit;
    }

    #menu {
        background: #119d8a;
        transition: border-radius 300ms ease-in-out;
    }

    #menu-overlay {
        background: #17d0b7;
        transition: transform 300ms ease-in-out, border-radius 300ms ease-in-out;
    }

    #menu-container.show > #menu-overlay {
        transform: translateY(7em);
        border-top-left-radius: 0;
    }

    #menu-container.show > #menu {
        border-bottom-right-radius: 0;
    }

    #sum-display-header {
        text-transform: uppercase;
        font-size: 2em;
        font-weight: 100;
    }

    #sum-display-value {
        font-size: 4em;
        font-weight: 100;
    }

    .button-icon {
        vertical-align: text-top;
        font-size: 1.2em;
    }
</style>
