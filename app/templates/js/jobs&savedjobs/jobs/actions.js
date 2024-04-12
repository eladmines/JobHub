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
                  alert("Job has been saved")
              }else{
                alert("Something went wrong, try again")
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
  
export {saveJob}



