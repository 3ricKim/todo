const btn = document.querySelector("button");
const input = document.getElementById('input');
const dropdowns = document.querySelectorAll('.dropdown');

let itemList = []
let clickedPriority;
let clickedCategory;

btn.addEventListener("click", () => {
    toggleDiv(input);
    dropdowns.forEach(dropdown => toggleDiv(dropdown));
    if (input.value != "") {
        const newItem = createNewItem(input.value, clickedPriority, clickedCategory);
        sortPriorities(itemList, newItem);
        showItems(itemList);
    }
});
dropdowns.forEach(dropdown => {
    dropdown.addEventListener("click", (event) => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (event.target.tagName === 'P') {            
            let clickedValue = event.target.textContent;
            if (dropdownContent.classList.contains('priority')) {
                clickedPriority = clickedValue; // Update clickedPriority if priority dropdown is clicked
            } else if (dropdownContent.classList.contains('category')) {
                clickedCategory = clickedValue; // Update clickedCategory if category dropdown is clicked
            }
        }
    })
})

function createNewItem(content, priority, category) {
    const newItem = new Item(content, priority, category);
    input.value = "";
    console.log(itemList)
    return newItem;
}

function sortPriorities(list, toAdd) {
    if (toAdd.priority === "High") {
        list.unshift(toAdd);
    } else {
        if (toAdd.priority === "Medium") {
            let inserted = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i].priority === "Low") {
                    console.log(i)
                    list.splice(i, 0, toAdd);
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                list.push(toAdd);
            }
        }
        if (toAdd.priority === "Low") {
            list.push(toAdd);
        }
    }
}

function toggleDiv(elem) {
    if (elem.style.display === "none" || elem.style.display === "") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}

function showItems(list) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    list.forEach(generateDiv)
}

function generateDiv(elem) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(`Content: ${elem.content}, Priority: ${elem.priority}, Category: ${elem.category}`);
    newDiv.appendChild(newContent);
    newDiv.style.textDecoration = "underline";
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.appendChild(newDiv);
}

class Item {
    constructor(content, priority, category) {
        this.content = content;
        this.priority = priority;
        this.category = category;
    }
}