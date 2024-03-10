function inputsValidiation(){
    
    var firstName = document.getElementById("FirstName")
    var lastName = document.getElementById("LastName")
    var email = document.getElementById("InputEmail")
    var inputPassword = document.getElementById("InputPassword")
    var repeatPassword = document.getElementById("RepeatPassword")
    var role = document.getElementById("Role")
    var company = document.getElementById("Company")
    var detailsArr=[firstName,lastName,email,inputPassword,repeatPassword,role,company]
    for(var i=0;i<detailsArr.length;i++)
    {
        detailsArr[i].style.borderColor = "grey";
    }
    var res = checkEmptyInputs(detailsArr)
    
    if(!res){
        alert("Empty inputs");
        return;
    } 
    res = emailValidation(email)
    if(!res){
        alert("Your email is not valid");
        return;
    }
    sendDetails(detailsArr)
    
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

function sendDetails(detailsArr){
    alert("sdfsd")
    fetch('/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({firstName: detailsArr[0].value,lastName:detailsArr[1].value,email:detailsArr[2].value,inputPassword:detailsArr[3].value,role:detailsArr[4].value,company:detailsArr[5].value,company:detailsArr[6].value}),
    
})
.then(function (response){ 

    if(response.ok) {  
        response.json() 
        .then(function(response) {
            console.log(response)
        });
    }
    else {
        throw Error('Something went wrong');
    }
})
.catch(function(error) {
    console.log(error);
})};
