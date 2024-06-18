import {User} from './models/user.js'
/* Send data to a page with the required action */ 
export  function sendData(page, sentData, action) {
    let data = { action: action, sentData: sentData }; // Wrap data in an object
    return fetch(page, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(function (response) {
        if (response.ok) {
            // Parse and return JSON response
            return response.json();
        } else {
            console.log(response)
            return false;
        }
    })
    .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error to propagate it
    });
}

export async function getUserData() {
    let emailCookie = getCookie("email");
    try {
            const response = await fetch('/main', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailCookie),
        });
        if (response.ok) {
            const userData = await response.json();
            var user=new User(userData[0],userData[1],userData[2],userData[3],userData[7],userData[5],userData[6],userData[8],userData[9],userData[10]);
            return user;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error(error);
    }
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

