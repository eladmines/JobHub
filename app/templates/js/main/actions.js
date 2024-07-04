import {sendData,almostReady,getUserSession,removeSearchBar} from '../utils.js'
import {setLineChart} from '../demo/chart-area-demo.js'
import {Profile} from '../models/profile-info.js'

export async function initPage(){
    initUserData();
    initProfileData();
    removeSearchBar();
    document.getElementById("generateReport").addEventListener('click',almostReady);
}


function initUserData(){
    var user = getUserSession();
    document.getElementById("role").innerText=user.role;
    document.getElementById("company").innerText=user.company;
    document.getElementById("experience").innerText=user.experience;
    document.getElementById("skills").innerText=user.skills;
}

async function initProfileData(){
    var id = getUserSession().id;
    var profileData = await sendData('/main',id,'get profile data');
    var userProfile = new Profile(id,profileData['saved_jobs_count'],profileData['daily_applications_count'],profileData['weekly_applications_count'],profileData['monthly_applications_count'],profileData['weekly_applications_goal'],profileData['array_of_monthly_applications_count']);
    document.getElementById("savedjobs-counter").innerText=userProfile.getSavedJobsCount();
    document.getElementById("apply-today").innerText=userProfile.getDailyApplicationsCount();
    document.getElementById("weekly-goal-percent").innerHTML=userProfile.getWeeklyApplicationsGoal()+'%';
    document.getElementById("weekly-goal-progress-bar").style.width=userProfile.getWeeklyApplicationsCount()+'%';
    setLineChart(userProfile.getArrayOfMonthlyApplicationsCount())
}
