import React, { useEffect, useState }  from "react";
import Form from "reactstrap/lib/Form";
import { useDispatch } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CustomInput from "../../Inputs/CustomInput";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import EduIDButton from "../../../../components/EduIDButton";
import { emptyStringPattern } from "../../../app_utils/validation/regexPatterns";
import { saveLinkCode } from "../../../redux/actions/postResetPasswordActions";

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
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];
  const dispatch = useDispatch();
  const suggested_password = useSelector(
    (state) => state.resetPassword.suggested_password
  );

  useEffect(()=>{
    dispatch(saveLinkCode(emailCode));
  },[dispatch]);

  useEffect(()=>{
    if(document.getElementsByName("new-password")[0].value !== undefined){
      document.getElementsByName("new-password")[0].value = suggested_password;    
    }
  },[]);

  return (
    <>
      <p className="heading">{props.translate("resetpw.set-new-password-heading")}</p>
      <p>{props.translate("resetpw.set-new-password-description")}</p>
      <NewPasswordForm {...props}/>
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default InjectIntl(SetNewPassword);