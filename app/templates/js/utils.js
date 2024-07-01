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
        else{
            array[i].style.borderColor="grey";
        }
    }
    return count==0 ? true : false;
}


export function checkPasswords(pass1,pass2){
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


export function saveData(endpoint, data, action,successMessage, failureMessage) {
    var res = sendData(endpoint, data, action);
  }

export function navigateToPage(url) {
    window.location.href = url;
}

export function isNumber(data){
    if(typeof(data) == 'number'){
        return true;
    }
    return false;
}

export function setCookie(data){
    document.cookie =encodeURIComponent(JSON.stringify(data));
}

export function getCookieValue(encodedCookie,attribute) {
    const decodedCookie = decodeURIComponent(encodedCookie);
    const cookieObject = JSON.parse(decodedCookie);
    
    return cookieObject[attribute];
}

export function almostReady(){
    alert("Available soon :)")
}

export function createFormattedDate(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var formattedDate = year+"-"+month+"-"+day;
    return formattedDate;
}