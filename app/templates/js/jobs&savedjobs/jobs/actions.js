import { saveData } from '../../actions.js';

function saveJob(data) {
  saveData("/jobs", data, "save job" ,"Job has been saved");
}

function saveApp(data) {
  saveData("/applications", data, "save application" ,"Application has been saved");
}

export {saveJob,saveApp}


