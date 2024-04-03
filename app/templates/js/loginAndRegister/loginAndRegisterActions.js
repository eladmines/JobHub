
function inputsValidiation(detailsArr){
    for(var i=0;i<detailsArr.length;i++)
    {
        detailsArr[i].style.borderColor = "grey";
    }
    var res = checkEmptyInputs(detailsArr)
    if(!res){
        alert("Empty inputs");
        return;
    } 
    res = emailValidation(detailsArr[0])
    if(!res){
        alert("Your email is not valid");
        return;
    }
    if(window.location.href.includes("register")){
        res = checkPasswords(detailsArr[3],detailsArr[4])
        if(res){
            alert("Check your password");
            return;
        }
    }
    var currentURL = window.location.href;  
    sendDetails(detailsArr,currentURL)
}


function checkPasswords(pass1,pass2){
    if(pass1==pass2){
        return true;
    }
    return false;
}

function emailValidation(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value)){
        return true;
    }
    else{
        return false;
    }
}

function checkEmptyInputs(detailsArr){
   var i=0, count=0;
   for(;i<detailsArr.length;i++){
    
    if(!detailsArr[i].value){
        detailsArr[i].style.borderColor = "red";
        count++;
    }
   }
   if(count == 0){
        return true;
   }
   return false;
}

function sendDetails(detailsArr,currentURL){
    var page,detailsDict;
    if(currentURL.includes("register")){
        page="/register";
        detailsDict={email: detailsArr[0].value,firstName:detailsArr[1].value,lastName:detailsArr[2].value,inputPassword:detailsArr[3].value,role:detailsArr[5].value,company:detailsArr[6].value};
    }
    else{
        page="/";
        detailsDict={email:detailsArr[0].value, password:detailsArr[1].value}
    }
    fetch(page, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(detailsDict),
})
.then(function (response){ 
    if(response.ok) {  
        response.json() 
        .then(function(response) {
            if(response){
                document.cookie = detailsArr[0].value;
                window.location.href = '\\main';
            }else{
                window.location.href = '\\';
                alert("Wrong username\\password")
            }
        });
    }
    else {
        throw Error('Something went wrong');
    }
})
.catch(function(error) {
    console.log(error);
})
};
