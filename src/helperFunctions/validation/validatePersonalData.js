import { emptyStringPattern } from "./regexPatterns";

const validatePersonalData = (values) => {
  const errors = {};
  if (values !== undefined) {
    ["given_name", "surname"].forEach((inputName) => {
      if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
        errors[inputName] = "required";
      }
    });
  }
  return errors;
};

export default validatePersonalData;
