/**
 * Load a saved object from localstorage
 * @param {string} key Name of localstorage entry to load
 * @returns {Object} The object that was found with the specified key, otherwise null
 */
export function loadFromLocalStorage<T>(key: string): T | null {
    const storageData = localStorage.getItem(key);
    return JSON.parse(storageData) as T;
}

/**
 * Save an object to localstorage
 * @param {object} obj Object to save
 */
export function saveToLocalStorage(key: string, obj: object) {
    const objAsJson = JSON.stringify(obj);
    localStorage.setItem(key, objAsJson);
}
