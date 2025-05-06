
'use strict';

import {showSnackbar, snackbarType,} from "../components/snackbar.js";





const flaskUrl = 'http://127.0.0.1:5000';
const apiEndPoints = {
    PLAYERS: '/players',
    AIRPORTS: '/airports',
    END_RESULTS: '/end_results',
}

export let isLoading = false;

export async function addNewUser(username) {
    if (!username) {
        console.error('Username is required');
        return;
    }
    try {
        isLoading = true;
        const response = await fetch(`${flaskUrl}${apiEndPoints.PLAYERS}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        if (response.status === 409) {
            return await response.json();
        } else if (!response.ok) {
            showSnackbar(snackbarType.ERROR, 'An error occurred while adding the user');
        } else {
            return await response.json();
        }
    } catch (error) {

        console.log("error", error);
        showSnackbar(snackbarType.ERROR, 'An error occurred while adding the user');
    }
    finally {
        isLoading = false;
    }
}
export async function getUser(username){
    try{
        isLoading = true;
        const response = await fetch(`${flaskUrl}${apiEndPoints.PLAYERS}/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 404) {
            showSnackbar(snackbarType.ERROR, 'User not found');
            return null;
        }
        return await response.json();

    }catch(error){
        showSnackbar(snackbarType.ERROR,'An error occurred while fetching the user');
    }
    finally {
        isLoading = false;
    }

}

export async function getAirports(){
    try{
        isLoading = true;
        const response = await fetch(`${flaskUrl}${apiEndPoints.AIRPORTS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();

    }catch(error){
        showSnackbar(snackbarType.ERROR,'An error occurred while fetching the airports');
    }
    finally {
        isLoading = false;
    }
}

export async function getEndResults(){
    try{
        isLoading = true;
        const response = await fetch(`${flaskUrl}${apiEndPoints.END_RESULTS}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();

    }catch(error){
        showSnackbar(snackbarType.ERROR,'An error occurred while fetching the end results');
    }
    finally {
        isLoading = false;
    }
}


export async function createEndResult(username, time, hasWon){
    try{
        console.log(time)
        isLoading = true;
        const response = await fetch(`${flaskUrl}${apiEndPoints.END_RESULTS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username: username,
                time_elapsed: time,
                has_won: hasWon
            })
        });
        console.log(response);
        if (!response.ok) {
            showSnackbar(snackbarType.ERROR, `Failed to save game result: ${response.status}`);
            return null;
        }

        return await response.json();

    }catch(error){
        console.error('Error creating end result:', error);
        showSnackbar(snackbarType.ERROR,'An error occurred while creating the end result');
        return null
    }
    finally {
        isLoading = false;
    }
}