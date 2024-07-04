import {getCookieValue,getUserSession} from "./utils.js"
function initTopBar(){
    var user = getUserSession('user');
    document.getElementById("name").innerText="Welcome back, " + user.firstname +" "+user.lastname;
}
//Entry point
initTopBar()