<script lang="ts">
    import { scorecardStore } from "../stores/scorecardStore";

    export let guess = 0;
    export let correct = 0;

    $: guess = inputValidation(guess);
    $: correct = inputValidation(correct);

    function saveScorecardRow() {
        scorecardStore.add({ guess, correct });
        guess = 0;
        correct = 0;
    }

    function inputValidation(n: number) {
        if (n === null) return 0;
        if (n < 0) return 0;
        if (n > 100) return 100;
        if (Number.isInteger(n)) return n - (n % 1);
        return n;
    }

    function selectAllText(e) {
        e.target.select();
    }
</script>

<div id="input-groups">
    <span>
        <label for="guess">Ditt svar</label>
        <input bind:value={guess} on:click={selectAllText} id="guess" type="number" min="0" max="100" step="1" />
    </span>

    <span>
        <label for="correct">Rätt svar</label>
        <input bind:value={correct} on:click={selectAllText} id="correct" type="number" min="0" max="100" step="1" />
    </span>
</div>

<div>
    <button on:click={saveScorecardRow}>Spara</button>
</div>

<style>
    label {
        display: block;
    }

    span {
        display: inline-block;
    }

    button {
        border: none;
        border-radius: 3px;
        padding: 0.4em 1em 0.6em;
    }

    #input-groups {
        display: flex;
        justify-content: space-around;
        width: 19em;
        margin: 0 auto;
    }
</style>
