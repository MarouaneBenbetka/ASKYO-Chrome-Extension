//get email
function getCurrentEmail() {
  const id = window.gmail.new.get.email_id();
  const email = window.gmail.new.get.email_data(id);
  return { subject: email.subject, content: email.content_html };
}

//gen resp(option)

function getResponse(email, option, helperText) {
  const reqMsg = `i received this email:
	email subject: ${email.subject}
	email content: "${email.content}"
	i want you to generate a response to that email
	${helperText?.length ? `- ${helperText}` : ""}
	${option?.length ? `- i want the response to be in a ${option} tone` : ""}`;

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
          document.getElementById("reply-area").innerText = data;
        });
      }
    }
  );
}

function getSmartReplies(email) {
  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  };

  fetch(
    "https://askyo-api.onrender.com/api/get-smart-replies",
    fetchOptions
  ).then((response) => {
    if (response.status != 200) {
      console.error("an error has occured, try later");
    } else {
      response.json().then((data) => {
        document.getElementById("reply-area").innerText = data;
      });
    }
  });
}

function submitResponse(compose, closePopup) {
  const response = document.getElementById("reply-area").innerText;
  compose.body(response);
  closePopup();
}
