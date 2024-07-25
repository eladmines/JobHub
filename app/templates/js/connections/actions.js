import { sendGetRequest, getCookieValue,sendData,deleteData} from "../utils.js";
import { Connection } from "../models/connections.js";
import {createTableRow,createTable,createInsertForm,deleteButtonInit} from "../htmlUtils.js"

export async function initPage(){
    //Init variables
    var body = document.getElementById("table-wrap");
    let headers = ['Name', 'Position','Company', 'Phone', 'Accounts','Actions'];
    let inputTitles=['Name', 'Position','Company', 'Phone', 'Accounts'];
    //Create table
    var tbody = createTable(body,headers);
    createInsertForm(inputTitles,"",addConnection);
    //Get data
    const connections = await getConnections();
    //Iterate
    for (let connection of connections) {
        var conn = new Connection(connection['id'],connection['user_id'],connection['name'],connection['position'],connection['company'],connection['phone'],connection['accountsData']);
        var connectionIdToDelete = conn._id;
        delete conn._user_id;
        delete conn._id;
        createTableRow(tbody, conn);
        deleteButtonInit(tbody,deleteConnection,connectionIdToDelete);
    }
}

export async function getConnections() {
    const res = await sendGetRequest(`/connections/${getCookieValue('id')}`);
    return res;
}

function deleteConnection(data) {
    var userId=getCookieValue('id');
    var connectionIdToDelete=data;
    data=[userId, connectionIdToDelete];
    var res = deleteData(`connections`,data);
    if(res == false){
        console.error("Failed to delete the connection");
        return false;
    }
    return true;
};


async function addConnection() {
    // Retrieve input values
    var newName = document.getElementById("newName").value;
    var newPosition = document.getElementById("newPosition").value;
    var newCompany = document.getElementById("newCompany").value;
    var newPhone = document.getElementById("newPhone").value;
    var newAccounts = document.getElementById("newAccounts").value;
    // Create new Connection object
    var newConnection = new Connection("-1", getCookieValue('id'),newName, newPosition, newCompany, newPhone,newAccounts);

    // Send data asynchronously
    var res = await sendData("/connections", newConnection); // Assuming sendData returns true/false

    // Check result
    if (res === false) {
        return false; // Handle error if sendData failed
    } else {
        var tbody=document.getElementById("table");
        delete newConnection._user_id;
        delete newConnection._id;
        createTableRow(tbody,newConnection); // Call createNewRow if sendData was successful
    }
    return true;
}
