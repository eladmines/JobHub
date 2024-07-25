import { getCookieValue,sendData,sendGetRequest,removeKeysFromDict,deleteData} from '../utils.js';
import {createModal,createTable,createInsertForm,createTableRow,deleteButtonInit} from '../htmlUtils.js';
import {ApplicationProcess} from '../models/ApplicationProcess.js';


export async function initProcessTable(job){
    let headers = ['Date', 'Interviewer','Phone', 'Status', 'Notes','Actions'];
    let inputTitles=['Date','Interviewer','Phone','Status','Notes'];
    var modalBody = await createModal(job.title, job.id);
    var tbody = createTable(modalBody,headers);
    if(!document.getElementById(`inputs-row${job.id}`)){
        createInsertForm(inputTitles,job);
    }  
    
    const processes = await getProcessApplication(job.id);
    
    for (let process of processes) {
        var processToInsert = new ApplicationProcess(process["id"],process["job_id"],process["date"],process["interviewer"],process["phone"],process["status"],process["notes"]);
        var processIdToDelete=processToInsert._id;
        delete processToInsert._id;
        delete processToInsert._user_id;
        delete processToInsert._jobId;
        createTableRow(tbody, processToInsert);
        deleteButtonInit(tbody,deleteProcess,processIdToDelete);
    }
    document.getElementById("addRowButton").addEventListener('click', function() {
        addNote(job.id); 
    });
    
}

  
async function getProcessApplication(applicationId){
    var userId=getCookieValue('id');
    var res =  await sendGetRequest(`/app-process/${userId}/${applicationId}`);
    return res;
}


export function removeModalContent() {
    var elements = document.getElementsByClassName("modal fade");
    var elementsArray = Array.from(elements);
    elementsArray.forEach(function(element) {
        element.remove();
    });
}

      
async function addNote(jobId) {
    var newDate = document.getElementById("newDate").value;
    var newInterviewer = document.getElementById("newInterviewer").value;
    var newPhone = document.getElementById("newPhone").value;
    var newStatus = document.getElementById("newStatus").value;
    var newNotes = document.getElementById("newNotes").value;
    var appProcess = new ApplicationProcess(getCookieValue('id'),jobId,newDate,newInterviewer,newPhone,newStatus,newNotes);
    
    var res = await sendData(`/add-process`, appProcess); 
    if (res === false) {
        return false;
    } else {
        let keysToRemove = ['_id', '_jobId','_user_id'];
        var tbody=document.getElementById('table');
        let cleanedProcess = removeKeysFromDict(appProcess,keysToRemove);
        createTableRow(tbody, cleanedProcess);
    }
    return true;
}

export function deleteProcess(data) {
    var userId=getCookieValue('id');
    var processToDelete=data;
    data=[userId, processToDelete];
    var res = deleteData(`delete-processes-applications`,data);
    if(res == false){
        console.error("Failed to delete the connection");
        return false;
    }
    return true;
};