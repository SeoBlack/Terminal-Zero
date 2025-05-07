import Game, {gamifyJson} from "../../js/game/game.js";
import {animateSpawn, animateWin} from "../../js/components/animations.js";
import {showSnackbar, snackbarType} from "../../js/components/snackbar.js";
import {getAllGames, getCurrentUser, loadGame} from "../../js/components/localstorage.js";
import Player from "../../js/game/player.js";
import {hideLoadingDialog, showLoadingDialog} from "../../js/components/loading.js";
// import Inventory from "../../js/game/inventory";
// import Airport from "../../js/game/airport";

async function startGame(){
    /** Initialize the game. */

    try{
        const loader = showLoadingDialog();
    const currentUser = getCurrentUser();

    if (!currentUser) {
        showSnackbar(snackbarType.ERROR, "No user found. Please log in.");
        window.location.href = `../startscreen/index.html`;
        return;
    }

    let userGame = loadGame(currentUser);
    let game = null;
    if (userGame && userGame.gameOver === false) {
        game = await gamifyJson(userGame);
        //check if the game is over every second
    }
    else{
        const player = new Player(null, currentUser);
        game = new Game(false, player);
        await game.initiateGame();
    }
    hideLoadingDialog(loader);
    animateSpawn()
    // automatic save every 1 seconds
    const saving = setInterval(function() {
      game.handleSave();
 }, 1000);



    document.getElementById('player-profile').style.color = game.player.color
    document.querySelector('#scan-button').addEventListener('click', function() {
        handleScanButtonClick(game)
})
    document.querySelector('#explore-button').addEventListener('click', function() {
        game.handleExploreLocation()

    })

        document.querySelector('#quit-button').addEventListener('click', function() {
            const loader = showLoadingDialog();
            showSnackbar(snackbarType.INFO, "Game saved");
              setTimeout(() => {

                  window.location.href = `../startscreen/index.html`;
              }, 2000)

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
}



