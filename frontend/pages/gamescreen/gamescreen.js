import Game from "../../js/game/game.js";
import {animateSpawn} from "../../js/components/animations.js";
import {showSnackbar} from "../../js/components/snackbar.js";

async function startGame(){
    /** Initialize the game. */

    try{


    const game = new Game("sorin");
    await game.initiateGame()

    animateSpawn()
    document.getElementById('player-profile').style.color = game.player.color
    document.querySelector('#scan-button').addEventListener('click', function() {
        handleScanButtonClick(game)
})
    document.querySelector('#explore-button').addEventListener('click', function() {
        game.handleExploreLocation()
    })
    }
    catch (error) {
        console.error("Error starting the game:", error);
        showSnackbar(snackbarType.ERROR, "Failed to start the game. Please try again.");
    }





}


document.addEventListener("DOMContentLoaded", startGame);




async function handleScanButtonClick(game) {
    await game.scanAirports()
    console.log(game.player.airportsInRange)
}

