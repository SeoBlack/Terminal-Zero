import {Icons} from "./icons.js";

export function updateStatusUI(player){
            /** Update the UI with the current game state. */
            console.log("PLAYER NOW",player);
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
              console.log("ITEM",item);
        const quantity = player.inventory.items[item];
              if (quantity <= 0) {
                    return; // Skip if quantity is 0 or less

              }
                const inventoryItem = document.createElement('button');
                inventoryItem.className = "inventory-item";
                if(item === "weapon"){
                    inventoryItem.disabled= true;
                }
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
    console.log("PLAYER PASSED",player);
    updateStatusUI(player);
    updateInventoryUI(player);
}

export function createEndResultTable(endResults) {
    const table = document.getElementById("players-table-body");
    table.innerHTML = endResults.map(result => `
        <tr>
            <td>${result.player_name}</td>
            <td>${result.time_elapsed}</td>
            <td>${result.has_won ? 'winner' : 'loser'}</td>
        </tr>`).join('');
}