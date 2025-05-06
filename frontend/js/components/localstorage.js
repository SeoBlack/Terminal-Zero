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
        const jsonifiedGame = jsonifyGame(game);
        //look for the game with the same username
        const existingGameIndex = allGames.findIndex(g => g.player.name === game.player.name);
        if (existingGameIndex !== -1) {
            // If the game already exists, update it
            allGames[existingGameIndex] = jsonifiedGame;
        } else {
            // If the game doesn't exist, add it
            allGames.push(jsonifiedGame);
        }
        try{
            localStorage.setItem(entryName, JSON.stringify(allGames));

        }
        catch (error) {
            console.error("Error saving game to local storage:", error);
        }

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
export function removeGame(username){
    /** Remove a game from local storage. */
    const allGames = getAllGames();
    const gameIndex = allGames.findIndex(game => game.player.name === username);
    if (gameIndex !== -1) {
        allGames.splice(gameIndex, 1);
        localStorage.setItem(entryName, JSON.stringify(allGames));
    }
}

export function getCurrentUser(){
    const authData = sessionStorage.getItem(entryName);
    if (authData) {
        return JSON.parse(authData).currentUser;
    }
    return null;
}