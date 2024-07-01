import {deployJobsContainer} from '../actions.js'
import {sendData} from '../../actions.js'
import { getCookieValue } from '../../utils.js'
import { saveData } from '../../actions.js';

export function saveApp(data) {
  saveData("/applications", data, "save application" ,"Application has been saved");
}

function failFunc(){
    alert("Error, try again");
}

export async function getApplications() {
    try {
        
        var res = await sendData("/applications",getCookieValue(document.cookie,'id'), 'get applications');
        
        if (res === false) {
            failFunc();
        } else {
            deployJobsContainer(res);
        }
    } catch (error) {
        console.error('An error occurred during the sendData operation:', error);
        // Handle the error or rethrow it to propagate
    }
};

export async function removeApplication(data) {
    try {
        if(window.location.pathname=='/applications'){
            document.getElementById(data[1]).style.display="none";
        }
        
        var res = await sendData("/applications",data, 'remove job application');
        if (res === false) {
            failFunc();
        } else {
            deployJobsContainer(res);
        }
    } catch (error) {
        console.error('An error occurred during the sendData operation:', error);
        // Handle the error or rethrow it to propagate
    }
};

