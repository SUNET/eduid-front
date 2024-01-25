import { emailPattern, eppnPattern, studentEppnPattern } from "./regexPatterns";

interface UserNameData {
  username?: string;
}

/**
 * Validate that the value is a plausible username. The returned string should be a translate() lookup key.
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
 * Validate that the value is a plausible username. The returned string should be a translate() lookup key.
 * @param values
 * @returns
 */
export function validateUserNameField(value?: string): string | undefined {
  const stringWithoutSpaces = value?.replace(/\s/g, "");
  if (!stringWithoutSpaces) {
    return "required";
  } else if (eppnPattern.test(stringWithoutSpaces)) {
    return undefined;
  } else if (studentEppnPattern.test(stringWithoutSpaces)) {
    return undefined;
  } else if (emailPattern.test(stringWithoutSpaces)) {
    return undefined;
  } else return "invalid username";
}
