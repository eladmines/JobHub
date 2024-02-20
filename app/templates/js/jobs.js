function buildJobContainer(arr,i){
    var jobContainer = document.createElement('div')
    jobContainer.className="job-container "+arr[i].company
    var imageContainer = document.createElement('div')
    imageContainer.className="image-container"
    var descJobContainer = document.createElement('div')
    descJobContainer.className="desc-job-container"
    var titleJob = document.createElement('div')
    titleJob.innerHTML=arr[i].title
    titleJob.className="title-job"
    var dateJob = document.createElement('div')
    dateJob.innerHTML=arr[i].date
    dateJob.className="date-job"
    var descJob = document.createElement('div')
    descJob.innerHTML=arr[i].description
    descJob.className="desc-job"

    var buttomContainer = document.createElement('div')
  
    buttomContainer.className="buttomContainer-job"

    var image = document.createElement('img')
    image.src=arr[i].image
    
    imageContainer.appendChild(image);
    descJobContainer.appendChild(dateJob)
    descJobContainer.appendChild(titleJob)
    
    descJobContainer.appendChild(descJob)
    
    jobContainer.appendChild(imageContainer);
    jobContainer.appendChild(descJobContainer);
    descJobContainer.appendChild(buttomContainer);
    
    var locationJob = document.createElement('div')
    
    locationJob.className="Location-job"
    buttomContainer.appendChild(locationJob)

    var seeMoreJob = document.createElement('div')
    
    seeMoreJob.className="seeMore-Job"
    buttomContainer.appendChild(seeMoreJob)



  



    // Assuming arr is your array and i is the index you want to display
 // Replace "yourElementId" with the actual ID of your target element

// Create a div element
var divElement = document.createElement("div");

// Create an img element
var imgElement = document.createElement("img");
imgElement.src = "https://www.freeiconspng.com/thumbs/location-icon-png/orange-location-icon-png-18.png" // Replace "path/to/your/image.jpg" with the actual path to your image

// Append the img element to the div element
divElement.appendChild(imgElement);

// Create a text node with the location information from the array
var textNode = document.createTextNode(arr[i].location);

// Append the text node to the div element
divElement.appendChild(textNode);
locationJob.appendChild(divElement)


//see more

var seeMoreDiv = document.createElement("div");

// Create an img element
var imgElementPlus = document.createElement("img");
imgElementPlus.src = "https://icon-library.com/images/plus-sign-icon-png/plus-sign-icon-png-16.jpg" // Replace "path/to/your/image.jpg" with the actual path to your image

// Append the img element to the div element
seeMoreDiv.appendChild(imgElementPlus);

// Create a text node with the location information from the array
var textNodeSeeMore = document.createTextNode("See More...");

// Append the text node to the div element
seeMoreDiv.appendChild(textNodeSeeMore);
seeMoreJob.appendChild(seeMoreDiv)



    document.getElementById("wrapper-jobs-container").appendChild(jobContainer)
}

function handleClick(checkBox){
  
    var i=0
    className = "job-container "+checkBox.value
    if(checkBox.checked){  
      while(i<document.getElementsByClassName(className).length){
        document.getElementsByClassName(className)[i].style.display = "flex";
        i++
      }
    }
    else{
      while(i<document.getElementsByClassName(className).length){
        document.getElementsByClassName(className)[i].style.display = "none";
        i++
      }
    }
  }

    //var data = JSON.parse("{{jobs|safe}}".replaceAll("'",'"'))
  //var html='<div class="job-container"><div class="image-container"><img src="" id="img"></div></div>'
  //document.getElementById("myImage").src="https://www.thoughtco.com/thmb/aNuco6X-VAoksgU-wUxRCSfR9Is=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/intel-logo-56a6fa195f9b58b7d0e5ce3a.png";
  //console.log(data)*/
