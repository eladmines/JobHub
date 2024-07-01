import {getCookieValue} from "./utils.js"
function initTopBar(){
    document.getElementById("name").innerText=getCookieValue(document.cookie,"email");
}
/*Functions to be executed */ 
initTopBar()