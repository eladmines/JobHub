import { sendGetRequest, getCookieValue,sendData,deleteData, getUserSession} from "../utils.js";
import { Connection } from "../models/connections.js";
import {createTableRow,createTable,createInsertForm,deleteButtonInit} from "../htmlUtils.js"

export async function initPage(){
    //Init variables
    var body = document.getElementById("table-wrap");
    let headers = ['Name', 'Position','Company', 'Phone', 'Accounts (Coming soon..)','Actions'];
    let inputTitles=['Name', 'Position','Company', 'Phone', 'Accounts'];
    //Create table
    var tbody = await createTable(body,headers);
    createInsertForm(inputTitles,"",addConnection);
    //Get data
    const connections = await getConnections();
    //Iterate
    for (let connection of connections) {
        var conn = new Connection(connection['id'],connection['name'],connection['position'],connection['company'],connection['phone'],connection['accountsData']);
        var connectionIdToDelete = conn.id;
        delete conn.id;
        createTableRow(tbody, conn);
        deleteButtonInit(tbody,deleteConnection,connectionIdToDelete);
       
    }
    document.getElementById("addRowButton").addEventListener('click', function() {
        addConnection(); 
    });
    
}

export async function getConnections() {
    const res = await sendGetRequest(`/connections/${getUserSession()}`);
    return res;
}

function deleteConnection(connectionIdToDelete) {
    var res = deleteData('delete-connection',connectionIdToDelete);
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
    var newConnection = new Connection("-1",newName, newPosition, newCompany, newPhone,newAccounts);
    delete newConnection.id;
    var token = getUserSession();
    var data=[token,newConnection]
    // Send data asynchronously
    var res = await sendData("/connections", newConnection); // Assuming sendData returns true/false
    // Check result
    if (res === false) {
        return false; // Handle error if sendData failed
    } else {
        var tbody=document.getElementById("table");
        var idConnection=res;
        delete newConnection._id;
        createTableRow(tbody,newConnection); // Call createNewRow if sendData was successful
        document.getElementById("newName").value="";
        document.getElementById("newPosition").value="";
        document.getElementById("newCompany").value="";
        document.getElementById("newPhone").value="";
        document.getElementById("newAccounts").value="";
        deleteButtonInit(tbody,deleteConnection,idConnection);
    }
    return true;
}
