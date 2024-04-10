import {deployJobsContainer} from '../actions.js'
function sendCookie(){
    fetch('/savedjobs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(document.cookie),
})
.then(function (response){ 
    if(response.ok) {  
        response.json() 
        .then(function(response) {
            if(response){
                deployJobsContainer(response)
            }else{
                
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

sendCookie()