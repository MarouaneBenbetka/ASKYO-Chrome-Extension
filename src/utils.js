//get email
export function getCurrentEmail() {
  const id = window.gmail.new.get.email_id();
  const email = window.gmail.new.get.email_data(id);
  return { subject: email.subject, content: email.content_html };
}

//gen resp(option)

function getResponse(email, text) {
  const reqMsg = `i received this email:
	email subject: ${email.subject}
	email content: "${email.content}"
	can you write the response using this smart replie: ${text}, as a general theme, 
  put the response email between < >`;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: reqMsg }),
  };

  fetch("https://askyo-api.onrender.com/api/get-response", fetchOptions).then(
    (response) => {
      if (response.status != 200) {
        console.error("an error has occured, try later");
      } else {
        response.json().then((data) => {
          const regex = /<([^>]+)>/g;
          const matches = data.message.match(regex);
          if (matches) {
            const textBetweenBrackets = matches[0].slice(1, -1);
            document.getElementById("popup-textarea").innerText =
              textBetweenBrackets;
          }
        });
      }
    }
  );
}

export function getSmartReplies(email) {
  console.log("slected mail:", email);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.content }),
  };

  fetch(
    "https://askyo-api.onrender.com/api/get-smart-replies",
    fetchOptions
  ).then((response) => {
    if (response.status != 200) {
      console.error("an error has occured, try later");
    } else {
      response.json().then((data) => {
        data.forEach((element, ind) => {
          const btn = document.getElementById("btn-" + (ind + 1));
          btn.innerText = element;
          btn.addEventListener("click", (e) => getResponse(email, element));
        });
      });
    }
  });
}

export function submitResponse(compose, closePopup) {
  const response = document.getElementById("popup-textarea").value;
  compose.body(response);
  closePopup();
}
