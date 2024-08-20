import {getCookieValue,getUserSession, sendData,navigateToPage} from "./utils.js"
function initTopBar(){
    getNameByToken();
    assignClickActions();
}

async function getNameByToken(){
    var token = getUserSession();
    var nameValue = document.getElementById("name");
    if(token){
        var res = await sendData('/top-bar',token,'')
        nameValue.innerText="Welcome back, " + res[0]['firstname'] +" "+ res[0]['lastname'];
    }
    else{
        nameValue.innerText = "Login / Register";
    }
    
}

function assignClickActions(){
    document.addEventListener("DOMContentLoaded", function() {
        var nameElement = document.getElementById("name");
        nameElement.onclick = function() {
            if (nameElement.innerText === "Login / Register") {
                window.location.href = '/login'; // Navigate to home page if the text is "Login / Register"
            }
        };
    });
}

//Entry point
initTopBar()
