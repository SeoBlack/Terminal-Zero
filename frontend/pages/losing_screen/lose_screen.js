import {getEndResults} from "../../js/utils/backend-queries.js";

async function lose_screen(){


    try {
        //fetch end results
        const response = await getEndResults();
        if (response) {
            console.log("end results", response);
            //add the end results to the table
        }


    }
    catch (error) {
        console.error("Error fetching end results:", error);
    }


}



document.addEventListener('DOMContentLoaded', lose_screen);