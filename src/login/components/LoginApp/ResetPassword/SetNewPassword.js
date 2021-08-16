import React, { useEffect, useState }  from "react";
import Form from "reactstrap/lib/Form";
import { useDispatch } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CustomInput from "../../Inputs/CustomInput";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import EduIDButton from "../../../../components/EduIDButton";
import { saveLinkCode, setNewPassword } from "../../../redux/actions/postResetPasswordActions";
import { useHistory } from 'react-router-dom';

let NewPasswordForm = (props) =>{
  return (
    <Form autoComplete="on" id="new-password-form" role="form" aria-label="new-password form" onSubmit={props.clickSetNewPassword} >
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
})(NewPasswordForm);

NewPasswordForm = connect(() => ({
  destroyOnUnmount: false,
  touchOnChange: true,
}))(NewPasswordForm);
function SetNewPassword(props){
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];
  const dispatch = useDispatch();
  const history = useHistory();
  const suggested_password = useSelector(
    (state) => state.resetPassword.suggested_password
  );

  // useEffect(()=>{
  //   dispatch(saveLinkCode(emailCode));
  // },[dispatch]);

  useEffect(()=>{
    if(document.getElementsByName("new-password")[0].value !== undefined){
      document.getElementsByName("new-password")[0].value = suggested_password;    
    }
  },[]);

  const clickSetNewPassword = (e) => {
    e.preventDefault()
    dispatch(setNewPassword());
    pathToSuccess();
  };

  const pathToSuccess = () => {
    history.push("/reset-password/success");
  };

  return (
    <>
      <p className="heading">{props.translate("resetpw.set-new-password-heading")}</p>
      <p>{props.translate("resetpw.set-new-password-description")}</p>
      <NewPasswordForm {...props} clickSetNewPassword={clickSetNewPassword}/>
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default InjectIntl(SetNewPassword);