import { getCookieValue,sendData,sendGetRequest,removeKeysFromDict,deleteData, getUserSession} from '../utils.js';
import {createModal,createTable,createInsertForm,createTableRow,deleteButtonInit} from '../htmlUtils.js';
import {ApplicationProcess} from '../models/ApplicationProcess.js';


export async function initProcessTable(job){
    let headers = ['Date', 'Interviewer','Phone', 'Subject', 'Descripition','Actions'];
    let inputTitles=['Day-Month-Year','Interviewer','Phone','Subject','Descripition'];
    var modalBody = await createModal(job.title, job.id);
    
    var tbody = await createTable(modalBody,headers);
    
    if (!document.getElementById(`inputs-row${job.id}`)) {
        createInsertForm(inputTitles, job);
    }
    
    const processes = await getProcessApplication(job.id);
    for (let process of processes) {
        var processToInsert = new ApplicationProcess(process["id"],process["job_id"],process["date"],process["interviewer"],process["phone"],process["subject"],process["description"]);
        var processIdToDelete=processToInsert.id;
        delete processToInsert.id;
        delete processToInsert.user_id;
        delete processToInsert.jobId;
        createTableRow(tbody, processToInsert);
        deleteButtonInit(tbody,deleteProcess,processIdToDelete);
    }
    document.getElementById("addRowButton").addEventListener('click', function() {
        addNote(job.id); 
    });
    
}

  
async function getProcessApplication(applicationId){
    var userId=getUserSession();
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
    var newDate = document.getElementById("newDay-Month-Year").value;
    var newInterviewer = document.getElementById("newInterviewer").value;
    var newPhone = document.getElementById("newPhone").value;
    var newSubject = document.getElementById("newSubject").value;
    var newDescripition = document.getElementById("newDescripition").value;
    var appProcess = new ApplicationProcess("",jobId,newDate,newInterviewer,newPhone,newSubject,newDescripition);
    appProcess=[getUserSession(),appProcess]
    var res = await sendData(`/add-process`, appProcess); 
    if (res === false) {
        return false;
    } else {
        var tbody=document.getElementById('table');
        var processIdToDelete=res;
        delete appProcess[1].id;
        delete appProcess[1].user_id;
        delete appProcess[1].jobId;
        createTableRow(tbody, appProcess[1]);
        deleteButtonInit(tbody,deleteProcess,processIdToDelete);
        document.getElementById("newDay-Month-Year").value=""
        document.getElementById("newInterviewer").value=""
        document.getElementById("newPhone").value=""
        document.getElementById("newSubject").value=""
        document.getElementById("newDescripition").value=""
    }
    return true;
}

export function deleteProcess(processToDelete) {
    var processToDelete;
    var res = deleteData(`delete-processes-applications`,processToDelete);
    if(res == false){
        console.error("Failed to delete the connection");
        return false;
    }
    return true;
};