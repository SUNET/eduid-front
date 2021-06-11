import { emptyStringPattern } from "./regexPatterns";

const emptyValueValidation = (values) => {
  let errors = {};
  let inputValue = "";
  let inputName = "";
  if (values !== undefined) {
    inputValue = Object.values(values)[0];
    inputName = Object.keys(values)[0];
  }
  if (!inputValue || emptyStringPattern.test(inputValue)) {
    errors[inputName] = "required";
  }
  return errors;
};

export default emptyValueValidation;