import Game from "../../js/game/game.js";

async function startGame(){
    /** Initialize the game. */
    const game = new Game("sorin");
    await game.initiateGame()


    document.getElementById('player-profile').style.color = game.player.color
    document.querySelector('#scan-button').addEventListener('click', function() {
        handleScanButtonClick(game)


})




}


document.addEventListener("DOMContentLoaded", startGame);




async function handleScanButtonClick(game) {
    await game.scanAirports()
    console.log(game.player.airportsInRange)
}

