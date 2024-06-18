import {getCookie} from "./actions.js"
function initTopBar(){
    document.getElementById("name").innerText=getCookie("email");
}
/*Functions to be executed */ 
initTopBar()