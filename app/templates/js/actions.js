
    function deployJobsContainer(data){
      var i=0
      while(i< data.length){
          buildJobContainer(data,i)
      i++
      }
    }
    deployJobsContainer(data)
   
    function buildJobContainer(arr,i)
    {
        console.log(arr[0])
        // Elements initialization
        var card = document.createElement('div')
        var cardHeader = document.createElement('div')
        var titleContainer = document.createElement('div')
        var locationContainer = document.createElement('div')
        var date=document.createElement('span')
        var a = document.createElement('a')
        var locationContainer = document.createElement('div')
        var location=document.createElement('span')
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
        a.innerHTML=arr[i].title
        a.href=arr[i].link
        //a.setAttribute('data-toggle', 'collapse');
        a.setAttribute('role', 'button');
        a.setAttribute('aria-expanded', 'true');
        a.setAttribute('aria-controls', 'collapseCardExample');
        date.innerHTML="Posted:"+arr[i].date
        date.className="float-right"
        location.className="h6"
        location.innerHTML=arr[i].location
        company.innerHTML=arr[i].company+", "
        company.className="float-right mr-2"
        cardContent.className="collapse show"
        cardContent.id="collapseCardExample"
        qualificationsContainer.className="card-body"
        descriptionContainer.className="card-body"
        qualificationsContainer.innerHTML="Qualifications:<br>"+arr[i].qualifications
        descriptionContainer.innerHTML="Description:<br>"+ arr[i].description

        //Elements connections 
        cardContent.appendChild(descriptionContainer)
        cardContent.appendChild(qualificationsContainer)
        cardHeader.appendChild(titleContainer)
        cardHeader.appendChild(locationContainer)
        locationContainer.appendChild(location)
        titleContainer.appendChild(a)
        titleContainer.appendChild(date)
        titleContainer.appendChild(company)
        card.appendChild(cardHeader)
        card.appendChild(cardContent)
        document.getElementById("content").appendChild(card)
    }
