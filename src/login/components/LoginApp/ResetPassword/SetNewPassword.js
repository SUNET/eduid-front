import React, { useEffect, useState, useRef }  from "react";
import Form from "reactstrap/lib/Form";
import { useDispatch } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CustomInput from "../../Inputs/CustomInput";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { connect, useSelector } from "react-redux";
import EduIDButton from "../../../../components/EduIDButton";
import { saveLinkCode } from "../../../redux/actions/postResetPasswordActions";
import { setNewPassword, setNewPasswordExtraSecurityPhone, setNewPasswordExtraSecurityToken } from "../../../redux/actions/postResetNewPasswordActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';


let NewPasswordForm = (props) =>{
  return (
    <Form autoComplete="on" id="new-password-form" role="form" aria-label="new-password form" onSubmit={props.clickSetNewPassword} >
      <Field
        id="new-password"
        type="password"
        name="new-password"
        component={CustomInput}
        required={true}
        label="Re-enter password"
        placeholder="xxxx xxxx xxxx"
      />
      <EduIDButton
        className="settings-button"
        id="new-password-button"
      >
        {props.translate("resetpw.accept-password")}
      </EduIDButton>
    </Form>
  ) 
}

NewPasswordForm = reduxForm({
  form: "new-password-form"
})(NewPasswordForm);

NewPasswordForm = connect(() => ({
  destroyOnUnmount: false,
  touchOnChange: true,
}))(NewPasswordForm);
function SetNewPassword(props){
  const history = useHistory();
  const url = document.location.href;
  const emailCode = url.split("/").reverse()[0];
  const dispatch = useDispatch();
  const suggested_password = useSelector(
    (state) => state.resetPassword.suggested_password
  );
  const selected_option = useSelector(
    (state) => state.resetPassword.selected_option
  );
  const [password, setPassword] = useState(null);
  const ref = useRef(null);

  useEffect(()=>{
    setPassword(suggested_password)
  },[suggested_password]);

  const copyToClipboard = () => {
    ref.current.select();
    document.execCommand('copy');
    document.getElementById("icon-copy").style.display = "none";
    document.getElementById("icon-check").style.display = "inline";
    setTimeout( function() {
      document.getElementById("icon-copy").style.display = "inline";
      document.getElementById("icon-check").style.display = "none";
    }, 1000);
  };

  useEffect(()=>{
    if(document.getElementsByName("copy-new-password")[0].value !== undefined){
      document.getElementsByName("copy-new-password")[0].value = suggested_password;    
    }else (!document.getElementsByName("copy-new-password")[0].value) 
      dispatch(saveLinkCode(emailCode));
  },[dispatch]);

  useEffect(()=>{
    if(selected_option === null){
      history.push(`/reset-password/extra-security/${emailCode}`);
    }
  },[selected_option]);

  const clickSetNewPassword = (e) => {
    e.preventDefault();
    if(!selected_option || selected_option === "without"){
      dispatch(setNewPassword());
    }else if(selected_option === "phoneCode"){
      dispatch(setNewPasswordExtraSecurityPhone());
    }else if(selected_option === "securityKey"){
      dispatch(setNewPasswordExtraSecurityToken());
    }
  };

  return (
    <>
      <p className="heading">{props.translate("resetpw.set-new-password-heading")}</p>
      <p>{props.translate("resetpw.set-new-password-description")}</p>
      <div className="reset-password-input">
        <label>New password</label>
        <input
          id="copy-new-password"
          ref={ref}
          defaultValue={password && password}
          readOnly={true}
          name="copy-new-password"
          autoComplete={"new-password"} 
        />
        <button id="clipboard" className="icon copybutton" onClick={copyToClipboard}> 
          <FontAwesomeIcon id={"icon-copy"} icon={faCopy} />
          <FontAwesomeIcon id={"icon-check"} icon={faCheck} />
        </button> 
      </div>
      <NewPasswordForm {...props} 
        clickSetNewPassword={clickSetNewPassword}
      />
    </>
  ) 
}

SetNewPassword.propTypes = {
};

export default InjectIntl(SetNewPassword);