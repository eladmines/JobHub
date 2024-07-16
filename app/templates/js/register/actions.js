import {User} from "../models/user.js";
import {checkEmptyInputsArray,emailValidation,checkPasswords,sendData,navigateToPage,isNumber} from "../utils.js"
const USER_DO_NOT_CREATE_YET_ID=0;

export function register(){
    var {user,passwords} = initRegisterArgs();
    var res = registerInputsValidiation(user,passwords);
    if(res){
        user.setFirstName(user.firstname.value);
        user.setLastName(user.lastname.value);
        user.setEmail(user.email.value.toLowerCase());
        user.setPassword(user.password.value);
        user.setRole(user.role.value);
        user.setCompany(user.company.value);
        user.setExperience(user.experience.value);
        user.setSkills(user.skills.value);
        res = userRegister(user);
    }
    if(res){
        navigateToPage('/');
    }
}

export function initRegisterArgs(){
    var firstName = document.getElementById("FirstName");
    var lastName = document.getElementById("LastName");
    var email = document.getElementById("InputEmail");
    var inputPassword = document.getElementById("InputPassword");
    var repeatPassword = document.getElementById("RepeatPassword");
    var role = document.getElementById("Role");
    var company = document.getElementById("Company");
    var experience = document.getElementById("Years");
    var skills = document.getElementById("skills");
    var inputUser=new User(USER_DO_NOT_CREATE_YET_ID,firstName,lastName,email,inputPassword,role,company,experience,skills);
    var passwords=[inputPassword,repeatPassword];
    return {
        user:inputUser,
        passwords:passwords
    };
}

export function checkEmptyInputsRegisterWrapper(user,passwords){
    var userObjectToarray = Object.values(user);
    //Remove 'id' attribute
    userObjectToarray = userObjectToarray.slice(1);
    var userInputsNotEmpty = checkEmptyInputsArray(userObjectToarray);
    var passwordsInputNotEmpty = checkEmptyInputsArray(passwords);
    if(userInputsNotEmpty && passwordsInputNotEmpty){
        return true;
    }
    return false;
}


function registerInputsValidiation(user,passwords){
    var res = checkEmptyInputsRegisterWrapper(user,passwords);
    if(!res){
        alert("Empty inputs");
        return;
    } 
    res = emailValidation(user.email)
    if(!res){
        user.email.style.borderColor="red";
        alert("Your email is not valid");
        return;
    }
    res = checkPasswords(passwords[0],passwords[1]);
    if(!res){
        passwords[0].style.borderColor="red";
        passwords[1].style.borderColor="red";
        alert("Check your password");
        return;
    }
    res = !isNaN(user.getExperience().value);
    if(!res){
        user.experience.style.borderColor="red";
        alert("Experience field must be a number");
        return;
    }
    return true;  
}

async function userRegister(user){
    var res = await sendData('register',user,'register');
    return res;
}

export function registerAlert(){
    alert("Coming soon...\nPlease create an account")
}