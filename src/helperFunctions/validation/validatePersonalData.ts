import { emptyStringPattern } from "./regexPatterns";

interface PersonalDataValues {
  given_name?: string;
  surname?: string;
}

interface ValidationErrors {
  given_name?: string;
  surname?: string;
}

export const validatePersonalData = (values: PersonalDataValues | undefined): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (values !== undefined) {
    (["given_name", "surname"] as const).forEach((inputName) => {
      if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
        errors[inputName] = "required";
      }
    });
  }
  return errors;
};
