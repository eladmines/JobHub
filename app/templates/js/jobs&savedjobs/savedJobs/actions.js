import {deployJobsContainer} from '../actions.js'
import {sendData} from '../../actions.js'
import { getCookieValue } from '../../utils.js'
import { saveData } from '../../actions.js';
function failFunc(){
    alert("Error, try again");
}
export async function getSavedJobs() {
    try {
        var res = await sendData("/savedjobs", getCookieValue('id'), 'get saved jobs');
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

export async function removeSavedJob(data) {
    try {
        if(window.location.pathname=='/savedjobs'){
        document.getElementById(data[1]).style.display="none";
        }
        var res = await sendData("/savedjobs",data, 'remove saved job');
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

export function saveJob(data) {
    saveData("/savedjobs", data, "save job" ,"Job has been saved");
  }