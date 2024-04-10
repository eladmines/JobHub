import {Job} from '../../models/job.js'
import {deployJobsContainer} from '../actions.js'
  function saveJob(data){
      fetch('/jobs', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(data),
  })
  .then(function (response){ 
      if(response.ok) {  
          response.json() 
          .then(function(response) {
              if(response){
                  document.cookie = detailsArr[0].value;
                  window.location.href = '\\main';
              }else{
                  window.location.href = '\\';
                  alert("Wrong username\\password")
              }
          });
      }
      else {
          throw Error('Something went wrong');
      }
  })
  .catch(function(error) {
      console.log(error);
  })
  };
  

  deployJobsContainer(data)