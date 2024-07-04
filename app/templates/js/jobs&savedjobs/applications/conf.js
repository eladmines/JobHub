import{removeApplication} from './actions.js'
import { sendData } from '../../actions.js';
import {createCommentsModal,createCommentsDivs, removeModalContent} from "../../comments/actions.js"

export function setupApplicationsPage(card,commentsButton,saveOrRemoveJobButton,applyButton,job,removeData){
  commentsButton.setAttribute("data-target", "#comments");
  commentsButton.setAttribute("href", "#");
  commentsButton.setAttribute("data-toggle", "modal");
  commentsButton.innerHTML="Comments | ";
  commentsButton.id=job.id;
  saveOrRemoveJobButton.innerHTML="Remove | ";
  applyButton.innerHTML = "Apply"
  saveOrRemoveJobButton.addEventListener('click', function() {
      //data[2]=event.target.id;
      removeApplication(removeData);
      card.style.display = "none";
      });
  commentsButton.addEventListener('click', async function() {
        createCommentsModal()
        var getCommentsData=[getCookieValue('id'),job.id]
        var res = await sendData('/comments',getCommentsData,'get comments')
        for(var i=0; i<res[0][0].length; i++){
          createCommentsDivs(res[0][0],i)
        }
  });

}