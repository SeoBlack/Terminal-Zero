import {Icons} from "./icons.js";
import {getCurrentUser} from "./localstorage.js";

export function updateStatusUI(player){
            /** Update the UI with the current game state. */
            const zombieActivity = getZombieActivity(player);
        document.querySelector('#player-name').innerText = player.name;
        document.querySelector('#player-health-number').innerText = `${player.health >= 0 ? player.health : 0}%`;
        document.querySelector('#player-health-bar').style.width = `${player.health}%`;
        document.querySelector('#player-fuel-number').innerText = `${player.fuel}%`;
        document.querySelector('#player-fuel-bar').style.width = `${player.fuel / 5}%`;
        document.querySelector('#player-location').innerText = `${player.location.name}, ${player.location.country}`;
        document.querySelector('#status-panel-location').innerHTML = player.location.name;
        document.querySelector('#status-panel-zombie').innerHTML = ` ${zombieActivity.text}`
    document.querySelector('#status-panel-zombie').style.color = `${zombieActivity.color}`
        if(player.location.weather){
            document.querySelector('#status-panel-visibility').innerHTML = ` ${getCelcius(player.location.weather.main.temp)}°C`;
            document.querySelector('#status-panel-wind').innerHTML = ` ${getCelcius(player.location.weather.wind.speed)} m/s`;

        }
}

function getZombieActivity(player){
    /** Get the zombie activity level based on the player's location. */
    const dangerLevel = player.location.dangerLevel;
    switch (dangerLevel) {
        case 1:
            return {
                color: "#75767A",
                text: '💀 Low Zombie Activity'
            };
        case 2:
            return {
                color: "#efb302",
                text: '💀 Medium Zombie Activity'
            }
        case 3:
            return {
            color:"#CE5F60",
            text: '💀 High Zombie Activity'
        }
    }
}


function getCelcius(temp){
//     convert from kelvin to celsius
    return Math.round(temp - 273.15);
}

export function updateInventoryUI(player){

    const inventoryContainer = document.getElementById('inventory');
    inventoryContainer.innerHTML = ''; // Clear previous items
          Object.keys(player.inventory?.items || {}).forEach(item => {
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
    updateStatusUI(player);
    updateInventoryUI(player);
}

export function createEndResultTable(endResults) {
    const table = document.getElementById("players-table-body");
    const playerName  = getCurrentUser()

    table.innerHTML = endResults.map(result => `
        <tr >
            <td style="color:${result.player_name === playerName ? "#efb302" : "#FFFFFF"};">${result.player_name}</td>
            <td style="color:${result.player_name === playerName ? "#efb302" : "#FFFFFF"};">${result.time_elapsed}</td>
            <td style="color:${result.player_name === playerName ? "#efb302" : "#FFFFFF"};">${result.has_won ? 'winner' : 'loser'}</td>
        </tr>`).join('');
}