import {deployJobsContainer} from '../actions.js'
import {sendData, } from '../../actions.js'
import { getCookieValue,sendDeleteRequest,deleteData,sendGetRequest,navigateToPage} from '../../utils.js'
import { saveData } from '../../actions.js';

function failFunc(res){
    alert(res);
}
export async function getSavedJobs() {
    try {
        var res = await sendData(`/savedjobs`,`${getCookieValue('id')}`);
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

export async function deleteSavedJob(data) {
    var res = deleteData("savedjobs",data);
    var job_to_delete=data[1]
    if(res == false){
        console.error("Failed to delete the job");
        return false;
    }
    if(window.location.pathname == '/savedjobs'){
        document.getElementById(job_to_delete).style.display="none";
    }
    return true;
};

export function saveJob(data) {
    saveData("/savedjobs", data, "save job" ,"Job has been saved");
  }


