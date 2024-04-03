var details;
function checkCookies(){
    let cookies = document.cookie;
    if(cookies){

    }
    else{
        window.location.href = '\\';
    }
}

async function getUserData() {
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
            return data;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchData() {
    var userData = await getUserData();
    return userData
}

(async () => {
    try {
        details = await fetchData();
        document.getElementById("name").innerText=details[0]
        document.getElementById("role").innerText=details[4]
    } catch (error) {
        console.error('Error', error);
    }
})().then(() => {
    
});