/**
 * Renders the list of names to the UI, each with a delete button.
 * 
 * @param {Array<string>} names - The list of names to display.
 * @param {Function} onDelete - The function to call when a delete button is clicked, which should handle removing the name.
 */
export const renderNames = (names, onDelete) => {
    // Find the HTML element where names should be displayed
    const listElement = document.getElementById('nameList');
    // Clear any existing content in the list element
    listElement.innerHTML = '';

    // Iterate over each name in the provided list
    names.forEach((name, index) => {
        // Create a container for each name
        const nameContainer = document.createElement('div');
        nameContainer.className = 'bg-gray-700 flex justify-between items-center bg-gray-300 rounded-sm p-2 m-2';

        // Create an element for the name text
        const nameElement = document.createElement('div');
        nameElement.textContent = name; // Set the text content to the name
        nameElement.className = "text-lg"; // Apply styling

        // Create a delete button for removing the name
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X'; // Set button text
        deleteBtn.className = 'bg-red-500 text-white px-2 rounded-sm hover:bg-red-700'; // Apply styling
        deleteBtn.onclick = () => onDelete(index); // Set up the click event handler to call onDelete with the name's index

        // Add the name text and delete button to the container
        nameContainer.appendChild(nameElement);
        nameContainer.appendChild(deleteBtn);

        // Add the container to the list element in the UI
        listElement.appendChild(nameContainer);
    });
};

/**
 * Displays groups of names on the UI, each group with a header indicating its number.
 * 
 * @param {Array<Array<string>>} groups - An array of groups, each an array of names.
 */
export const displayGroups = (groups) => {
    // Find the HTML element where groups should be displayed
    const groupList = document.getElementById('groupList');
    // Clear any existing content in the groups list
    groupList.innerHTML = '';

    // Iterate over each group
    groups.forEach((group, index) => {
        // Create a container for the group
        const groupElement = document.createElement('div');
        groupElement.className = 'group bg-gray-700 rounded-sm p-2 m-2 text-lg';

        // Create a header for the group, indicating its number
        const title = document.createElement('h3');
        title.textContent = `Group ${index + 1}`; // e.g., "Group 1"
        title.className = 'font-bold'; // Apply styling
        groupElement.appendChild(title);

        // Add each name in the group to the container
        group.forEach(name => {
            const nameElement = document.createElement('p');
            nameElement.textContent = name; // Set the text content to the name
            groupElement.appendChild(nameElement); // Add the name element to the group container
        });

        // Add the fully assembled group container to the groups list in the UI
        groupList.appendChild(groupElement);
    });
};
