import { CustomConsole } from "./utils";

export const BASE_URL = 'https://quiz.primaldevs.com/api/';

export const LOGIN = BASE_URL + 'login';
export const LOGOUT = BASE_URL + 'logout';

export const SLIDER_LIST = BASE_URL + 'sliders';
export const SLIDER_DETAILS = BASE_URL + 'slider/'; //after / add code which come from slider list

export const ACTIVE_QUIZ = BASE_URL + 'quizzes/active'; 

export const PMJAY_LIST = BASE_URL + 'pmjay-resource-list';
export const PMJAY_DETAILS = BASE_URL + 'pmjay-resource/'; //after / add id from resources list
export const SPECIALALIES = BASE_URL + 'specialities';
export const HOSPITAL_DETAILS = BASE_URL + 'hospital/'; //after / add id from hospital list
export const HOSPITAL_LIST = BASE_URL + 'hospitals';
export const TOTAL_DATA = BASE_URL + 'front-counts';
export const WORK_PLACE_TYPE = BASE_URL + 'work-place-types';

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

