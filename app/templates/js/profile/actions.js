import {getUserData} from '../actions.js'
async function initPage(){
    var userData = await getUserData();
    document.getElementById("firstName").value=userData[5]
    document.getElementById("lastName").value=userData[5]
    document.getElementById("Email").value=userData[5]
    document.getElementById("Company").value=userData[5]
    document.getElementById("Role").value=userData[5]
    
}

/*Functions to be executed */ 
initPage()