import { emptyStringPattern } from "./regexPatterns";

const validatePersonalData = (values, props) => {
  const errors = {};
  if (values !== undefined) {
    console.log("values", values);
    console.log("values.language", values.language);

    [("given_name", "surname", "display_name", "language")].forEach(
      (inputName) => {
        console.log("!values[inputName]", !values[inputName]);
        if (!values[inputName] || emptyStringPattern.test(values[inputName])) {
          console.log("hello");
          // errors[inputName] = "required";
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
