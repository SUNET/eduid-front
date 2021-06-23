import React from "react";
import Form from "reactstrap/lib/Form";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CustomInput from "../../Inputs/CustomInput";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import EduIDButton from "../../../../components/EduIDButton";
import { emptyStringPattern } from "../../../app_utils/validation/regexPatterns";

const validateNewPassword = (value) => {
  const errors = {};
    if (!value["new-password"] || emptyStringPattern.test(value["new-password"])) {
      errors["new-password"] = "required";
    }
  return errors;
};

let NewPasswordForm = (props) =>{
  return (
    <Form autoComplete="on" id="new-password-form" role="form" aria-label="new-password form" >
      <Field
        id="new-password"
        type="password"
        name="new-password"
        component={CustomInput}
        autoComplete={"new-password"} 
        required={true}
        label={props.translate("security.password_credential_type")}
      />
      <EduIDButton
        className="settings-button"
        id="new-password-button"
        disabled={props.invalid}
      >
        {props.translate("chpass.button_save_password")}
      </EduIDButton>
    </Form>
  ) 
}

NewPasswordForm = reduxForm({
  form: "new-password-form",
  validate: validateNewPassword,
})(NewPasswordForm);

NewPasswordForm = connect(() => ({
  destroyOnUnmount: false,
  touchOnChange: true,
}))(NewPasswordForm);
function SetNewPassword(props){
  return (
    <>
      <p className="heading">Set your new password</p>
      <p>A suggested password can be selected by clicking the input field. </p>
      <NewPasswordForm {...props} />
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default InjectIntl(SetNewPassword);