
export function emailValidation(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email.value)){
        return true;
    }
    else{
        return false;
    }
}

export function checkEmptyInputsArray(array){
    let count=0;
    for(let i=0; i<array.length;i++){
        if(!array[i].value){
            array[i].style.borderColor="red";
            count++;
        }
        else{
            array[i].style.borderColor="grey";
        }
    }
    return count==0 ? true : false;
}


export function checkPasswords(pass1,pass2){
    if(pass1.value==pass2.value){
        return true;
    }
    return false;
}

/* Send data to a page with the required action */ 
export function sendData(endpoint, sentData, action) {
    let data = { action: action, sentData: sentData }; 
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getUserSession()
        },
        body: JSON.stringify(data),
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response)
            return false;
        }
    })
    .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    });
}

export function sendDeleteRequest(endpoint) {
    return fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getUserSession()
        }
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response)
            return false;
        }
    })
    .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; 
    });
}

export function sendGetRequest(endpoint) {
    return fetch(endpoint)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response)
            return false;
        }
    })
    .catch(function (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    });
}

export async function deleteData(endpoint,data) {
    if(data == null){
        console.error("Data is null");
        return false;
    }
    var res = await sendDeleteRequest(`/${endpoint}/${data}`);
    if (res == false){
        console.error("Failed to delete data");
        return false;
    }
    
    return true;
};


export function saveData(endpoint, data, action,successMessage, failureMessage) {
    var res = sendData(endpoint, data, action);
  }

export function navigateToPage(url) {
    window.location.href = url;
}

export function isNumber(data){
    if(typeof(data) == 'number'){
        return true;
    }
    return false;
}

export function setCookie(name, value) {
    document.cookie = `${name}=${value}; `;
}

export function getCookieValue(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}


export function getSessionValue(name){
    
}

export function getUserSession(){
    const userString = sessionStorage.getItem('token');
    // Parse the JSON string back into an object
    //const user = JSON.parse(userString);
    return userString;
}

export function almostReady(){
    alert("Coming soon...")
}


export function createFormattedDate(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var formattedDate = year+"-"+month+"-"+day;
    return formattedDate;
}

export function removeSearchBar(){
    document.getElementById("search-bar").style.visibility="hidden";
}

export function sendUserId(endpoint){
    var res=sendGetRequest(`${endpoint}/${getUserSession('token')}`);
    return res;
}

export function checkUserLogin(){
    if(!getCookieValue('id')){
        navigateToPage('/');
    }
}


export function removeKeysFromDict(dict,keysToRemove){
        return(Object.keys(dict)  
        .filter(key => !keysToRemove.includes(key)) 
        .reduce((newObj, key) => {  
            newObj[key] = dict[key];
            return newObj;
        }, {}));
};


export async function getUserData(endpoint,token){
    var res = await sendData(endpoint,token,"")
    return res;
}