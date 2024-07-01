import {getCookieValue,sendData,almostReady} from '../utils.js'
import {setLineChart} from '../demo/chart-area-demo.js'
import {Profile} from '../models/profile-info.js'

export async function initPage(){
    initUserData();
    initProfileData();
    removeSearchBar();
    document.getElementById("generateReport").addEventListener('click',almostReady);
}
function removeSearchBar(){
    document.getElementById("search-bar").style.visibility="hidden";
}

function initUserData(){
    document.getElementById("role").innerText=getCookieValue(document.cookie,'role')
    document.getElementById("company").innerText=getCookieValue(document.cookie,'company')
    document.getElementById("experience").innerText=getCookieValue(document.cookie,'experience')
    document.getElementById("skills").innerText=getCookieValue(document.cookie,'skills')  
}

async function initProfileData(){
    var id = getCookieValue(document.cookie,'id');
    var profileData = await sendData('/main',id,'get profile data');
    var userProfile = new Profile(id,profileData['saved_jobs_count'],profileData['daily_applications_count'],profileData['weekly_applications_count'],profileData['monthly_applications_count'],profileData['weekly_applications_goal'],profileData['array_of_monthly_applications_count']);
    document.getElementById("savedjobs-counter").innerText=userProfile.getSavedJobsCount();
    document.getElementById("apply-today").innerText=userProfile.getDailyApplicationsCount();
    document.getElementById("weekly-goal-percent").innerHTML=userProfile.getWeeklyApplicationsGoal()+'%';
    document.getElementById("weekly-goal-progress-bar").style.width=userProfile.getWeeklyApplicationsCount()+'%';
    setLineChart(userProfile.getArrayOfMonthlyApplicationsCount())
}
