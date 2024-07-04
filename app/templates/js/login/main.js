import {login,forgotPasssowrd} from './actions.js';
import {registerAlert} from '../register/actions.js';
//Entry point
document.getElementById("login-btn").addEventListener("click",login);
document.getElementById("google-register-btn").addEventListener("click",registerAlert);
document.getElementById("facebook-register-btn").addEventListener("click",registerAlert);
document.getElementById("forgot-password-btn").addEventListener("click",forgotPasssowrd);
