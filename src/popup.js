import data from "./popup-html.js";
import { getSmartReplies, submitResponse } from "./utils.js";

export function showPopup(email, compose) {
  var popup = document.createElement("div");
  // set the popup's HTML content to the fetched data
  popup.innerHTML = data;
  popup.setAttribute("id", "popup-cont");
  // add some styles to make the popup look nice
  /*
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.border = "1px solid #ccc";
  popup.style.backgroundColor = "#fff";
  popup.style.zIndex = "9999";
	*/
  // add the popup element to the page
  document.body.appendChild(popup);
  initFunctions(compose);
  getSmartReplies(email);
}

function initFunctions(compose) {
  //add close function to btn
  document.getElementById("popup-cancel").addEventListener("click", () => {
    closePopup();
  });
  document.getElementById("popup-reply").addEventListener("click", () => {
    submitResponse(compose, closePopup);
  });

  /** */

  const textarea = document.getElementById("popup-textarea");

  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });

  const replyPlaceholder = document.getElementById("popup-textarea");
  const ellipsis = " ...";

  let index = 0;
  const timeoutID = setInterval(() => {
    if (index < ellipsis.length) {
      replyPlaceholder.placeholder = `Reply${ellipsis.slice(0, index + 1)}`;
      index++;
    } else {
      index = 0;
    }
    if (replyPlaceholder.value.length !== 0) {
      clearTimeout(timeoutID);
    }
  }, 300);

  const Other =
    document.getElementsByClassName("popup-buttons")[0].lastElementChild;
  const OtherTextInput = document.getElementsByClassName(
    "popup-input-container"
  )[0];
  Other.addEventListener("click", () => {
    OtherTextInput.style.display = "flex";
  });
}

function closePopup() {
  // remove the popup element from the page
  var popup = document.getElementById("popup-cont");
  popup.parentNode.removeChild(popup);
}

/*
text area: reply-area
*/
