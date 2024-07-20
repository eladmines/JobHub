

export function createModal() {   
    var modal = document.createElement('div');
    modal.className = "modal fade";
    modal.id = "modal";
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
  
    $('#modal').modal('show');

    createProcessTable(modalBody);
}

export function createButton(type,className,divName,textContent,href,){
    var button = document.createElement('button');
    button.className = "btn btn-secondary";
    button.type = "button";
    button.textContent = "Cancel";
}