import { getCookieValue,sendData, almostReady,sendDeleteRequest,sendGetRequest} from '../utils.js';
  
  export function createCommentsModal(jobTitle,jobId) {   
    var modal = document.createElement('div');
    modal.className = "modal fade";
    modal.id = "comments";
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", "exampleModalLabel");
    modal.setAttribute("aria-hidden", "true");

    var modalDialog = document.createElement('div');
    modalDialog.className = "modal-xl modal-dialog";
    modalDialog.role = "document";
  
    var modalContent = document.createElement('div');
    modalContent.className = "modal-content";
  
    // Create modal header
    var modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";
  
    var modalTitle = document.createElement('h5');
    modalTitle.className = "modal-title";
    modalTitle.id = "exampleModalLabel";
    modalTitle.textContent = jobTitle;
    
    var closeButton = document.createElement('button');
    closeButton.className = "close";
    closeButton.type = "button";
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    var closeIcon = document.createElement('span');
    closeIcon.setAttribute("aria-hidden", "true");
    closeIcon.innerHTML = "&times;";
    closeButton.appendChild(closeIcon);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
  
    // Create modal body
    var modalBody = document.createElement('div');
    modalBody.className = "modal-body";
    modalBody.id = "modal-body";
  
    var rowDiv = document.createElement('div');
    rowDiv.className = "row";
  
    var col2Div = document.createElement('div');
    col2Div.className = "col-lg-7";
  
    var innerDiv = document.createElement('div');
    innerDiv.className = "p-5";
  
    var innerTextCenter = document.createElement('div');
    innerTextCenter.className = "text-center";

  
    var formElement = document.createElement('form');
    formElement.className = "user";
    formElement.onsubmit = function() { return false; };
  
    var formGroupRow = document.createElement('div');
    formGroupRow.className = "form-group row";
  
    var formGroupCol = document.createElement('div');
    formGroupCol.className = "col-sm-12 mb-3 mb-sm-0";
    
    formGroupRow.appendChild(formGroupCol);
    formElement.appendChild(formGroupRow);
    innerDiv.appendChild(innerTextCenter);
    innerDiv.appendChild(formElement);
    col2Div.appendChild(innerDiv);
    rowDiv.appendChild(col2Div);


    // Append table to modal body and create table rows
   ;
  
    // Create modal footer
    var modalFooter = document.createElement('div');
    modalFooter.className = "modal-footer";
  
    var cancelButton = document.createElement('button');
    cancelButton.className = "btn btn-secondary";
    cancelButton.type = "button";
    cancelButton.setAttribute("data-dismiss", "modal");
    cancelButton.textContent = "Cancel";
  
    var sendCommentButton = document.createElement('a');
    sendCommentButton.id = "sendComment";
    sendCommentButton.className = "btn btn-primary change";
    sendCommentButton.href = "#";
    sendCommentButton.textContent = "Comment";
  
    modalFooter.appendChild(cancelButton);
    modalFooter.appendChild(sendCommentButton);
  
    // Assemble modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
  
    // Append modal to body
    document.body.appendChild(modal);
  
    $('#comments').modal('show');

    createProcessTable(modalBody);
}




function createProcessTable(modalBody) {
    const div = document.createElement('div');
    div.className = 'card-body';
    div.id = 'table-wrap';

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

    const headers = ['Date', 'Interviewer', 'Status', 'Notes','Actions'];

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
    div.appendChild(tableResponsiveDiv);

    modalBody.appendChild(div);
    createTableRow(tbody); // Pass tbody to createTableRow
}


async function getNotes(applicationId){
    var userId=getCookieValue('id');
    var res =  await sendGetRequest(`/app-process/${userId}/${applicationId}`);
    return res;
}


async function createTableRow(tbody,jobId) {
    var notes = await getNotes(398);
    const newRow = document.createElement('tr');

    const rowData = [
        notes[0]['date'],
        notes[0]['interviewer'],
        notes[0]['status'],
        notes[0]['notes'],
        '<a href="#" id="delete-btn" class="btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>'
    ];

    rowData.forEach(data => {
        const td = document.createElement('td');
        td.innerHTML = data;
        newRow.appendChild(td);
    });

    

    /*deleteButton.querySelector('#delete-btn').addEventListener('click', function(event) {
        event.preventDefault();
        deleteConnection("");
        newRow.remove();
    });*/


    tbody.appendChild(newRow);
    createInsertForm();
}

export function removeModalContent() {
    var elements = document.getElementsByClassName("modal fade");
    var elementsArray = Array.from(elements);
    elementsArray.forEach(function(element) {
        element.remove();
    });
}



      
function createFormattedDate(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var formattedDate = year+"-"+month+"-"+day;
    return formattedDate;
}


function createInsertForm() {
    const newRow = document.createElement('tr');

    const columns = [
        { id: 'newName', placeholder: 'Name' },
        { id: 'newPosition', placeholder: 'Position' },
        { id: 'newCompany', placeholder: 'Company' },
        { id: 'newPhone', placeholder: 'Phone' },
        
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
