import {getEndResults} from "../../js/utils/backend-queries.js";
import {deleteGame, getCurrentUser, setCurrentUser} from "../../js/components/localstorage.js";
import {createEndResultTable} from "../../js/components/ui_handler.js";

async function win_screen(){
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.error("No user found. Please log in.");
        window.location.href = `../startscreen/index.html`;
        return;
    }

    try{
        //fetch end results
        const response = await getEndResults();
        if (response) {
            //add the end results to the table

            createEndResultTable(response)
        }
    }
    catch (error) {
        console.error("Error fetching end results:", error);
    }

}



document.addEventListener("DOMContentLoaded", win_screen);