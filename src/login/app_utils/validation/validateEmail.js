export const validate = values => {
  console.log("eyoure validating ");
  const errors = {};
  let email = values.email;
  console.log("email is empty ");
  if (email !== "") {
    let pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email) {
      errors.email = "required";
    } else if (!pattern.test(email)) {
      errors.email = "email.invalid_email";
    }
    console.log("returning info that inpt cannot be empty");
    console.log("this is errors", errors);
    // errors.empty = "required";
  }
  console.log("returning info that inpt cannot be empty");
  console.log("this is errors", errors);
  errors.empty = "required";
  return errors;
};
