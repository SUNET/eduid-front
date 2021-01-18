import { emptyStringPattern } from "./regexPatterns";

export const emptyValueValidation = (values) => {
  const errors = {};
  const groupName = values.groupName;
  if (!groupName || emptyStringPattern.test(groupName)) {
    errors.groupName = "required";
  }
  return errors;
};
