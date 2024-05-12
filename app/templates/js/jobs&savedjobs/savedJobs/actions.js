import {deployJobsContainer} from '../actions.js'
import {sendData} from '../../actions.js'

function failFunc(){
    alert("Error, try again");
}
async function getSavedJobs() {
    try {
        var res = await sendData("/savedjobs", document.cookie, 'get saved jobs');
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
    alert("Job has been removed")
    try {
        var res = await sendData("/savedjobs",data, 'remove saved job');
        if (res === false) {
            failFunc();
        } else {
            location.reload();
            deployJobsContainer(res);
        }
    } catch (error) {
        console.error('An error occurred during the sendData operation:', error);
        // Handle the error or rethrow it to propagate
    }
};
getSavedJobs()