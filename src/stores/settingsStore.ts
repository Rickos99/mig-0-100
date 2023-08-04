import { get, writable } from "svelte/store";
import { loadFromLocalStorage, saveToLocalStorage } from "./localstorage";

export type Settings = { infinityModeEnabled: boolean };

const SETTINGS_KEY = "0-100_settings";
const DEFAULT_SETTINGS: Settings = { infinityModeEnabled: false };

function loadSettingsFromLocalStorageOrGetDefaultValue(): Settings {
    const settings = loadFromLocalStorage<Settings>(SETTINGS_KEY);
    return settings || DEFAULT_SETTINGS;
}

function createSettingsStore() {
    const initialValue = loadSettingsFromLocalStorageOrGetDefaultValue();
    const { subscribe, set } = writable(initialValue);

    return {
        subscribe,
        set: (n: Settings) => {
            saveToLocalStorage(SETTINGS_KEY, n);
            set(n);
        },
        update: cb => {
            const updatedStore = cb(get(settingsStore));
            saveToLocalStorage(SETTINGS_KEY, updatedStore);
            set(updatedStore);
        },
    };
}

export const settingsStore = createSettingsStore();
