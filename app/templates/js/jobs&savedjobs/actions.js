import {Job} from '../models/job.js'
import{saveJob} from './jobs/actions.js'
import{removeSavedJob} from './savedJobs/actions.js'
import { getCookie,sendData } from '../actions.js';
import {createCommentsModal,createCommentsDivs, removeModalContent} from "../comments/actions.js"
const ID="id",TITLE="title",LOCATION="location",DESCRIPTION="description",QUALIFICATIONS="qualifications",COMPANY="company",IMAGE="image",DATE="date",LINK="link";


export function deployJobsContainer(data){
    var i=0;
    while(i< data.length){
        buildJobContainer(data,i);
    i++
    }
}

function buildJobContainer(arr,i,job){ 
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
    var saveJobButton=document.createElement('a');
    var commentsButton=document.createElement('a');
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
    saveJobButton.href="#";
    commentsButton.href="#";
    var data = [getCookie("userId")];
    var removeData=[getCookie("userId"), arr[i][ID]];
    if(window.location.href.includes("saved")){
        commentsButton.innerHTML="Comments ";
        commentsButton.setAttribute("data-target", "#comments");
        commentsButton.setAttribute("href", "#");
        commentsButton.setAttribute("data-toggle", "modal");
        commentsButton.innerHTML="Comments";
        commentsButton.id=job.id;
        saveJobButton.innerHTML="Remove ";
        saveJobButton.addEventListener('click', function() {
            data[2]=event.target.id;
            removeSavedJob(removeData);
            card.style.display = "none";
            });
        commentsButton.addEventListener('click', async function() {
          createCommentsModal()
              var getCommentsData=[getCookie("userId"),job.id]
              var res = await sendData('\savedjobs',getCommentsData,'get comments')
              for(var i=0; i<res[0][0].length; i++){
                createCommentsDivs(res[0][0],i)
              }
              });
    }
    else if(window.location.href.includes("jobs")){
      commentsButton.setAttribute("data-target", "#comments");
      commentsButton.setAttribute("class", "dropdown-item");
      commentsButton.setAttribute("href", "#");
      commentsButton.setAttribute("data-toggle", "modal");
      saveJobButton.innerHTML="save";
      saveJobButton.id="saveJobButton";
      saveJobButton.addEventListener('click', function() {
          data[1]=job.id;
          saveJob(data);
          });
    }
    else{
      return;
    }
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
    divButtons.appendChild(saveJobButton);
    divButtons.appendChild(commentsButton);
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





//Main
jobSearch()


