import { emptyStringPattern } from "./regexPatterns";

const validatePersonalData = (values, props) => {
  const errors = {};
  if (values !== undefined) {
    ["given_name", "surname", "display_name", "language"].forEach(
      (inputName) => {
        if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
          errors[inputName] = "required";
        }
        //none of the fields value properties differ from their initial properties will get error message.
        else if (props.pristine) {
          errors[inputName] = "value not changed";
        } else if (
          values[inputName].trim() === props.initialValues[inputName]
        ) {
          errors[inputName] = "value not changed";
        }
      }
    );
  }
  console.log("errors", errors);
  return errors;
};

export default validatePersonalData;
