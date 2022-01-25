import { emailPattern } from "./regexPatterns";

interface EmailData {
  email?: string;
}

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateEmailInForm(values: EmailData): EmailData {
  const errors: EmailData = {};
  if (values !== undefined) {
    errors.email = validateEmailField(values.email);
  }
  return errors;
}

// backwards compat export
export const validate = validateEmailInForm;

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateEmailField(value?: string): string | undefined {
  if (!value) {
    return "required";
  } else if (!emailPattern.test(value)) {
    return "email.invalid_email";
  }
}
