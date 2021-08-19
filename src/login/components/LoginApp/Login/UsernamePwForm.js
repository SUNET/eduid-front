import React from "react";
import { connect, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";
import { validate } from "../../../app_utils/validation/validateEmail";
import emptyValueValidation from "../../../app_utils/validation/emptyValueValidation";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { postUsernamePassword } from "../../../redux/actions/postUsernamePasswordActions";
import PropTypes from "prop-types";

export const submitUsernamePassword = (values, dispatch) => {
  const { email, "current-password": currentPassword } = values;
  dispatch(postUsernamePassword(email, currentPassword));
};

export const validateLoginForm = (values) => {
  const { "current-password": currentPassword } = values;
  let emailValidation = validate(values);
  let passwordValidation = emptyValueValidation({
    ["current-password"]: currentPassword,
  });
  let errors = {};
  errors = {
    email: emailValidation.email,
    ["current-password"]: passwordValidation["current-password"],
  };
  return errors;
};

let UsernamePwForm = (props) => {
  const usernamePwForm = useSelector(state => state.form.usernamePwForm);
  const autoFocus = usernamePwForm.values.email !== "" ? true : false;
  return (
    <Form
      id="login-form"
      aria-label="login form"
      onSubmit={submitUsernamePassword}
    >
    <EmailInput {...props} autoFocus={autoFocus} required={true} />
    <PasswordInput {...props} />
    </Form>
  )
};

UsernamePwForm = reduxForm({
  form: "usernamePwForm",
  validate: validateLoginForm,
  onSubmit: submitUsernamePassword,
})(UsernamePwForm);

UsernamePwForm = connect(() => ({
  initialValues: {
    email: "",
    ["current-password"]: "",
  },
  destroyOnUnmount: false,
  touchOnChange: true,
}))(UsernamePwForm);

UsernamePwForm.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(UsernamePwForm);
