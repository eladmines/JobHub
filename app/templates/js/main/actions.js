import {getUserData} from '../actions.js'
function checkCookies(){
    let cookies = document.cookie;
    /*Everything is fine - the user has logged in.*/
    if(cookies){
       //Do nothing
    }
    /*In case the user hasn't logged in or the cookie has expired. */
    else{
        window.location.href = '\\';
    }
}

async function initPage(){
    var userData = await getUserData();
    document.getElementById("role").innerText=userData.role
    document.getElementById("company").innerText=userData.company
    document.getElementById("experience").innerText=userData.experience
    document.getElementById("skills").innerText=userData.skills
}

/*Functions to be executed */ 
checkCookies()
initPage()

