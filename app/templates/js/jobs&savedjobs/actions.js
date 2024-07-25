// Import necessary modules and functions
import { Job } from '../models/job.js';
import { getCookieValue, sendData, createFormattedDate } from '../utils.js';
import { saveJob, deleteSavedJob } from './savedJobs/actions.js';
import { deleteApplication, saveApp } from './applications/actions.js';
import {initProcessTable } from "../ApplicationProcess/actions.js";


// Define constants
const ID = "id",
    TITLE = "title",
    LOCATION = "location",
    DESCRIPTION = "description",
    QUALIFICATIONS = "qualifications",
    COMPANY = "company",
    IMAGE = "image",
    DATE = "date",
    LINK = "link";

// Function to deploy jobs container
export async function deployJobsContainer(data) {
    for (let i = 0; i < data.length; i++) {
        buildJobContainer(data, i);
    }
}

// Function to build individual job containers
export function buildJobContainer(arr, i) {
    var job = new Job(
        arr[i][ID], arr[i][TITLE], arr[i][LOCATION], arr[i][DESCRIPTION],
        arr[i][QUALIFICATIONS], arr[i][COMPANY], arr[i][IMAGE], arr[i][DATE], arr[i][LINK]
    );
    var card = document.createElement('div');
    card.className = 'card shadow mb-4 ';
    card.id=job.id;
    var cardHeader = document.createElement('a');
    cardHeader.href = '#collapseCardExample' + i; 
    cardHeader.className = 'd-block card-header py-3';
    cardHeader.setAttribute('data-toggle', 'collapse');
    cardHeader.setAttribute('role', 'button');
    cardHeader.setAttribute('aria-expanded', 'true');
    cardHeader.setAttribute('aria-controls', 'collapseCardExample' + i);

    var headerContainer = document.createElement('div');
    headerContainer.className = 'd-flex flex-column align-items-start';

    var headerText = document.createElement('h6');
    headerText.className = 'm-0 font-weight-bold text-primary';
    headerText.innerHTML = `${job.title} (${job.company})`;
    headerText.addEventListener('click', (event) => {
        event.stopPropagation();
        window.location.href = job.link;
    });

    var locationDateContainer = document.createElement('div');
    locationDateContainer.className = 'd-flex flex-column';

    var locationDateText = document.createElement('div');
    locationDateText.className = 'm-0 text-muted';
    locationDateText.style.fontSize = '0.8rem';
    locationDateText.innerHTML = `
        <i class="fas fa-map-marker-alt mr-1"></i><span>${job.location}</span>
        <i class="far fa-calendar-alt ml-2"></i><span class="ml-1">${job.date}</span>
    `;

    // Create links for Save, Apply, and Comments
    var saveButton = document.createElement('a');
    saveButton.href = '#';
    saveButton.className = 'm-0 text-muted mr-2';
    saveButton.style.fontSize = '0.7rem';
    saveButton.textContent = 'Save';
    saveButton.id = "saveOrRemoveJobButton";

    var applyButton = document.createElement('a');
    applyButton.href = '#';
    applyButton.className = 'm-0 text-muted';
    applyButton.style.fontSize = '0.7rem';
    applyButton.textContent = 'Apply';

    

    var applicationProcess = document.createElement('a');
    applicationProcess.href = '#';
    applicationProcess.className = 'm-0 text-muted';
    applicationProcess.style.fontSize = '0.7rem';
    applicationProcess.textContent = ' | Application process';
    applicationProcess.id=`process${job.id}`;
    
    

    // Append elements to the location container
    var locationContainer = document.createElement('div');
    locationContainer.appendChild(locationDateText);
    locationContainer.appendChild(saveButton);
    locationContainer.appendChild(applyButton);
    locationContainer.appendChild(applicationProcess);

    headerContainer.appendChild(headerText);
    headerContainer.appendChild(locationContainer);
    cardHeader.appendChild(headerContainer);

    var cardContent = document.createElement('div');
    cardContent.className = 'collapse';
    cardContent.id = 'collapseCard' + i;

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = job.description;

    cardContent.appendChild(cardBody);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);

    document.getElementById('content').appendChild(card);

    cardHeader.addEventListener('click', (event) => {
        event.preventDefault();
        $('#' + cardContent.id).collapse('toggle');
    });
    var dataToSend = [getCookieValue('id')];
    setupCard(saveButton, job, dataToSend, applyButton, arr[i]['saved'], arr[i]['applied'],applicationProcess);
    
}

// Function for job search functionality
function jobSearch() {
    const searchJobButton = document.getElementById("searchBar");
    const contentDivs = document.getElementById('content');
    if(!searchJobButton || !contentDivs){
        console.error("Search bar or content container not found");
        return;
    }
    searchJobButton.addEventListener('keyup', function () {
        let i = 0;
        let card = contentDivs.getElementsByClassName('card shadow mb-4')[i];
        if(!card){
          console.error("Card not found");
          return;
        }
        const input = searchJobButton.value;
        while (card != null) {
            const title = card.querySelector('h6').innerHTML;
            const text = card.querySelector(`#collapseCard${i}`).innerHTML;
            const location = card.querySelector('span').innerHTML;
            if(!title || !text || !location){
              console.error("Title , text ot location not found");
              return;
            }
            if (title.toLowerCase().includes(input.toLowerCase()) || text.toLowerCase().includes(input.toLowerCase()) || location.toLowerCase().includes(input.toLowerCase())) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
            i++;
            card = contentDivs.getElementsByClassName('card shadow mb-4')[i];
            
        }
    });
}

// Function to set up card with event listeners for save, apply, and comments
function setupCard(saveOrRemoveJobButton, job, dataToSend, applyButton, isJobSaved, isJobApplied, applicationProcess) {
    if (isJobSaved == 1) {
        saveOrRemoveJobButton.innerHTML = "Unsave | ";
    } else {
        saveOrRemoveJobButton.innerHTML = "Save | ";
    }
    if (!isJobApplied) {
        
        applyButton.innerHTML = "Apply";
    } else {
        applyButton.innerHTML = `Withdraw application (Applied on ${isJobApplied})`;
    }

    saveOrRemoveJobButton.addEventListener('click', () => {
        if (saveOrRemoveJobButton.innerHTML == "Save | ") {
            saveOrRemoveJobButton.innerHTML = "Unsave | ";
            dataToSend[1] = job.id;
            saveJob(dataToSend);
        } else {
            saveOrRemoveJobButton.innerHTML = "Save | ";
            dataToSend[1] =job.id;
            deleteSavedJob(dataToSend);
        }
    });
    applyButton.addEventListener('click', () => {
        if (applyButton.innerHTML == "Apply") {
            dataToSend[1] = job.id;
            applyButton.innerHTML = `Withdraw application (Applied on ${createFormattedDate()})`;
            saveApp(dataToSend);
        } else {
            dataToSend[1] = job.id;
            deleteApplication(dataToSend);
            applyButton.innerHTML = "Apply";
        }
    });

    applicationProcess.addEventListener('click', () => initProcessTable(job));

}

// Initialize job search functionality
jobSearch();

