import {almostReady,getUserSession,removeSearchBar,getUserData} from '../utils.js'
import {setLineChart} from '../demo/chart-area-demo.js'
import {Profile} from '../models/profile-info.js'


export async function initPage(){
    removeSearchBar();
    var token = getUserSession();
    var details;
    if(token){
        details = await getUserData('/',token);
    }
    initUserData(details);
    initProfileData(details);
    document.getElementById("generateReport").addEventListener('click',almostReady);
}


async function initUserData(details){
    if(!details){
        document.getElementById("role").innerText="Guest"
        document.getElementById("company").innerText="-";
        document.getElementById("experience").innerText="-";
        document.getElementById("skills").innerText="-";
    } 
    else{
        document.getElementById("role").innerText=details["role"];
        document.getElementById("company").innerText=details["company"];
        document.getElementById("experience").innerText=details["experience"];
        document.getElementById("skills").innerText=details["skills"];
    }
    
}

async function initProfileData(details){
    var userSession = getUserSession()
    if(!userSession){
        document.getElementById("savedjobs-counter").innerText="-";
        document.getElementById("apply-today").innerText="-";
        document.getElementById("weekly-goal-percent").innerHTML="-";
        document.getElementById("weekly-goal-progress-bar").style.width="-";
        setLineChart([[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0]])
    }
    else{
        var userProfile = new Profile(details['id'],details['saved_jobs_count'],details['daily_applications_count'],details['weekly_applications_count'],details['monthly_applications_count'],details['weekly_applications_goal'],details['array_of_monthly_applications_count']);
        document.getElementById("savedjobs-counter").innerText=userProfile.getSavedJobsCount();
        document.getElementById("apply-today").innerText=userProfile.getDailyApplicationsCount();
        document.getElementById("weekly-goal-percent").innerHTML=userProfile.getWeeklyApplicationsGoal()+'%';
        document.getElementById("weekly-goal-progress-bar").style.width=userProfile.getWeeklyApplicationsCount()+'%';
        setLineChart(userProfile.getArrayOfMonthlyApplicationsCount())
        }
}

export function addLoaderToElements() {
    document.addEventListener("DOMContentLoaded", function() {
        const loadElements = document.getElementsByClassName('loadElement');
        if (loadElements.length > 0) {
            const loader = document.createElement('div');
            loader.className = 'loader';
            loader.innerHTML = '<span></span>';
            if (getUserSession()) {
                Array.from(loadElements).forEach(element => {
                    element.appendChild(loader.cloneNode(true));
                });
            }
        }
    });
}


