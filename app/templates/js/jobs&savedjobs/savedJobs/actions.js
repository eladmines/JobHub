import {deployJobsContainer} from '../actions.js'
import {sendData} from '../../actions.js'
import { getCookie } from '../../actions.js';
function failFunc(){
    alert("Error, try again");
}
export async function getSavedJobs() {
    try {
        var res = await sendData("/savedjobs", getCookie("userId"), 'get saved jobs');
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
