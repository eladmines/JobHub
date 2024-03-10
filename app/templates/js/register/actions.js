

function emailValidation(){
    var email = document.getElementById("InputEmail").value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
        return sendDetails();
    }
    else{
        alert("Your email is not valid")
    }
}

function sendDetails(){
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
