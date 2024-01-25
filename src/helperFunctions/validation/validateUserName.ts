import { emailPattern, eppnPattern, studentEppnPattern } from "./regexPatterns";

interface UserNameData {
  username?: string;
}

/**
 * Validate that the value is a plausible e-mail address. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateUserNameInForm(values: UserNameData): UserNameData {
  const errors: UserNameData = {};
  if (values !== undefined) {
    errors.username = validateUserNameField(values.username);
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
  }
  if (eppnPattern.test(value)) {
    return undefined;
  }
  if (studentEppnPattern.test(value)) {
    return undefined;
  }
  if (emailPattern.test(value)) {
    return undefined;
  }
  return "invalid username";
}
