const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const coPass = document.getElementById("co-password");
const error1 = document.getElementById("error-");
const error2 = document.getElementById("error-2");
const error3 = document.getElementById("error-3");
const error4 = document.getElementById("error-4");
let isValid1 = false;
let isValid2 = false;
let isValid3 = false;
let isValid4 = false;


form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
  if(isValid1 && isValid2 && isValid3 && isValid4){
    form.submit();
    window.location.href="../html/success.html";
  }
});

// Error
const setError = (element, message) => {
  const inputControl = element.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector("span");

  errorDisplay.innerText = message;
  element.classList.add("invalid");
  element.classList.remove("valid");
};
// Success
const setSuccess = (element, message) => {
  const inputControl = element.parentElement.parentElement;
  const errorDisplay = inputControl.querySelector("span");

  errorDisplay.innerText = "";
  element.classList.add("valid");
  element.classList.remove("invalid");
};

// Email Re
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

//User Re
const isValidUser = (userName) => {
    const re =/^[A-Za-z][A-Za-z0-9_]{4,15}$/;
    return re.test(String(userName));
  };

const validateInput = () => {
  const userValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passValue = pass.value.trim();
  const coPassValue = coPass.value.trim();
  const formData = new FormData();
  if (isValid1 && isValid2 && isValid3 && isValid4) {
    fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "post",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        console.log(text);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //   Username
  if (userValue === "" || userValue == null) {
    setError(userName, "Username is required.");
  } else if (userValue.length < 5) {
    setError(userName, "Password must be at least 5 character.");
    isValid1 = false;
  } else if (userValue.length > 15) {
    setError(userName, "Password must be at most 15 character.");
    isValid1 = false;
  }else if(!isValidUser(userValue)){
    setError(userName, "Provide a valid username.");
    isValid1 = false;
  } else {
    setSuccess(userName);

    formData.append("username", userValue);
    isValid1 = true;
  }

  //   Email
  if (emailValue === "" || emailValue == null) {
    setError(email, "Email is required.");
    isValid2 = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address.");
    isValid2 = false;
  } else {
    setSuccess(email);
    formData.append("email", emailValue);

    localStorage.setItem("email", emailValue);
    isValid2 = true;
  }

  //   Password
  if (passValue === "" || passValue == null) {
    setError(pass, "Password is required");
    isValid3 = false;
  } else if (passValue.length < 8) {
    setError(pass, "Password must be at least 8 character.");
    isValid3 = false;
  } else {
    setSuccess(pass);
    formData.append("password", passValue);

    isValid3 = true;
  }

  //   confirm Password
  if (coPassValue === "" || coPassValue == null) {
    setError(coPass, "Please confirm your password");
    isValid4 = false;
  } else if (coPassValue !== passValue) {
    setError(coPass, "Password doesn't match.");
    isValid4 = false;
  } else {
    setSuccess(coPass);
    formData.append("password_confirm", coPassValue);
    isValid4 = true;
  }
};
