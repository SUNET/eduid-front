import React from "react";
import { connect } from "react-redux";
import { reduxForm, submit } from "redux-form";
import Form from "reactstrap/lib/Form";
import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";
import { validateEmailOnLogin } from "../../../app_utils/validation/validateEmail";
import emptyValueValidation from "../../../app_utils/validation/emptyValueValidation";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import {postUsernamePassword} from "../../../redux/actions/loginActions";

export const submitUsernamePassword = (values, dispatch) => {
  const { email, "current-password": currentPassword } = values;
  dispatch(postUsernamePassword(email, currentPassword));
};

export const validateLoginForm = (values, props) => {
  const { "current-password": currentPassword } = values;
  // props for checking if values is changed(pristine is false) to prevent activation of validation when emapty input 
  let emailValidation = validateEmailOnLogin(values, props);
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

const handleKeyDown = (e, dispatch) => {
  if (e.which === 13) {
    // e.which === 13, event is to click the enter button
    e.preventDefault();
    dispatch(submit("usernamePwForm"))
  }
};

let UsernamePwForm = ({props, dispatch}) => (
  <Form
    id="login-form"
    aria-label="login form"
    onSubmit={submitUsernamePassword}
    onKeyDown={(e) => handleKeyDown(e, dispatch)}
  >
    <EmailInput {...props} autoFocus={true} required={true} />
    <PasswordInput {...props} />
  </Form>
);

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
