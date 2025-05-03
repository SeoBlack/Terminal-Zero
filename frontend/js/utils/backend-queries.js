
'use strict';

import {showSnackbar, snackbarType, snackbarType as snackbarMessages} from "../components/snackbar.js";





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
            showSnackbar(snackbarType.ERROR, 'Username already exists');
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