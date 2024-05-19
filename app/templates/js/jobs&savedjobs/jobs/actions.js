import {sendData} from '../../actions.js'

function succFunc(){
  alert("job has been saved")
}
function failFunc(){
  alert("Something went wrong, try again")
}
function saveJob(data){
  var res = sendData("/jobs",data,'save job')
  if(res == false){
    failFunc();
  }else{
    succFunc();
  }
  };
export {saveJob}


