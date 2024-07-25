import {deployJobsContainer} from '../actions.js'
import {sendData} from '../../actions.js'
import { getCookieValue,deleteData } from '../../utils.js'
import { saveData } from '../../actions.js';

export function saveApp(data) {
  saveData("/applications", data, "save application" ,"Application has been saved");
}

function failFunc(){
    alert("Error, try again");
}

export async function getApplications() {
    try {
        
        var res = await sendData("/applications",getCookieValue('id'), 'get applications');
        
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


export async function deleteApplication(data) {
    var res = deleteData("applications",data);
    var application_to_delete=data[1]
    if(res == false){
        console.error("Failed to delete the application");
        return false;
    }
    if(window.location.pathname == '/applications'){
        document.getElementById(application_to_delete).style.display="none";
    }
    return true;
};

