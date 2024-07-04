import {checkEmptyInputsArray,emailValidation,sendData,navigateToPage,setCookie} from "../utils.js";
import {User} from "../models/user.js";
const INPUT_EMAIL="InputEmail"
const INPUT_PASSWORD="InputPassword"
const USER_DO_NOT_LOGIN_YET_ID=0;

export async function login(){
    var {user,password} = initLoginArgs();
    var res = loginInputsValidiation(user,password);
    if(res){
        var user = new User(USER_DO_NOT_LOGIN_YET_ID,null,null,user.value,password.value,null,null,null,null);
        user = await authenticateDetails(user);
    }
    if(user){
        var userString  = JSON.stringify(user);
        // Store the JSON string in sessionStorage
        sessionStorage.setItem('user', userString);
        setCookie('id',user.id)
        navigateToPage('/main');
    }
    else{
        alert("Wrong username/password")
    }
}


export function initLoginArgs(){
    var username = document.getElementById(INPUT_EMAIL);
    var password = document.getElementById(INPUT_PASSWORD);
    return {
        user:username,
        password:password
    }
}

function loginInputsValidiation(username,password){
    var res = checkEmptyInputsLoginWrapper(username,password);
    if(!res){
        alert("Empty inputs");
        return;
    } 
    res = emailValidation(username)
    if(!res){
        alert("Your email is not valid");
        return;
    }
    return true;  
}

export function checkEmptyInputsLoginWrapper(user,password){
    var loginDetails=[user,password];
    var userInputsNotEmpty = checkEmptyInputsArray(loginDetails);
    if(userInputsNotEmpty){
        return true;
    }
    return false;
}

async function authenticateDetails(user){
    var res = await sendData('/',user,'autentication');
    return res;
}


export function forgotPasssowrd(){
    alert("Coming soon...");
    /*document.getElementById("InputPassword").placeholder = "Captcha place (not available right now)";
    document.getElementById("remember-me-btn").style.display = "none";
    document.getElementById("google-register-btn").style.display = "none";
    document.getElementById("facebook-register-btn").style.display = "none";
    document.getElementById("login-btn").value = "Reset";
    document.getElementById("title").innerHTML = "Reset your password";*/
}