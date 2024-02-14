/**
 * Shuffles an array in place using the Fisher-Yates shuffle algorithm.
 * This method ensures each permutation of the array is equally likely.
 *
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 */
export const shuffleArray = (array) => {
    // Loop backwards through the array
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at indices i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/**
 * Generates groups from a list of names, based on the specified number of people per group.
 * If the last group ends up with only one member, that member is merged into the previous group
 * to avoid leaving anyone out.
 *
 * @param {Array<string>} names - The list of names to divide into groups.
 * @param {number} peoplePerGroup - The maximum number of people per group.
 * @returns {Array<Array<string>>} - An array of groups, each being an array of names.
 */
export const generateGroups = (names, peoplePerGroup) => {
    // Shuffle the names to randomize group assignment
    const shuffledNames = shuffleArray([...names]);
    // Initialize an empty array to hold the groups
    const groups = [];

    // Continue splitting off groups from the shuffled names until none remain
    while (shuffledNames.length > 0) {
        // Take the first 'peoplePerGroup' names from 'shuffledNames' to form a new group
        groups.push(shuffledNames.splice(0, peoplePerGroup));
    }

    // If the last group has only one member and there's more than one group,
    // merge that member into the previous group to avoid isolation
    if (groups.length > 1 && groups[groups.length - 1].length === 1) {
        // Remove the last group (with only one member)
        const lastGroup = groups.pop();
        // Merge the last member into the previous group
        groups[groups.length - 1].push(...lastGroup);
    }

    // Return the array of groups
    return groups;
};
