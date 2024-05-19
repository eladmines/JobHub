function checkCookies(){
    let cookies = document.cookie;
    if(cookies){
       //Do nothing
    }
    else{
        window.location.href = '\\';
    }
}
