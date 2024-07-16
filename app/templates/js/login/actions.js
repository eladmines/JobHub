import {checkEmptyInputsArray,emailValidation,sendData,navigateToPage,setCookie} from "../utils.js";
import {registerAlert} from '../register/actions.js';
import {User} from "../models/user.js";
const INPUT_EMAIL="InputEmail"
const INPUT_PASSWORD="InputPassword"
const USER_DO_NOT_LOGIN_YET_ID=0;

export function initLoginPage(){
    var loginBtnHandle = document.getElementById("login-btn").addEventListener("click",login);
    var googleRegisterHandler = document.getElementById("google-register-btn").addEventListener("click",registerAlert);
    var facebookRegisterHandler = document.getElementById("facebook-register-btn").addEventListener("click",registerAlert);
}


export async function login() {
        var username = document.getElementById(INPUT_EMAIL);
        var password = document.getElementById(INPUT_PASSWORD);
        if (!username || !password){
            console.error('Element with ID "InputEmail" or "InputPassword" not found');
            return 0;
        }
        var res = loginInputsValidiation(username, password);
        if(!res){
            return 0;
        }
        try {
            var userObj = new User(USER_DO_NOT_LOGIN_YET_ID, null, null, username.value.toLowerCase(), password.value, null, null, null, null);
        } catch (error) {
            console.error("Create user failed:", error);
            return 0;
        }
            userObj = await authenticateDetails(userObj);
            if(!userObj){
                alert("Wrong email/password , please try again.");
                return 0;
            }
            if (userObj) {
                var userString = JSON.stringify(userObj);
                sessionStorage.setItem('user', userString);
                setCookie('id', userObj.id);
                navigateToPage('/main');
            } 
        }

export function initLoginArgs(){
    try{
        var username = document.getElementById(INPUT_EMAIL);
        var password = document.getElementById(INPUT_PASSWORD);
        if(!username || !password){
            throw new Error ('Username or password input element not found');
        }
        return {
            user:username,
            password:password
        }
    }
    catch (error){
        console.error('An error occurred:', error);
        return null;
    }
}

function loginInputsValidiation(username,password){
    var res = checkEmptyInputsLoginWrapper(username,password);
    if(!res){
        alert("Empty inputs");
        return false;
    } 
    res = emailValidation(username)
    if(!res){
        alert("Your email is not valid");
        return false;
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
}

export function deleteCookies(){
    document.cookie = 'id' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}