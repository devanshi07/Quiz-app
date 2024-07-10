import { CustomConsole } from "./utils";

// export const BASE_URL = 'https://quiz.primaldevs.com/api/';
export const BASE_URL = 'https://yuvapahel.com/api/';

export const LOGIN = BASE_URL + 'login';
export const LOGOUT = BASE_URL + 'logout';

export const SLIDER_LIST = BASE_URL + 'slider/home'; //after / add code which come from slider list

export const ACTIVE_QUIZ = BASE_URL + 'quizzes/active'; 
export const QUIZ_DETAILS = BASE_URL + 'quiz/details'; 
export const QUIZ_SUBMIT = BASE_URL + 'quiz/submit'; 
export const PERSONAL_RESULT = BASE_URL + 'quiz/personal-result'; 
export const TOP_WINNERS = BASE_URL + 'quiz/top-winners?designation_id=';

export const ATTEND_QUIZ = BASE_URL + 'quiz/top-winners?designation_id=';
export const TOTAL_QUIZ_ATTENDANCE = BASE_URL + 'quiz/top-winners?designation_id=';

export const TOP_WINNERS_PERFORMANCE = BASE_URL + 'quiz/top-winners-performance'; 
export const TOP_WINNERS_CONSISTENT = BASE_URL + 'quiz/top-winners-consistent'; 

export const FEEDBACK = BASE_URL + 'feedback'; 

export const GET_PROFILE = BASE_URL + 'profile'; 
export const PROFILE_EDIT = BASE_URL + 'profile/edit'; 
export const AVATAR_LIST = BASE_URL + 'avatars'; 


// Common api call for POST method
export const postAPICall = async (api, formdata) => {
    try {

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        // CustomConsole(api + "\n" + formdata);

        const response = await fetch(api, requestOptions);
        const json = await response.json();

        CustomConsole(api + "\n" + JSON.stringify(json));

        if (typeof (json) === "object") {
            return json;
        } else {
            return "Server not responding!"
        }

        // Return the status value

    } catch (error) {
        CustomConsole(api, "===>error " + error);
        // Propagate the error to the caller
        return "Server not responding!"
    }
}

// Common api call for GET method
export const getAPICall = async (api) => {
    try {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        CustomConsole(api, "===>");

        const response = await fetch(api, requestOptions);
        const json = await response.json();

        CustomConsole(api, "\n" + JSON.stringify(json));

        if (typeof (json) === "object") {
            return json;
        } else {
            return "Server not responding!"
        }
        // Return the status value

    } catch (error) {
        CustomConsole(api, "===>error " + error);
        // Propagate the error to the caller
        return "Server not responding!"
    }
}

