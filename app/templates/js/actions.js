import {User} from '../models/user.js'
/* Send data to a page with the required action */ 
export function sendData(page, sentData, action) {
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
    let cookies = document.cookie;
    try {
        const response = await fetch('/main', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cookies),
        });
        if (response.ok) {
            const data = await response.json();
            var user = User(userData[1],userData[2],userData[3],userData[5],userData[6])
            return user;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error(error);
    }
}
