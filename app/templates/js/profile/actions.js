import {sendData,getUserSession,removeSearchBar,getCookieValue,getUserData} from '../utils.js'
import {User} from '../models/user.js'

async function initPage(){
    var token = getUserSession();
    var user = await getUserData('/profile',token);
    document.getElementById("firstName").value=user.firstname
    document.getElementById("lastName").value=user.lastname
    document.getElementById("Role").value=user.role
    document.getElementById("Company").value=user.company
    document.getElementById("Experience").value=user.experience
    document.getElementById("Skills").value=user.skills
}

function changeUserDetails(user){
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var role = document.getElementById("Role").value
    var company = document.getElementById("Company").value
    var experience = document.getElementById("Experience").value
    var skills = document.getElementById("Skills").value
    var user = new User("",firstName,lastName,email,"",role,company,experience,skills);
    var token = getUserSession()
    var data = [user,token]
    var res = sendData('/profile/update',data,'update user details');
}
/*Functions to be executed */ 
initPage();
removeSearchBar();
var saveButton = document.getElementById("save-button");
saveButton.addEventListener('click',changeUserDetails);