// Imports functions for interacting with localStorage; however, these specific imports are not used in the provided code.

let names = loadNames(); // Loads the existing names from localStorage when the script runs.

// Saves the current list of names to localStorage and updates the UI to reflect these changes.
function saveNames() {
    localStorage.setItem('namesList', JSON.stringify(names)); // Converts the names array into a string and stores it in localStorage.
    renderNames(); // Calls renderNames to update the list of names displayed on the page.
}

// Adds a new name to the list when a user submits the form.
function addName() {
    const nameInput = document.getElementById('nameInput'); // Gets the input element where users type new names.
    const name = nameInput.value.trim(); // Trims whitespace from the input value to clean up the name.
    if (name) { // Checks if the name is not empty after trimming.
        names.push(name); // Adds the trimmed name to the names array.
        saveNames(); // Saves the updated names array to localStorage and updates the UI.
    }
    nameInput.value = ""; // Clears the input field after adding the name.
}

// Loads the list of names from localStorage.
function loadNames() {
    const storedNames = localStorage.getItem('namesList'); // Retrieves the names list as a string from localStorage.
    return storedNames ? JSON.parse(storedNames) : []; // Parses the string back into an array, or returns an empty array if nothing was found.
}

// Renders the list of names to the webpage.
function renderNames() {
    const listElement = document.getElementById('nameList'); // Finds the container element where names should be displayed.
    listElement.innerHTML = ''; // Clears the container of any existing names to prepare for re-rendering.
    names.forEach((name, index) => {
        // For each name, creates a new container div and sets up its appearance and behavior.
        const nameContainer = document.createElement('div');
        nameContainer.className = 'bg-gray-700 flex justify-between items-center bg-gray-300 rounded-sm p-2 m-2';

        const nameElement = document.createElement('div'); // Creates a new div for displaying the name text.
        nameElement.textContent = name; // Sets the text of the div to the current name.
        nameElement.className = "text-lg"; // Applies styling to make the text larger.

        const deleteBtn = document.createElement('button'); // Creates a new button for deleting the name.
        deleteBtn.textContent = 'X'; // Sets the button text to 'X'.
        deleteBtn.className = 'bg-red-500 text-white px-2 rounded-sm hover:bg-red-700'; // Applies styling to the button.
        deleteBtn.onclick = function () { // Sets up an onclick event to delete the name when the button is clicked.
            deleteName(index);
        };

        nameContainer.appendChild(nameElement); // Adds the name div to the container.
        nameContainer.appendChild(deleteBtn); // Adds the delete button to the container.

        listElement.appendChild(nameContainer); // Adds the entire container to the list element in the webpage.
    });
}

// Deletes a name from the list.
function deleteName(index) {
    names.splice(index, 1); // Removes the name at the specified index from the names array.
    saveNames(); // Saves the updated names array to localStorage and updates the UI.
}

// Automatically calls renderNames to initially display the names when the page loads.
renderNames();

// Updates the maximum value and current value of the slider based on the total number of names.
function updateSliderMax() {
    const totalNames = names.length; // Counts the total number of names.
    const slider = document.getElementById('peoplePerGroupSlider'); // Finds the slider element.

    const maxGroupSize = Math.floor(totalNames / 2); // Calculates the maximum possible group size.

    slider.max = Math.max(2, maxGroupSize); // Sets the maximum value of the slider, ensuring it's at least 2.
    slider.value = Math.min(slider.value, slider.max); // Adjusts the current value of the slider if necessary.

    document.getElementById('sliderValue').textContent = slider.value; // Updates the displayed value of the slider.
}

// Sets up an event listener to update the displayed slider value as the slider moves.
function updateSliderValueDisplay() {
    const slider = document.getElementById('peoplePerGroupSlider'); // Finds the slider element again.
    slider.oninput = function () { // Adds an oninput event listener to the slider.
        document.getElementById('sliderValue').textContent = this.value; // Updates the displayed value as the slider moves.
    };
}

// Initializes the slider display settings when the page loads.
updateSliderMax(); // Calls updateSliderMax to set the initial slider values.
updateSliderValueDisplay(); // Sets up the slider to update its displayed value dynamically.

// Generates groups of names based on the current slider setting.
function generateGroups() {
    const peoplePerGroup = parseInt(document.getElementById('peoplePerGroupSlider').value, 10); // Reads the desired number of people per group from the slider.
    const shuffledNames = shuffleArray([...names]); // Makes a shuffled copy of the names list for random group assignment.
    const groups = []; // Initializes an array to hold the generated groups.

    while (shuffledNames.length > 0) { // Continues to create groups until all names have been assigned.
        groups.push(shuffledNames.splice(0, peoplePerGroup)); // Assigns a group of names up to the specified group size.
    }

    if (groups.length > 1 && groups[groups.length - 1].length === 1) { // Checks if the last group has only one member.
        const lastGroup = groups.pop(); // Removes the last group.
        groups[groups.length - 1].push(...lastGroup); // Merges the last member with the previous group.
    }

    displayGroups(groups); // Displays the generated groups on the webpage.
}

// Shuffles an array of names for random group assignment.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { // Loops backwards through the array.
        const j = Math.floor(Math.random() * (i + 1)); // Picks a random index to swap with.
        [array[i], array[j]] = [array[j], array[i]]; // Swaps the current element with the randomly chosen one.
    }
    return array; // Returns the shuffled array.
}

// Displays the generated groups on the webpage.
function displayGroups(groups) {
    const groupList = document.getElementById('groupList'); // Finds the container for displaying groups.
    groupList.innerHTML = ''; // Clears any existing group displays.

    groups.forEach((group, index) => { // For each group, creates a container and lists the group members.
        const groupElement = document.createElement('div');
        groupElement.className = 'group bg-gray-700 rounded-sm p-2 m-2 text-lg'; // Applies styling to the group container.

        const title = document.createElement('h3'); // Creates a header for the group number.
        title.textContent = `Group ${index + 1}`; // Sets the group number.
        title.className = 'font-bold'; // Applies bold styling to the header.

        groupElement.appendChild(title); // Adds the header to the group container.

        group.forEach(name => { // For each name in the group, creates a paragraph element.
            const nameElement = document.createElement('p');
            nameElement.textContent = name; // Sets the text content to the name.
            groupElement.appendChild(nameElement); // Adds the name paragraph to the group container.
        });

        groupList.appendChild(groupElement); // Adds the complete group container to the webpage.
    });
}
