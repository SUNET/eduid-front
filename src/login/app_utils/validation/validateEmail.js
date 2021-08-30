import { emailPattern } from "./regexPatterns";

export const validate = (values) => {
  const errors = {};
  if (values !== undefined) {
    let email = values.email;
    if (!email) {
      errors.email = "required";
    } else if (! emailPattern.test(email)) {
      errors.email = "email.invalid_email";
    }
  }
  return errors;
};

export const validateEmailOnLogin = (values, props) => {
  const errors = {};
  let email = values.email;
  if (values !== undefined) { 
    if(!props.pristine){
      if (!email) {
        errors.email = "required";
      } else if (!emailPattern.test(email)) {
        errors.email = "email.invalid_email";
      }
    }
  return errors;
  }
};