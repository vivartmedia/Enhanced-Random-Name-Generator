/**
 * Loads the list of names from localStorage.
 * 
 * This function checks if there is a stored list of names (under the key 'namesList')
 * in the browser's localStorage. If a list exists, it parses the JSON string back into
 * an array of names and returns it. If there is no stored list, it returns an empty array.
 * 
 * @returns {Array<string>} An array of names loaded from localStorage, or an empty array if none exists.
 */
export const loadNames = () => {
    // Attempt to retrieve the stored list of names by its key ('namesList')
    const storedNames = localStorage.getItem('namesList');
    // If 'storedNames' is not null (meaning something was retrieved),
    // parse the JSON string back into an array and return it.
    // Otherwise, return an empty array.
    return storedNames ? JSON.parse(storedNames) : [];
};

/**
 * Saves the given list of names to localStorage.
 * 
 * This function takes an array of names and serializes it into a JSON string.
 * It then stores this string in the browser's localStorage under the key 'namesList'.
 * This allows the list of names to be persisted across page reloads and browser sessions.
 * 
 * @param {Array<string>} names - The list of names to save to localStorage.
 */
export const saveNames = (names) => {
    // Serialize the 'names' array into a JSON string and store it in localStorage
    // under the key 'namesList'.
    localStorage.setItem('namesList', JSON.stringify(names));
};
