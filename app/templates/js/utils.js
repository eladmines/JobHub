import {User} from './models/user.js'
import {Profile} from './models/profile-info.js'

export function emailValidation(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value)){
        return true;
    }
    else{
        return false;
    }
}

export function checkEmptyInputsArray(array){
    let count=0;
    for(let i=0; i<array.length;i++){
        if(!array[i].value){
            array[i].style.borderColor="red";
            count++;
        }
    }
    return count==0 ? true : false;
}


export function checkPasswords(pass1,pass2){
    console.log(pass1.value +" "+pass2.value);
    if(pass1.value==pass2.value){
        return true;
    }
    return false;
}

/* Send data to a page with the required action */ 
export function sendData(page, sentData, action) {
    let data = { action: action, sentData: sentData }; // Wrap data in an object
    return fetch(page, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(function (response) {
        if (response.ok) {
            // Parse and return JSON response
            return response.json();
        } else {
            console.log(response)
            return false;
        }
    })
    .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to propagate it
    });
}

export async function getUserData() {
    let emailCookie = getCookie("email");
    try {
            const response = await fetch('/main', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailCookie),
        });
        if (response.ok) {
            const details = await response.json();
            var user=new User(details['id'],details['firstname'],details['lastname'],details['email'],details['role'],details['company'],details['experience'],details['skills']);
            var profile = new Profile(details['id'],details['numOfSavedJobs'],details['numOfTodayApplications'],details['numOfWeekApplications'],details['monthlyApplications'],10);
            var allDetails=[user,profile]
            return allDetails;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error(error);
    }
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function succFunc(message){
    alert(message)
  }
  function failFunc(message){
    alert(message)
  }

  export function saveData(endpoint, data, action,successMessage, failureMessage) {
    var res = sendData(endpoint, data, action);
  }

export function navigateToPage(url) {
    window.location.href = url;
}