export function sendData(page,sentData,action,succMessage,failMessage)
{
let data = { action: action, sentData: sentData }; // Wrap data in an object

fetch('/jobs', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(function (response) {
    if (response.ok) {
        return response.json(); // Return the parsed JSON
    } else {
        throw Error('Server response was not ok');
    }
})
.then(function (responseData) {
    // Check the responseData for success or failure
    if (responseData) {
        alert(succMessage || "Job has been saved");
    } else {
        alert(failMessage || "Something went wrong, try again");
    }
})
.catch(function (error) {
    console.error('There was a problem with the fetch operation:', error);
    // Optionally, you can handle the error more gracefully here
});
}