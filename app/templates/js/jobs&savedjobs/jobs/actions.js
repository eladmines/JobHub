import {sendData} from '../../actions.js'
function saveJob(data){
  sendData("/jobs",data,'save job',"Job has been saved","Something went wrong, try again")
  };
export {saveJob}



