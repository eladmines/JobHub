import {sendData,getUserSession,removeSearchBar,getCookieValue} from '../utils.js'
import {User} from '../models/user.js'

async function initPage(){
    var user = getUserSession();
    document.getElementById("firstName").value=user.firstname
    document.getElementById("lastName").value=user.lastname
    document.getElementById("Email").value=user.email
    document.getElementById("Role").value=user.role
    document.getElementById("Company").value=user.company
    document.getElementById("Experience").value=user.experience
    document.getElementById("Skills").value=user.skills
}

function changeUserDetails(user){
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("Email").value
    var role = document.getElementById("Role").value
    var company = document.getElementById("Company").value
    var experience = document.getElementById("Experience").value
    var skills = document.getElementById("Skills").value
    var user = new User(getCookieValue('id'),firstName,lastName,email,"",role,company,experience,skills);
    sendData('/profile',user,'update user details')
}
/*Functions to be executed */ 
initPage();
removeSearchBar();
var saveButton = document.getElementById("save-button");
saveButton.addEventListener('click',changeUserDetails);