// import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localStorage.js";

let names = loadNames();

function saveNames(){
    localStorage.setItem('namesList', JSON.stringify(names));
    renderNames();
}

function addName(){

    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    if (name){
        names.push(name);
        saveNames();
    }
    nameInput.value = "";
}

function loadNames(){
    const storedNames = localStorage.getItem('namesList');
    return storedNames ? JSON.parse(storedNames) : [];
}

function renderNames(){
    const listElement = document.getElementById('nameList');
    listElement.innerHTML = '';// Clear existing list before re-rendering
    names.forEach((name, index) =>{//index parameter here
        const nameContainer =document.createElement('div');
        nameContainer.className= 'bg-gray-700 flex justify-between items-center bg-gray-300 rounded-sm p-2 m-2';
        
        const nameElement = document.createElement('div');
        nameElement.textContent = name;
         nameElement.className = "text-lg";

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'bg-red-500 text-white px-2 rounded-sm hover:bg-red-700';
        deleteBtn.onclick = function(){
            deleteName(index);
        }

        nameContainer.appendChild(nameElement);
        nameContainer.appendChild(deleteBtn);

        listElement.appendChild(nameContainer);
    });
}


function deleteName(index){
    names.splice(index, 1);
    saveNames();
}


renderNames();




function updateSliderMax(){
    const totalNames = names.length;
    const slider = document.getElementById('peoplePerGroupSlider');
    
    const maxGroupSize = Math.floor(totalNames / 2); // calculate maxGroupSize

    slider.max = Math.max(2, maxGroupSize);//Ensure the max is at least 2
    slider.value = Math.min(slider.value, slider.max); // adjust current value if needed

    //update displayed value
    document.getElementById('sliderValue').textContent = slider.value;

    // call this function whenever the list of names changes
    updateSliderValueDisplay();
}

function updateSliderValueDisplay(){
    const slider = document.getElementById('peoplePerGroupSlider');
    document.getElementById('sliderValue').textContent = slider.value;

    slider.oninput = function(){
        document.getElementById('sliderValue').textContent = this.value;
    };
}

//initialize slider display
updateSliderMax();//call this when the page loads and after adding/removing names

function generateGroups(){
    const peoplePerGroup = parseInt(document.getElementById('peoplePerGroupSlider').value, 10);
    const shuffledNames = shuffleArray([...names]) // make a shuffled copy of names
    const groups = [];

    while (shuffledNames.length > 0) {
        groups.push(shuffledNames.splice(0, peoplePerGroup));
    }

    //adjust the last two groups if the last group has only one member
    if (groups.length > 1 && groups[groups.length - 1].length ===1){
        const lastGroup = groups.pop();
        groups[groups.length - 1].push(...lastGroup);//move the single member to the second last group
   }

   displayGroups(groups);
}

function shuffleArray(array){
    for (let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j], array[i]];//swap elements
    }
    return array;
}

function displayGroups(groups){
    const groupList = document.getElementById('groupList');
    groupList.innerHTML = ''; //clear existing groups

    groups.forEach((group, index) =>{
        const groupElement = document.createElement('div');
        groupElement.className = 'group bg-gray-700 rounded-sm p-2 m-2 text-lg';
        const title =document.createElement('h3');
        title.textContent =`Group ${index + 1}`;
        title.className ='font-bold';
        groupElement.appendChild(title);

        group.forEach(name => {
            const nameElement = document.createElement('p');
            nameElement.textContent = name;
            groupElement.appendChild(nameElement);
        });
        groupList.appendChild(groupElement);
    });

}

