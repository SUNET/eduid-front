import { emailPattern, eppnPattern, studentEppnPattern } from "./regexPatterns";

interface EmailData {
  email?: string;
}

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateUserNameInForm(values: EmailData): EmailData {
  const errors: EmailData = {};
  if (values !== undefined) {
    errors.email = validateUserNameField(values.email);
  }

  return errors;
}

// backwards compat export
export const validate = validateUserNameInForm;

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateUserNameField(value?: string): string | undefined {
  if (!value) {
    return "required";
  } else if (eppnPattern.test(value)) {
    return;
  } else if (studentEppnPattern.test(value)) {
    return;
  } else if (emailPattern.test(value)) {
    return;
  } else "invalid form";
}
