// Import necessary modules and functions
import { Job } from '../models/job.js';
import { getCookieValue, sendData, createFormattedDate } from '../utils.js';
import { saveJob, removeSavedJob } from './savedJobs/actions.js';
import { removeApplication, saveApp } from './applications/actions.js';
import { createCommentsModal, createCommentsDivs, removeModalContent } from "../comments/actions.js";
import { removeCommentsButton } from './jobs/actions.js';

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
    const job = new Job(
        arr[i][ID], arr[i][TITLE], arr[i][LOCATION], arr[i][DESCRIPTION],
        arr[i][QUALIFICATIONS], arr[i][COMPANY], arr[i][IMAGE], arr[i][DATE], arr[i][LINK]
    );

    const card = document.createElement('div');
    card.className = 'card shadow mb-4';

    const cardHeader = document.createElement('a');
    cardHeader.href = '#collapseCardExample' + i; 
    cardHeader.className = 'd-block card-header py-3';
    cardHeader.setAttribute('data-toggle', 'collapse');
    cardHeader.setAttribute('role', 'button');
    cardHeader.setAttribute('aria-expanded', 'true');
    cardHeader.setAttribute('aria-controls', 'collapseCardExample' + i);

    const headerContainer = document.createElement('div');
    headerContainer.className = 'd-flex flex-column align-items-start';

    const headerText = document.createElement('h6');
    headerText.className = 'm-0 font-weight-bold text-primary';
    headerText.innerHTML = `${job.title} (${job.company})`;
    headerText.addEventListener('click', (event) => {
        event.stopPropagation();
        window.location.href = job.link;
    });

    const locationDateContainer = document.createElement('div');
    locationDateContainer.className = 'd-flex flex-column';

    const locationDateText = document.createElement('div');
    locationDateText.className = 'm-0 text-muted';
    locationDateText.style.fontSize = '0.8rem';
    locationDateText.innerHTML = `
        <i class="fas fa-map-marker-alt mr-1"></i><span>${job.location}</span>
        <i class="far fa-calendar-alt ml-2"></i><span class="ml-1">${job.date}</span>
    `;

    // Create links for Save, Apply, and Comments
    const saveLink1 = document.createElement('a');
    saveLink1.href = '#';
    saveLink1.className = 'm-0 text-muted mr-2';
    saveLink1.style.fontSize = '0.7rem';
    saveLink1.textContent = 'Save';
    saveLink1.id = "saveOrRemoveJobButton";

    const saveLink2 = document.createElement('a');
    saveLink2.href = '#';
    saveLink2.className = 'm-0 text-muted';
    saveLink2.style.fontSize = '0.7rem';
    saveLink2.textContent = 'Apply';

    const commentsButton = document.createElement('a');
    commentsButton.href = '#';
    commentsButton.className = 'm-0 text-muted';
    commentsButton.style.fontSize = '0.7rem';
    commentsButton.textContent = 'Comments';
    commentsButton.id = job.id;

    // Append elements to the location container
    const locationContainer = document.createElement('div');
    locationContainer.appendChild(locationDateText);
    locationContainer.appendChild(saveLink1);
    locationContainer.appendChild(saveLink2);
    locationContainer.appendChild(commentsButton);

    headerContainer.appendChild(headerText);
    headerContainer.appendChild(locationContainer);
    cardHeader.appendChild(headerContainer);

    const cardContent = document.createElement('div');
    cardContent.className = 'collapse';
    cardContent.id = 'collapseCard' + i;

    const cardBody = document.createElement('div');
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

    const dataToSend = [getCookieValue('id')];
    setupCard(saveLink1, job, dataToSend, saveLink2, arr[i]['saved'], arr[i]['applied'], commentsButton);
}

// Function for job search functionality
function jobSearch() {
    const searchJobButton = document.getElementById("searchBar");
    const contentDivs = document.getElementById('content');
    searchJobButton.addEventListener('keyup', function () {
        let i = 0;
        let card = contentDivs.getElementsByClassName('card shadow mb-4')[i];
        const input = searchJobButton.value;

        while (card != null) {
            const title = card.querySelector('h6').innerHTML;
            const text = card.querySelector(`#collapseCard${i}`).innerHTML;
            const location = card.querySelector('span').innerHTML;

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
function setupCard(saveOrRemoveJobButton, job, dataToSend, applyButton, isJobSaved, isJobApplied, commentsButton) {
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
            dataToSend[1] = job.id;
            removeSavedJob(dataToSend);
        }
    });

    applyButton.addEventListener('click', () => {
        if (applyButton.innerHTML == "Apply") {
            dataToSend[1] = job.id;
            applyButton.innerHTML = `Withdraw application (Applied on ${createFormattedDate()})`;
            saveApp(dataToSend);
        } else {
            dataToSend[1] = job.id;
            removeApplication(dataToSend);
            applyButton.innerHTML = "Apply";
        }
    });

    commentsButton.addEventListener('click', async () => {
        createCommentsModal();
        const getCommentsData = [getCookieValue('id'), job.id];
        const res = await sendData('/comments', getCommentsData, 'get comments ' + window.location.pathname);
        for (let i = 0; i < res[0][0].length; i++) {
            createCommentsDivs(res[0][0], i);
        }
    });

    removeCommentsButton(window.location.pathname, commentsButton);
}

// Initialize job search functionality
jobSearch();
