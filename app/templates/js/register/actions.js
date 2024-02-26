function sendDetails(){
    var firstName = document.getElementById("FirstName").value
    var lastName = document.getElementById("LastName").value
    var email = document.getElementById("InputEmail").value
    var inputPassword = document.getElementById("InputPassword").value
    var role = document.getElementById("Role").value
    var company = document.getElementById("Company").value
    fetch('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({firstName: firstName,lastName:lastName,email:email,inputPassword:inputPassword,role:role,company:company}),
});
}
