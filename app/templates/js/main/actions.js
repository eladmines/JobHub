import {getUserData} from '../actions.js'

function almostReady(){
    document.getElementById('generateReport').addEventListener('click', function() {
        alert("Available soon :)")
    });
}

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
    var allDetails = await getUserData();
    var userInfo=allDetails[0];
    var profileInfo=allDetails[1];
    document.getElementById("role").innerText=userInfo.role;
    document.getElementById("company").innerText=userInfo.company;
    document.getElementById("experience").innerText=userInfo.experience;
    document.getElementById("skills").innerText=userInfo.skills;
    document.getElementById("savedjobs-counter").innerText=profileInfo.saved_jobs_counter;
    document.getElementById("apply-today").innerText=profileInfo.apply_today;
}

function removeSearchBar(){
    document.getElementById("search-bar").style.visibility="hidden";
}


/*Functions to be executed */ 
checkCookies()
initPage()
removeSearchBar();
almostReady()
