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
    var descJob = document.createElement('div')
    descJob.innerHTML=arr[i].description
    descJob.className="desc-job"
    var image = document.createElement('img')
    image.src=arr[i].image
    imageContainer.appendChild(image);
    descJobContainer.appendChild(titleJob)
    descJobContainer.appendChild(descJob)
    jobContainer.appendChild(imageContainer);
    jobContainer.appendChild(descJobContainer);
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
