import {getCookie} from "../../actions.js"
import {sendData} from "../../actions.js"
import { getCookieValue } from "../../utils.js";
function sendUserId(){
    var res=sendData('/jobs',getCookieValue(document.cookie,'id'),'Send user id');
    return res;
}

function removeCommentsButton(endpoint,button){
    if(endpoint=="/jobs"){
        button.style.display="none"
    }
}
export {sendUserId,removeCommentsButton}
