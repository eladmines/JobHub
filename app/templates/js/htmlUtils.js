export async function createModal(title, id) {
    var modal = document.createElement('div');
    modal.className = "modal fade";
    modal.id = `modal${id}`;  // Unique ID
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `exampleModalLabel${id}`);
    modal.setAttribute("aria-hidden", "true");

    var modalDialog = document.createElement('div');
    modalDialog.className = "modal-xl modal-dialog";
    modalDialog.role = "document";

    var modalContent = document.createElement('div');
    modalContent.className = "modal-content";

    // Create modal header
    var modalHeader = document.createElement('div');
    modalHeader.className = "modal-header";

    var closeButton = document.createElement('button');
    closeButton.className = "close";
    closeButton.type = "button";
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    var modalTitle = document.createElement('h5');
    modalTitle.className = "modal-title";
    modalTitle.id = `exampleModalLabel${id}`;
    modalTitle.textContent = title;

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

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    document.body.appendChild(modal);

    $(`#modal${id}`).modal('show');

    return modalBody;
}



export function createTable(modalBody,headers) {
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
    return tbody;
}

export function createInsertForm(forms,item,func) {
    const newRow = document.createElement('tr');
    let formsArray=[];
    forms.forEach(form => {
        formsArray.push({ id: `new${form}`, placeholder: `${form}`})
    });

    formsArray.forEach(col => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.id = col.id;
        input.className = 'form-control';
        input.placeholder = col.placeholder;
        td.appendChild(input);
        newRow.appendChild(td);
        newRow.id=`inputs-row${item.id}`
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
button.addEventListener('click', func);
}

export async function createTableRow(tbody,item) {
    const newRow = document.createElement('tr');
    newRow.id=`tr-${item._id}`;

    const rowData = [
        ...Object.values(item), // Spread the values into the array
        '<a href="#" class=" deleteBtn btn btn-danger btn-circle"><i class="fas fa-trash"></i></a>'
    ];

    rowData.forEach(data => {
        const td = document.createElement('td');
        td.innerHTML = data;
        newRow.appendChild(td);
    });

    tbody.appendChild(newRow);
    return newRow;
}


export function deleteButtonInit(tbody,func,item){
    const button = tbody.lastElementChild.querySelector('.deleteBtn');
    button.addEventListener('click', function() {
        const row = button.closest('tr');
        row.remove();
        func(item);
    });
}

