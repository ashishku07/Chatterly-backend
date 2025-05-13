const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid, PLease enter your name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email address");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong Password");
  }
};

module.exports = {
  validateSignUpData,
};
