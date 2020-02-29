export const validate = (values, props) => {
  let codeInput = values.confirmationCode;
  const errors = {};
  if (codeInput === undefined) {
    errors.confirmationCode = "required";
  } else {
    return errors;
  }
};
