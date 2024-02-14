// Import functions from other modules to handle storage, UI updates, and group logic.
import { loadNames, saveNames } from './storage.js';
import { renderNames, displayGroups } from './ui.js';
import { generateGroups } from './groupLogic.js';

// Load the initial list of names from local storage.
let names = loadNames();

// Defines a function to add a new name to the list.
const addName = () => {
    // Get the text input element and its current value, trimmed to remove any leading/trailing whitespace.
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    // If the input is not empty, add the name to the list, save the updated list to local storage, and re-render the list in the UI.
    if (name) {
        names.push(name); // Add the new name to the names array.
        saveNames(names); // Save the updated names array to local storage.
        renderNames(names, deleteName); // Update the UI to reflect the new list of names.
    }

    // Clear the input field after adding the name to the list.
    nameInput.value = "";
};

// Defines a function to delete a name from the list based on its index.
const deleteName = (index) => {
    // Remove the name at the specified index from the names array.
    names.splice(index, 1);

    // Save the updated names array to local storage and re-render the list in the UI.
    saveNames(names); // Update local storage with the new list of names.
    renderNames(names, deleteName); // Refresh the displayed list of names in the UI.
};

// Attach an event listener to the "Add Name" button to call addName when clicked.
document.getElementById('addNameBtn').addEventListener('click', addName);

// Attach an event listener to the "Generate Groups" button.
document.getElementById('generateGroupsBtn').addEventListener('click', () => {
    // Read the desired number of people per group from the slider input.
    const peoplePerGroup = parseInt(document.getElementById('peoplePerGroupSlider').value, 10);

    // Generate groups based on the current list of names and the specified group size.
    const groups = generateGroups(names, peoplePerGroup);

    // Display the generated groups in the UI.
    displayGroups(groups);
});

// Initially render the list of names from local storage when the page loads.
renderNames(names, deleteName);
