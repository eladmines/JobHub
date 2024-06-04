import {Job} from '../models/job.js'
import{saveJob} from './jobs/actions.js'
import{removeSavedJob} from './savedJobs/actions.js'
const ID="id",TITLE="title",LOCATION="location",DESCRIPTION="description",QUALIFICATIONS="qualifications",COMPANY="company",IMAGE="image",DATE="date",LINK="link";


export function deployJobsContainer(data){
    var i=0
    console.log("pppp",data)
    while(i< data.length){
        buildJobContainer(data,i)
    i++
    }
  }


function buildJobContainer(arr,i,job){ 
    console.log("start")
    var url = window.location.href;
    var job;
    if(url.includes("savedjobs")){
      
        job = new Job(arr[i][ID],arr[i][TITLE],arr[i][LOCATION],arr[i][DESCRIPTION],arr[i][QUALIFICATIONS],arr[i][COMPANY],arr[i][IMAGE],arr[i][DATE],arr[i][LINK])
    }
    else if(url.includes("jobs")){
        job = new Job(arr[i][ID],arr[i][TITLE],arr[i][LOCATION],arr[i][DESCRIPTION],arr[i][QUALIFICATIONS],arr[i][COMPANY],arr[i][IMAGE],arr[i][DATE],arr[i][LINK])
    }
    else if(url.includes("profile")){
      return;
    }
// Elements initialization
    var card = document.createElement('div')
    var cardHeader = document.createElement('div')
    var titleContainer = document.createElement('div')
    var locationContainer = document.createElement('div')
    var divButtons = document.createElement('div')
    var date=document.createElement('span')
    var a = document.createElement('a')
    var locationContainer = document.createElement('div')
    var location=document.createElement('span')
    var saveJobButton=document.createElement('a')
    var company=document.createElement('span')
    var cardContent = document.createElement('div')
    var qualificationsContainer = document.createElement('div')
    var descriptionContainer = document.createElement('div')

//Set properties
    card.className="card shadow mb-4"
    card.id=job.id
    card.style.height = "400px";
    card.style.overflow = "scroll"; 
    card.style.textOverflow = 'ellipsis';
    cardHeader.className="d-block card-header py-3"
    saveJobButton.href="#"
    var data = [document.cookie, JSON.stringify(arr[i])]
    var removeData=[document.cookie, arr[i][ID]]
    if(window.location.href.includes("saved")){
      saveJobButton.innerHTML="Remove"
      saveJobButton.id=job.link
      saveJobButton.addEventListener('click', function() {
          data[2]=event.target.id
          removeSavedJob(removeData);
          card.style.display = "none";
          });
    }
    if(window.location.href.includes("jobs")){
      saveJobButton.innerHTML="save"
      saveJobButton.id="saveJobButton";
      console.log("ddddd",data)
      saveJobButton.addEventListener('click', function() {
          data[2]=job.id
          saveJob(data);
          });
    }
    else{
      return;
    }
    a.innerHTML=job.title
    a.href=job.link
    a.setAttribute('role', 'button');
    a.setAttribute('aria-expanded', 'true');
    a.setAttribute('aria-controls', 'collapseCardExample');
    date.innerHTML="Posted:"+job.date
    date.className="float-right"
    location.className="h6"
    location.innerHTML=job.location
    company.innerHTML=job.company+", "
    company.className="float-right mr-2"
    cardContent.className="collapse show"
    cardContent.id="collapseCardExample"
    qualificationsContainer.className="card-body"
    descriptionContainer.className="card-body"
    qualificationsContainer.innerHTML="Qualifications:<br>"+job.qualifications
    descriptionContainer.innerHTML="Description:<br>"+ job.description
      
      
//Elements connections 
    cardContent.appendChild(descriptionContainer)
    cardContent.appendChild(qualificationsContainer)
    cardHeader.appendChild(titleContainer)
    cardHeader.appendChild(locationContainer)
    locationContainer.appendChild(location)
    cardHeader.appendChild(divButtons)
    divButtons.appendChild(saveJobButton)
    titleContainer.appendChild(a)
    titleContainer.appendChild(date)
    titleContainer.appendChild(company)
    card.appendChild(cardHeader)
    card.appendChild(cardContent)
    document.getElementById("content").appendChild(card)
    a.id="title"+job.id;
    console.log("finish")
}


/*function jobSearch(){
  var searchJobButton=document.getElementById("searchBar")
  searchJobButton.addEventListener('keyup', function() {
    var i=1;
    var card = document.getElementById(i);
    var input = document.getElementById("searchBar").value;
    var title;
    while(card!=null){
      title = document.getElementById("title"+i).innerHTML
      if(title.toLowerCase().includes(input.toLowerCase()) == 1 || title.toUpperCase().includes(input.toUpperCase()) == 1 || input==null){
        card.style.display = "block"
      }else{
        card.style.display = "none"
      }
      i++;
      card = document.getElementById(i)
    }
  })
}
 
jobSearch()*/

