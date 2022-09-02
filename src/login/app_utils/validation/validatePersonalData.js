import { emptyStringPattern } from "./regexPatterns";

const validatePersonalData = (values, props) => {
  const errors = {};
  if (values !== undefined) {
    ["given_name", "surname", "display_name", "language"].forEach((inputName) => {
      if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
        errors[inputName] = "required";
      }
    });
  }
  return errors;
};

export default validatePersonalData;
