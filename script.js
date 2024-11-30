// Get DOM elements
const itemNameInput = document.getElementById('itemName');
const itemQuantityInput = document.getElementById('itemQuantity');
const addItemButton = document.getElementById('addItemButton');
const updateItemButton = document.getElementById('updateItemButton');
const inventoryList = document.getElementById('inventoryList');

// Load inventory data from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Function to render the inventory list
function renderInventory() {
    inventoryList.innerHTML = '';
    inventory.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('inventory-item');
        itemDiv.innerHTML = `
            <span>${item.name} - Quantity: ${item.quantity}</span>
            <div>
                <button onclick="deleteItem(${index})">Delete</button>
            </div>
        `;
        inventoryList.appendChild(itemDiv);
    });
}

// Function to add an item
function addItem() {
    const name = itemNameInput.value.trim();
    const quantity = parseInt(itemQuantityInput.value.trim(), 10);

    if (name && quantity > 0) {
        inventory.push({ name, quantity });
        localStorage.setItem('inventory', JSON.stringify(inventory));
        renderInventory();
        itemNameInput.value = '';
        itemQuantityInput.value = '';
    } else {
        alert('Please provide valid item details.');
    }
}

// Function to update an item
function updateItem() {
    const name = itemNameInput.value.trim();
    const quantity = parseInt(itemQuantityInput.value.trim(), 10);

    if (name && quantity > 0) {
        const itemIndex = inventory.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            inventory[itemIndex].quantity = quantity;
            localStorage.setItem('inventory', JSON.stringify(inventory));
            renderInventory();
            itemNameInput.value = '';
            itemQuantityInput.value = '';
        } else {
            alert('Item not found. Add it first if needed.');
        }
    } else {
        alert('Please provide valid item details.');
    }
}

// Function to delete an item
function deleteItem(index) {
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    renderInventory();
}

// Event listeners
addItemButton.addEventListener('click', addItem);
updateItemButton.addEventListener('click', updateItem);

// Initial render
renderInventory();
