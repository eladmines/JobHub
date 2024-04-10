import {Job} from '../models/job.js'

export function deployJobsContainer(data){
    var i=0
    while(i< data.length){
        buildJobContainer(data,i)
    i++
    }
  }

function buildJobContainer(arr,i)
  { 
var url = window.location.href;
var job;
if(url.includes("savedjobs")){
    job=JSON.parse(arr[i])
    job = new Job(job["title"],job["location"],job["description"],job["qualifications"],job["company"],job["image"],job["date"],job["link"])
}
else{
    job = new Job(arr[i]["title"],arr[i]["location"],arr[i]["description"],arr[i]["qualifications"],arr[i]["company"],arr[i]["image"],arr[i]["date"],arr[i]["link"])
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
      //Properties
      
      card.className="card shadow mb-4"
      card.style.height = "400px";
      card.style.overflow = "scroll"; 
      card.style.textOverflow = 'ellipsis';
      cardHeader.className="d-block card-header py-3"
      saveJobButton.innerHTML="save"
      saveJobButton.href="#"
      var data = [document.cookie, JSON.stringify(arr[i]) ]
      saveJobButton.setAttribute("onclick", "saveJob('" + data + "')")
      saveJobButton.setAttribute('data-info',job.link)
      a.innerHTML=job.title
      a.href=job.link
      //a.setAttribute('data-toggle', 'collapse');
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
  }
