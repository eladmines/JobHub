import { getCookie,sendData } from '../actions.js';
export function createCommentsDivs(arr,i){
    var rowComments = document.createElement('div')
    var buttons = document.createElement('div')
    var deleteButton = document.createElement('a');
    var textCommentContent = document.createElement('p');
    var col2Div = document.getElementsByClassName("col-lg-7")[0];
    var comment = JSON.stringify(arr[i]);
    deleteButton.innerHTML="Delete"
    buttons.className="row";
    deleteButton.href="#"
    deleteButton.style.fontSize="12px"
    rowComments.className = "row comments";
    rowComments.style.backgroundColor = '#FAFAFA';
    rowComments.style.marginBottom = '1px';
    textCommentContent.className = "col-lg-12";
    comment = comment.replace(/[{}"]/g, '');
    textCommentContent.innerHTML=comment
    col2Div.append(rowComments);
    rowComments.append(textCommentContent)
    rowComments.append(deleteButton)
  }
  
  
  export function createCommentsModal() {
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
    modalTitle.textContent = "Your comments";
    
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
  
    var rowDiv = document.createElement('div');
    rowDiv.className = "row";
    
    var col1Div = document.createElement('div');
    col1Div.className = "col-lg-5 d-none d-lg-block bg-comment-image";
  
    var col2Div = document.createElement('div');
    col2Div.className = "col-lg-7";
  
    var innerDiv = document.createElement('div');
    innerDiv.className = "p-5";
  
    var innerTextCenter = document.createElement('div');
    innerTextCenter.className = "text-center";
  
    var h1Element = document.createElement('h1');
    h1Element.className = "h4 text-gray-900 mb-4";
    h1Element.textContent = "Create a Comment";
  
    var formElement = document.createElement('form');
    formElement.className = "user";
    formElement.onsubmit = function() { return false; };
  
    var formGroupRow = document.createElement('div');
    formGroupRow.className = "form-group row";
  
    var formGroupCol = document.createElement('div');
    formGroupCol.className = "col-sm-12 mb-3 mb-sm-0";
  
    var textareaElement = document.createElement('textarea');
    textareaElement.className = "form-control";
    textareaElement.id = "contentComment";
    textareaElement.rows = "10";
  
    formGroupCol.appendChild(textareaElement);
    formGroupRow.appendChild(formGroupCol);
    formElement.appendChild(formGroupRow);
    innerTextCenter.appendChild(h1Element);
    innerDiv.appendChild(innerTextCenter);
    innerDiv.appendChild(formElement);
    col2Div.appendChild(innerDiv);
    rowDiv.appendChild(col1Div);
    rowDiv.appendChild(col2Div);
    modalBody.appendChild(rowDiv);
  
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
  
    sendCommentButton.addEventListener('click',sendCommentHandler)
  
    // Add event listener for when the modal is hidden
    $('#comments').on('hidden.bs.modal', function () {
      removeModalContent();
    });
  
    }
  
export function removeModalContent() {
    var elements = document.getElementsByClassName("modal fade");
    var elementsArray = Array.from(elements);
    elementsArray.forEach(function(element) {
        element.remove();
    });
}
    
export async function sendCommentHandler() {
        var commentContent = document.getElementById("contentComment");
        var commentData = [getCookie("userId"), document.getElementsByClassName("btn btn-primary change")[0].id, commentContent.value];
        var res =await sendData('/savedjobs', commentData, 'insert a comment');
        if(res == true){
            var formattedDate = createFormattedDate();
            var arr=[formattedDate+":"+commentContent.value];
            createCommentsDivs(arr,0);
        }
} 
      
function createFormattedDate(){
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var formattedDate = year+"-"+month+"-"+day;
    return formattedDate;
}