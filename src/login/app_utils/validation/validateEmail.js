export const validate = (values, props) => {
  const errors = {};
  if (values !== undefined) {
    let email = values.email;
    const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!props.pristine){
      if (!email) {
        errors.email = "required";
      } else if (!pattern.test(email)) {
        errors.email = "email.invalid_email";
      }
    }
  }
  return errors;
};
