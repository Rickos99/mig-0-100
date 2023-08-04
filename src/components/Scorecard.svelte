<script lang="ts">
    import { fly, fade } from "svelte/transition";
    import { afterUpdate } from "svelte";
    import { ScorecardRow, scorecardStore } from "../stores/scorecardStore";
    import Menu from "./Menu.svelte";
    import { settingsStore } from "../stores/settingsStore";

    let sectionTable: HTMLElement;

    $: numberOfRows = $scorecardStore.length;
    $: totalSum = $scorecardStore.reduce(scoreSum, 0);

    function getRowScore(row: ScorecardRow) {
        const diff = Math.abs(row.guess - row.correct);
        return diff === 0 ? -10 : diff;
    }

    function scoreSum(previous: number, current: ScorecardRow) {
        const diff = Math.abs(current.guess - current.correct);
        if (diff === 0) {
            return previous - 10;
        }
        return previous + diff;
    }

    afterUpdate(() => {
        if (numberOfRows !== 0) sectionTable.scrollTo(0, sectionTable.scrollHeight);
    });
</script>

<main>
    <section id="section-table" bind:this={sectionTable}>
        <table>
            <thead>
                <tr>
                    <th />
                    <th>
                        <div>Ditt svar</div>
                        <div>0-100</div>
                    </th>
                    <th>Rätt svar</th>
                    <th>Diff poäng</th>
                </tr>
            </thead>
            <tbody>
                {#each $scorecardStore as row, i}
                    <tr transition:fly={{ x: -200, duration: 300 }}>
                        <td>{i + 1}</td>
                        <td>{row.guess}</td>
                        <td>{row.correct}</td>
                        <td>{getRowScore(row)}</td>
                    </tr>

                    {#if (i + 1) % 7 === 0}
                        <tr transition:fade={{ duration: 200 }} class="partial-sum">
                            <td colspan="3">Delsumma:</td>
                            <td>{$scorecardStore.slice(i - 6, i + 1).reduce(scoreSum, 0)}</td>
                        </tr>
                        {#if numberOfRows % 7 === 0 && numberOfRows >= 20 && numberOfRows - 1 == i && $settingsStore.infinityModeEnabled}
                            <tr in:fade={{ duration: 200 }} class="total-sum">
                                <td colspan="3">Totalsumma:</td>
                                <td>{totalSum}</td>
                            </tr>
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </table>
    </section>
    <section id="section-menu">
        <Menu {numberOfRows} {totalSum} />
    </section>
</main>

<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-height: 100%;
        overflow: hidden;
    }

    #section-table {
        scroll-behavior: smooth;
        overflow-y: auto;
        height: 100%;
    }

    #section-menu {
        position: sticky;
        color: white;
        bottom: 0;
    }

    table {
        width: 19em;
        border-spacing: 0;
        margin: 0 auto 2em;
    }

    th {
        position: sticky;
        top: 0;
        z-index: 10;
    }

    tr:nth-child(even),
    th {
        background: #dfdfdf;
    }

    th,
    td:first-child {
        padding: 0.2em 0.5em;
    }

    td:not(:last-child):not([colspan="3"]) {
        border-right: 0.1em dotted #000;
    }

    tr.partial-sum > td:last-child {
        border: 0.1em solid black;
    }

    tr.total-sum {
        background-color: rgb(23, 208, 183);
        color: white;
    }

    @media (min-width: 780px) {
        main {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            max-width: 800px;
            margin: 0 auto;
        }

        #section-table {
            flex: 1;
            margin: 1em 0;
            align-self: flex-start;
        }

        #section-menu {
            flex: 1;
            border-top: none;
            align-self: flex-start;
            top: 13em;
        }
    }
</style>
