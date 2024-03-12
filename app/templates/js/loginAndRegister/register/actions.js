function initArgs(){
    var firstName = document.getElementById("FirstName")
    var lastName = document.getElementById("LastName")
    var email = document.getElementById("InputEmail")
    var inputPassword = document.getElementById("InputPassword")
    var repeatPassword = document.getElementById("RepeatPassword")
    var role = document.getElementById("Role")
    var company = document.getElementById("Company")
    var detailsArr=[email,firstName,lastName,inputPassword,repeatPassword,role,company]
    inputsValidiation(detailsArr)
}

