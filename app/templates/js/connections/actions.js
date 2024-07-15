import { sendGetRequest, getCookieValue,sendData,deleteData} from "../utils.js";
import { Connection } from "../models/connections.js";

export async function initPage() {
    createConnectionRow();
    const rows = await getConnections();
    if(rows){
    for (const row of rows) {
        const connection = new Connection(
            row['id'],
            row['user_id'],
            row['name'],
            row['position'],
            row['company'],
            row['phone'],
            row['linkdin_account']
        );
        createTableRow(connection);
    }
}
    createInsertForm();
}

export async function getConnections() {
    const res = await sendGetRequest(`/connections/${getCookieValue('id')}`);
    return res;
}

function createConnectionRow() {
    const tableResponsiveDiv = document.createElement('div');
    tableResponsiveDiv.className = 'table-responsive';

    const wrapperDiv = document.createElement('div');
    wrapperDiv.id = 'dataTable_wrapper';
    wrapperDiv.className = 'dataTables_wrapper dt-bootstrap4';

    const row1Div = document.createElement('div');
    row1Div.className = 'row';

    const col1Div = document.createElement('div');
    col1Div.className = 'col-sm-12 col-md-6';

    const lengthDiv = document.createElement('div');
    lengthDiv.className = 'dataTables_length';
    lengthDiv.id = 'dataTable_length';

    col1Div.appendChild(lengthDiv);

    const col2Div = document.createElement('div');
    col2Div.className = 'col-sm-12 col-md-6';

    const filterDiv = document.createElement('div');
    filterDiv.id = 'dataTable_filter';
    filterDiv.className = 'dataTables_filter';

    col2Div.appendChild(filterDiv);
    row1Div.appendChild(col1Div);
    row1Div.appendChild(col2Div);

    const row2Div = document.createElement('div');
    row2Div.className = 'row';

    const colDiv = document.createElement('div');
    colDiv.className = 'col-sm-12';

    const table = document.createElement('table');
    table.className = 'table table-bordered dataTable';
    table.id = 'dataTable';
    table.setAttribute('width', '100%');
    table.setAttribute('cellspacing', '0');
    table.setAttribute('role', 'grid');
    table.setAttribute('aria-describedby', 'dataTable_info');
    table.style.width = '100%';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.setAttribute('role', 'row');

    const headers = ['Name', 'Position', 'Company', 'Phone', 'Accounts (working on it..)'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.className = 'sorting';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');
    tbody.id = 'table';

    table.appendChild(thead);
    table.appendChild(tbody);
    colDiv.appendChild(table);
    row2Div.appendChild(colDiv);

    wrapperDiv.appendChild(row1Div);
    wrapperDiv.appendChild(row2Div);
    tableResponsiveDiv.appendChild(wrapperDiv);

    document.getElementById("table-wrap").appendChild(tableResponsiveDiv);
    
}

function createTableRow(connection) {
    
    const newRow = document.createElement('tr');
    newRow.className = connection.id;

    const rowData = [
        connection.name,
        connection.position,
        connection.company,
        connection.phone,
        //connection.accounts,
        
    ];

    rowData.forEach(data => {
        const td = document.createElement('td');
        td.textContent = data;
        newRow.appendChild(td);
    });


    const td = document.createElement('td');
    td.innerHTML = `<a href="#" class="btn btn-primary btn-circle"><i class="fab fa-linkedin"></i></a>&nbsp;<a href="#" class="btn btn-dark btn-circle"><i class="fab fa-github"></i></a>&nbsp;<a href="#" class="btn btn-danger btn-circle"><i class="fab fa-gitlab"></i></a>`;
    newRow.appendChild(td);
    const deleteButton = document.createElement('td');
    deleteButton.innerHTML = '<a href="#" class="btn btn-warning btn-circle"><i class="fas fa-pen"></i></a>&nbsp;<a href="#" id="delete-btn" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>';
    deleteButton.querySelector('#delete-btn').addEventListener('click', function(event) {
        event.preventDefault();
        deleteConnection(connection.id);
        newRow.remove();
    });
    newRow.appendChild(deleteButton);

    document.getElementById('table').appendChild(newRow);

}

function createInsertForm() {
    const newRow = document.createElement('tr');

    const columns = [
        { id: 'newName', placeholder: 'Name' },
        { id: 'newPosition', placeholder: 'Position' },
        { id: 'newCompany', placeholder: 'Company' },
        { id: 'newPhone', placeholder: 'Phone' },
        { id: 'newAccounts', placeholder: 'Linkdin,Github,Gitlab' }
        
    ];

    columns.forEach(col => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.id = col.id;
        input.className = 'form-control';
        input.placeholder = col.placeholder;
        td.appendChild(input);
        newRow.appendChild(td);
        newRow.id="inputs-row"
    });

    const td = document.createElement('td');
    const button = document.createElement('button');
    button.id = 'addRowButton';
    button.className = 'btn btn-primary';
    button.textContent = 'Add';
    td.appendChild(button);
    newRow.appendChild(td);

    document.getElementById('table').appendChild(newRow);

     // Event listener setup
button.addEventListener('click', addConnection);

// Asynchronous function to add connection
async function addConnection() {
    // Retrieve input values
    var newName = document.getElementById("newName").value;
    var newPosition = document.getElementById("newPosition").value;
    var newCompany = document.getElementById("newCompany").value;
    var newPhone = document.getElementById("newPhone").value;
    var newAccounts = document.getElementById("newAccounts").value;

    // Create new Connection object
    var newConnection = new Connection("-1", getCookieValue("id"), newName, newPosition, newCompany, newPhone, newAccounts);

    // Send data asynchronously
    var res = await sendData(`/connections`, newConnection); // Assuming sendData returns true/false

    // Check result
    if (res === false) {
        return false; // Handle error if sendData failed
    } else {
        
        createNewRow(columns); // Call createNewRow if sendData was successful
    }
    return true;
}
}

// Function to create new row in the table
function createNewRow(columns) {
    const dataRow = document.createElement('tr');
    columns.forEach(col => {
        const td = document.createElement('td');
        const inputVal = document.getElementById(col.id).value;
        td.textContent = inputVal;
        dataRow.appendChild(td);
    });

    const deleteButton = document.createElement('td');
    deleteButton.innerHTML = '<a href="#" class="btn btn-warning btn-circle"><i class="fas fa-pen"></i></a>&nbsp;<a href="#" id="delete-btn" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>';
    dataRow.appendChild(deleteButton);
    
    document.getElementById('table').appendChild(dataRow);
    var inputRow = document.getElementById('inputs-row');
    table.insertBefore(dataRow,inputRow);
    // Clear input values after appending row
    columns.forEach(col => {
        document.getElementById(col.id).value = '';
    });
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
    if(window.location.pathname == '/applications'){
        //document.getElementById(application_to_delete).style.display="none";
    }
    return true;
};