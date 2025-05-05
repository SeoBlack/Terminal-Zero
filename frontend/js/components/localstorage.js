import {jsonifyGame} from "../game/game.js";

const entryName = "terminal_zero";

export function getAllGames() {
        /** Get all games from local storage. */
        const allGames = localStorage.getItem(entryName);
        if (allGames) {
            return JSON.parse(allGames );
        }
        return [];

    }



export function  saveCurrentGame(game) {
        const allGames = getAllGames();
        const stringifiedGame = jsonifyGame(game);
        //look for the game with the same username
        const existingGameIndex = allGames.findIndex(g => g.player.name === game.player.name);
        if (existingGameIndex !== -1) {
            // If the game already exists, update it
            allGames[existingGameIndex] = stringifiedGame;
        } else {
            // If the game doesn't exist, add it
            allGames.push(stringifiedGame);
        }
        localStorage.setItem(entryName, JSON.stringify(allGames));

    }
export function loadGame(username){
    /** Load a game from local storage. */
    const allGames = getAllGames();
    const game = allGames.find(game => game.player.name === username);
    if (game) {
        return game;
    }
    return null;
}
export function setCurrentUser(user){

    const authData = {
        currentUser: user,
    }

    sessionStorage.setItem(entryName, JSON.stringify(authData));
}

export function getCurrentUser(){
    const authData = sessionStorage.getItem(entryName);
    if (authData) {
        return JSON.parse(authData).currentUser;
    }
    return null;
}