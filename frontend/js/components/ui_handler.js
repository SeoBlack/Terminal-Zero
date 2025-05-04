import {Icons} from "./icons.js";

export function updateStatusUI(player){
            /** Update the UI with the current game state. */
        document.querySelector('#player-name').innerText = player.name;
        document.querySelector('#player-health-number').innerText = `${player.health}%`;
        document.querySelector('#player-health-bar').style.width = `${player.health}%`;
        document.querySelector('#player-fuel-number').innerText = `${player.fuel}%`;
        document.querySelector('#player-fuel-bar').style.width = `${player.fuel / 5}%`;
        document.querySelector('#player-location').innerText = `${player.location.name}, ${player.location.country}`;
}


export function updateInventoryUI(player){
    console.log("Player",player);

    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = ''; // Clear previous items
          Object.keys(player.inventory?.items || {}).forEach(item => {
        const quantity = player.inventory.items[item];
        console.log(item);
                    // <button className="inventory-item">
            //     <span>🍗</span>
            //     <p className="inventory-item-title">Food</p>
            //     <p className="inventory-item-quantity">x2</p>
            // </button>
                const inventoryItem = document.createElement('button');
                inventoryItem.className = "inventory-item";
                inventoryItem.innerHTML = `
                    <span>${Icons[`${item}`]}</span>
                    <p class="inventory-item-title">${item}</p>
                    <p class="inventory-item-quantity">x${quantity}</p>
                `;
                inventoryItem.addEventListener('click', function() {
                    player.inventory.useItem(item, player);
                    // updateInventoryUI(player.inventory);
                });
                inventoryContainer.appendChild(inventoryItem);
           })
}


export function updateUI(player){
    /** Update the UI with the current game state. */
    updateStatusUI(player);
    updateInventoryUI(player);
}