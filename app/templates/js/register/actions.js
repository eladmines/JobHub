function inputsValidiation(){
    
    var firstName = document.getElementById("FirstName").value
    var lastName = document.getElementById("LastName").value
    var email = document.getElementById("InputEmail").value
    var inputPassword = document.getElementById("InputPassword").value
    var role = document.getElementById("Role").value
    var company = document.getElementById("Company").value
    var res = checkEmptyInputs(firstName,lastName,email,inputPassword,role,company)
    
    if(!res){
        alert("Empty inputs");
        return;
    } 
    res = emailValidation(email)
    if(!res){
        alert("Your email is not valid");
        return;
    }
    sendDetails(firstName,lastName,email,inputPassword,role,company)
    
}

function emailValidation(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
        return true;
    }
    else{
        return false;
    }
}

function checkEmptyInputs(firstName,lastName,email,inputPassword,role,company){
   
    if(firstName && lastName && email && inputPassword && role && company){
        return true;
    }
    return false;
}

function sendDetails(firstName,lastName,email,inputPassword,role,company){
    var firstName = document.getElementById("FirstName").value
    var lastName = document.getElementById("LastName").value
    var email = document.getElementById("InputEmail").value
    var inputPassword = document.getElementById("InputPassword").value
    var role = document.getElementById("Role").value
    var company = document.getElementById("Company").value
    
    fetch('/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({firstName: firstName,lastName:lastName,email:email,inputPassword:inputPassword,role:role,company:company}),
    
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
