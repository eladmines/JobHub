import {getUserData} from '../actions.js'
import {sendData} from '../actions.js'
var user = await getUserData();
async function initPage(){
    document.getElementById("firstName").value=user.firstname
    document.getElementById("lastName").value=user.lastname
    document.getElementById("Email").value=user.email
    document.getElementById("Role").value=user.role
    document.getElementById("Company").value=user.company
}
function changeUserDetails(){
    sendData('/profile',user,'update user details')
}
/*Functions to be executed */ 
initPage()