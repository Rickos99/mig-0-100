import { writable } from "svelte/store";
import { loadFromLocalStorage, saveToLocalStorage } from "./localstorage";

export type ScorecardRow = { guess: number; correct: number };

const SCORECARD_KEY = "0-100_current_scorecard";
const DEFAULT_SCORECARD: ScorecardRow[] = [];

function loadScorecardFromLocalStorageOrGetDefaultValue(): ScorecardRow[] {
    const scorecard = loadFromLocalStorage<ScorecardRow[]>(SCORECARD_KEY);
    return scorecard || DEFAULT_SCORECARD;
}

function createScorecardStore() {
    const initialValue = loadScorecardFromLocalStorageOrGetDefaultValue();
    const { subscribe, set, update } = writable(initialValue);

    return {
        subscribe,
        add: (row: ScorecardRow) =>
            update(n => {
                const updatedValue = [...n, row];
                saveToLocalStorage(SCORECARD_KEY, updatedValue);
                return updatedValue;
            }),
        undo: () =>
            update(n => {
                const updatedValue = n.slice(0, -1);
                saveToLocalStorage(SCORECARD_KEY, updatedValue);
                return updatedValue;
            }),
        reset: () => {
            saveToLocalStorage(SCORECARD_KEY, DEFAULT_SCORECARD);
            set(DEFAULT_SCORECARD);
        },
    };
}

export const scorecardStore = createScorecardStore();
