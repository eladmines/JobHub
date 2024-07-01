import {Job} from '../models/job.js'
import { getCookieValue,sendData,createFormattedDate} from '../utils.js'
//import {setupJobsPage} from './jobs/conf.js'
//import {setupSavedjobsPage} from './savedJobs/conf.js'
import {setupApplicationsPage} from './applications/conf.js'
//import { saveApp } from './applications/actions.js';
import {saveJob} from './savedJobs/actions.js'
import {removeApplication, saveApp} from './applications/actions.js'
import{removeSavedJob} from './savedJobs/actions.js'
import {createCommentsModal,createCommentsDivs, removeModalContent} from "../comments/actions.js"
import {removeCommentsButton} from './jobs/actions.js'
const ID="id",TITLE="title",LOCATION="location",DESCRIPTION="description",QUALIFICATIONS="qualifications",COMPANY="company",IMAGE="image",DATE="date",LINK="link";


export async function deployJobsContainer(data){
    var i=0;
    while(i< data.length){
        buildJobContainer(data,i);
        i++
    }
}

export function buildJobContainer(arr,i,job){ 
    var job = new Job(arr[i][ID],arr[i][TITLE],arr[i][LOCATION],arr[i][DESCRIPTION],arr[i][QUALIFICATIONS],arr[i][COMPANY],arr[i][IMAGE],arr[i][DATE],arr[i][LINK]);
// Create div objects
    var card = document.createElement('div');
    var cardHeader = document.createElement('div');
    var titleContainer = document.createElement('div');
    var locationContainer = document.createElement('div');
    var divButtons = document.createElement('div');
    var locationContainer = document.createElement('div');
    var cardContent = document.createElement('div');
    var qualificationsContainer = document.createElement('div');
    var descriptionContainer = document.createElement('div');
// Create link objects
    var a = document.createElement('a');
    var saveOrRemoveJobButton=document.createElement('a');
    var commentsButton=document.createElement('a');
    var applyButton=document.createElement('a');
    
// Create span objects
    var date=document.createElement('span');
    var location=document.createElement('span');
    var company=document.createElement('span');

//Set properties
    card.className="card shadow mb-4"
    card.id=job.id;
    card.style.height = "400px";
    card.style.overflow = "scroll"; 
    card.style.textOverflow = 'ellipsis';
    cardHeader.className="d-block card-header py-3";
    saveOrRemoveJobButton.href="#";
    commentsButton.href="#";
    commentsButton.id=job.id;
    applyButton.href="#";
    saveOrRemoveJobButton.id="saveOrRemoveJobButton";
    applyButton.innerHTML="Apply"
    var dataToSend = [getCookieValue(document.cookie,'id')];
    var removeData=[getCookieValue(document.cookie,'id'), arr[i][ID]];
    setupCard(saveOrRemoveJobButton,job,dataToSend,applyButton,arr[i]['saved'],arr[i]['applied'],commentsButton);
    a.innerHTML=job.title;
    a.href=job.link;
    a.id="title"+job.id;
    a.setAttribute('role', 'button');
    a.setAttribute('aria-expanded', 'true');
    a.setAttribute('aria-controls', 'collapseCardExample');
    date.innerHTML="Posted:"+job.date;
    date.className="float-right";
    location.className="h6";
    location.innerHTML=job.location;
    company.innerHTML=job.company+", ";
    company.className="float-right mr-2";
    cardContent.className="collapse show";
    cardContent.id="collapseCardExample";
    qualificationsContainer.className="card-body";
    descriptionContainer.className="card-body";
    qualificationsContainer.innerHTML="Qualifications:<br>"+job.qualifications;
    descriptionContainer.innerHTML="Description:<br>"+ job.description;

//Elements connections 
    cardContent.appendChild(descriptionContainer);
    cardContent.appendChild(qualificationsContainer);
    cardHeader.appendChild(titleContainer);
    cardHeader.appendChild(locationContainer);
    locationContainer.appendChild(location);
    cardHeader.appendChild(divButtons);
    divButtons.appendChild(commentsButton);
    divButtons.appendChild(saveOrRemoveJobButton);
    divButtons.appendChild(commentsButton);
    divButtons.appendChild(applyButton);
    titleContainer.appendChild(a);
    titleContainer.appendChild(date);
    titleContainer.appendChild(company);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    document.getElementById("content").appendChild(card);
    commentsButton.addEventListener('click', function() {
      var sendCommentButton = document.getElementsByClassName('btn btn-primary change');
      sendCommentButton[0].id=commentsButton.id
    });
    commentsButton.setAttribute("data-target", "#comments");
    commentsButton.setAttribute("href", "#");
    commentsButton.setAttribute("data-toggle", "modal");
    commentsButton.innerHTML="Comments | ";
    
}


function jobSearch(){
  var searchJobButton=document.getElementById("searchBar");
  var contentDivs = document.getElementById('content');
  searchJobButton.addEventListener('keyup', function() {
    var i=0;
    var card = contentDivs.getElementsByClassName('card shadow mb-4')[i];
    var input = document.getElementById("searchBar").value;
    var title = card.querySelector('a').innerHTML;
    while(card!=null){
      var title = card.querySelector('a').innerHTML;;
      if(title.toLowerCase().includes(input.toLowerCase()) == 1 || title.toUpperCase().includes(input.toUpperCase()) == 1 || input==null){
          card.style.display = "block"
      }else{
          card.style.display = "none"
      }
      i++;
      card = contentDivs.getElementsByClassName('card shadow mb-4')[i];
      }
  })
  
}
function setupCard(saveOrRemoveJobButton,job,dataToSend,applyButton,isJobSaved,isJobApplied,commentsButton){

    if(isJobSaved == "yes"){
      saveOrRemoveJobButton.innerHTML="Unsave | ";
    }
    else{
      saveOrRemoveJobButton.innerHTML="Save | ";
    }
    if(isJobApplied == "no"){
      applyButton.innerHTML="Apply";
      
    }
    else{
      applyButton.innerHTML="Withdraw application (Applied on "+isJobApplied+")";
    }
    saveOrRemoveJobButton.id="saveOrRemoveJobButton";
    saveOrRemoveJobButton.addEventListener('click', function() {
          if(saveOrRemoveJobButton.innerHTML == "Save | "){
            saveOrRemoveJobButton.innerHTML = "Unsave | ";
            dataToSend[1]=job.id;
            console.log(dataToSend)
            saveJob(dataToSend);
          }
          else{
              saveOrRemoveJobButton.innerHTML="Save | ";
              dataToSend[1]=job.id;
              removeSavedJob(dataToSend)
          }
          });
    applyButton.addEventListener('click', function() {
            if(applyButton.innerHTML == "Apply"){
              dataToSend[1]=job.id;
              applyButton.innerHTML="Withdraw application (Applied on "+createFormattedDate()+")";
              saveApp(dataToSend);
            }
            else{
              dataToSend[1]=job.id;
              removeApplication(dataToSend)
              applyButton.innerHTML="Apply";
            }
            });
            commentsButton.addEventListener('click', async function() {
                  createCommentsModal()
                  var getCommentsData=[getCookieValue(document.cookie,'id'),job.id]
                  var res = await sendData('/comments',getCommentsData,'get comments '+ window.location.pathname)
                  for(var i=0; i<res[0][0].length; i++){
                    createCommentsDivs(res[0][0],i)
                  }
            })
            removeCommentsButton(window.location.pathname,commentsButton)

}

//Main
jobSearch()


