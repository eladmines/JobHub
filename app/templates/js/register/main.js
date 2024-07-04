import {register,registerAlert} from './actions.js'
//Entry point
document.getElementById("registerBtn").addEventListener("click",register);
document.getElementById("google-register-btn").addEventListener("click",registerAlert);
document.getElementById("facebook-register-btn").addEventListener("click",registerAlert);
