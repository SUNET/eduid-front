import { emailPattern } from "./regexPatterns";

interface EmailData {
  email?: string;
}

export function validate(values: EmailData): EmailData {
  const errors: EmailData = {};
  if (values !== undefined) {
    if (!values.email) {
      errors.email = "required";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "email.invalid_email";
    }
  }
  return errors;
}
