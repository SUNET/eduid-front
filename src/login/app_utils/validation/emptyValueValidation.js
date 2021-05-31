import { emptyStringPattern } from "./regexPatterns";

export const emptyValueValidation = (values) => {
  const errors = {};
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
