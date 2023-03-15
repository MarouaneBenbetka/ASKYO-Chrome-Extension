import data from "./popup-html.js";

export function showPopup() {
  var popup = document.createElement("div");
  // set the popup's HTML content to the fetched data
  popup.innerHTML = data;
  popup.setAttribute("id", "popup");
  // add some styles to make the popup look nice
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.border = "1px solid #ccc";
  popup.style.backgroundColor = "#fff";
  popup.style.zIndex = "9999";

  // add the popup element to the page
  document.body.appendChild(popup);
}

function initFunctions() {
  //add close function to btn
  document.getElementById("closeBtn").addEventListener("click", () => {
    closePopup();
  });
}

function closePopup() {
  // remove the popup element from the page
  var popup = document.getElementById("popup");
  popup.parentNode.removeChild(popup);
}

/*
text area: reply-area
*/
