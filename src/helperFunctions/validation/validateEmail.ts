import { emailPattern, emptyStringPattern } from "./regexPatterns";

interface EmailData {
  email?: string;
  given_name?: string;
  surname?: string;
  [key: string]: any;
}

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateSignupUserInForm(values: EmailData): EmailData {
  const errors: EmailData = {};
  if (values !== undefined) {
    ["email", "given_name", "surname"].forEach((inputName) => {
      if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
        errors[inputName] = "required";
      }
    });
    if (values.email) {
      const emailError = validateEmailField(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }
  }

  return errors;
}

// backwards compat export
export const validate = validateSignupUserInForm;

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateEmailField(value?: string): string | undefined {
  if (value && !emailPattern.test(value)) {
    return "email.invalid_email";
  }
}
