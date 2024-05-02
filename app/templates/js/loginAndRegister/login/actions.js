const INPUT_EMAIL="InputEmail"
const INPUT_PASSWORD="InputPassword"
function initArgs(){
    var username = document.getElementById(INPUT_EMAIL)
    var password = document.getElementById(INPUT_PASSWORD)
    var detailsArr=[username,password]
    inputsValidiation(detailsArr)
}