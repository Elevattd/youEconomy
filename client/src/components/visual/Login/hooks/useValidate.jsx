const validateEmail = (input) => {
  let errorsEmail = {};
  if (input.email.includes(" ")) {
    errorsEmail.email = "Enter a valid Email";
  }
  if (
    !input.email.match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  ) {
    errorsEmail.email = "Enter a valid Email";
  }
  return errorsEmail;
};

const validatePassword = (input, field = "password", errorsPassword = {}) => {
  if (input[field].includes(" ")) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else if (!input[field].match(/^([a-zA-Z0-9]){6,15}$/)) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else if (input[field].length < 6) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else if (input[field].length > 15) {
    errorsPassword[field] =
      "The password must contain at least 6 to 15 characters and only admits letters or numbers";
  } else delete errorsPassword[field];
  return errorsPassword;
};

const validateName = (input, field = "name", errorsName = {}) => {
  if (input[field].includes(" ")) {
    errorsName[field] =
      "The name must contain at least 6 to 20 characters and only admits letters";
  } else if (!input[field].match(/^([a-zA-Z]){6,20}$/)) {
    errorsName[field] =
      "The name must contain at least 6 to 20 characters and only admits letters";
  } else delete errorsName[field];
  return errorsName;
};
export { validateEmail, validatePassword, validateName };
