export const validate = (values, props) => {
  let codeInput = values.confirmationCode;
  const errors = {};
  if (codeInput === undefined) {
    // let code = codeInput.replace(/\s/g, "");
    // code = code.trim();
    errors.confirmationCode = "required";
  } 
  return errors;
};
