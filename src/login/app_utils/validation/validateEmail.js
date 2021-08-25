export const validate = (values, props) => {
  const errors = {};
  let email = values.email;
  const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const startValidate = () => {
    if (!email) {
      errors.email = "required";
    } else if (!pattern.test(email)) {
      errors.email = "email.invalid_email";
    }
  };

  if (values !== undefined) { 
    if(props.form === "usernamePwForm"){
      if(!props.pristine){
        startValidate();
      }
    }else startValidate();
  return errors;
  }
};
