const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const coPass = document.getElementById("co-password");
const error1 = document.getElementById("error-");
const error2 = document.getElementById("error-2");
const error3 = document.getElementById("error-3");
const error4 = document.getElementById("error-4");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
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

const validateInput = () => {
  const userValue = userName.value.trim();
  const emailValue = email.value.trim();
  const passValue = pass.value.trim();
  const coPassValue = coPass.value.trim();

  //   Username
  if (userValue === "" || userValue == null) {
    setError(userName, "Username is required");
  } else if (userValue.length < 5) {
    setError(userName, "Password must be at least 5 character.");
  } else if (userValue.length > 15) {
    setError(userName, "Password must be at most 15 character.");
  } else {
    setSuccess(userName);
  }

  //   Email
  if (emailValue === "" || emailValue == null) {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email,'Provide a valid email address');
  }else{
    setSuccess(email)
  }

  //   Password
  if (passValue === "" || passValue == null) {
    setError(pass, "Password is required");
  } else if (passValue.length < 8) {
    setError(pass, "Password must be at least 8 character.");
  }else{
    setSuccess(pass)
  }

  //   confirm Password
  if (coPassValue === "" || coPassValue == null) {
    setError(coPass, "Please confirm your password");
  } else if (coPassValue !== passValue) {
    setError(coPass, "Password doesn't match.");
  
}else{
    setSuccess(coPass)
}};
