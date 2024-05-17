import {fetchData} from '../actions.js'
const NAME="name",ROLE="role";
var details;

function checkCookies(){
    let cookies = document.cookie;

    if(cookies){
        
    }
    else{
        window.location.href = '\\';
    }
}



(async () => {
    try {
        details = await fetchData();
        document.getElementById(NAME).innerText=details[1]
        document.getElementById(ROLE).innerText=details[5]
    } catch (error) {
        console.error('Error', error);
    }
})().then(() => {
    
});