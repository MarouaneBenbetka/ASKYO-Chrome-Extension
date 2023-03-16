"use strict";
import { showPopup } from "./popup";
import { getCurrentEmail } from "./utils";

// loader-code: wait until gmailjs has finished loading, before triggering actual extensiode-code.
const loaderId = setInterval(() => {
  if (!window._gmailjs) {
    return;
  }

  clearInterval(loaderId);
  startExtension(window._gmailjs);
}, 100);

function addBtn(gmail) {
  const button = document.createElement("button");
  button.innerText = "Generate Response";
  button.classList.add("ams");
  button.classList.add("bkH");
  button.addEventListener("click", () => {
    const userEmail = gmail.get.user_email();
    gmail.compose.start_compose();
    console.log("Hello, " + userEmail + ". This is your extension talking!");
  });
  //add to toolbar
  // Add the button to the DOM
  const toolbar = document.querySelector("div .amn");
  console.log(toolbar);
  if (toolbar) {
    toolbar.appendChild(button);
  }
}

// actual extension-code
function startExtension(gmail) {
  console.log("Extension loading...");
  window.gmail = gmail;

  gmail.observe.on("load", () => {
    gmail.observe.on("view_email", (domEmail) => {
      console.log("Looking at email:", domEmail);
      const emailData = gmail.new.get.email_data(domEmail);
      console.log("Email data:", emailData);
    });

    gmail.observe.on("compose", (compose) => {
      const email = getCurrentEmail();
      //
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.innerHTML = ".askyo-btn{background-color: #f33769; color: white}";
      document.head.appendChild(style);
      //
      gmail.tools.add_compose_button(
        compose,
        "askyo",
        () => showPopup(email, compose),
        "askyo-btn"
      );
    });
  });
}
