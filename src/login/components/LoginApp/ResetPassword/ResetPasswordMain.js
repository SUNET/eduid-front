import React, { useEffect }  from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import {  useSelector, useDispatch, connect } from 'react-redux';
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import PropTypes from "prop-types";
import { clearCountdown, setLocalStorage } from "./CountDownTimer";

export const LOCAL_STORAGE_PERSISTED_EMAIL = "email";

let EmailForm = (props) => (
  <Form id="reset-password-form" role="form" onSubmit={props.sendLink}>
    <Field
      type="email"
      name="email"
      label={props.translate("profile.email_display_title")}
      componentClass="input"
      id="email-input"
      component={CustomInput}
      translate={props.translate}
      placeholder="example@email.com"
      required={true}
      helpBlock={props.translate("emails.input_help_text")}
    />
    <EduIDButton
      className="settings-button"
      id="reset-password-button"
      disabled={props.invalid || props.request_in_progress }
      onClick={props.sendLink}
    >
      {props.translate("resetpw.send-link")}
    </EduIDButton>
  </Form>
);
  
EmailForm = reduxForm({
  form: "reset-pass-email-form",
  validate,
  touchOnChange: true,
})(EmailForm);

EmailForm = connect(() => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailForm);
function ResetPasswordMain(props){
  const dispatch = useDispatch();
  const url = document.location.href;
  const loginRef = url.split("/email").reverse()[0];
  const request_in_progress = useSelector(state => state.app.request_in_progress);

  useEffect(()=>{
    clearCountdown();
  }, []);

  const sendLink = (e) => {
    e.preventDefault();
    const email = document.querySelector("input[name='email']").value;
    if(email){
      dispatch(postEmailLink(email));
      setLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL , email)
    }
  };
  return (
    <>
      <p className="heading">{props.translate("resetpw.heading-add-email")}</p>
      <EmailForm sendLink={sendLink} {...props} request_in_progress={request_in_progress}/>
      <div className={loginRef ? `return-login-link` : `return-login-link disabled`}>
        <a id="return-login" href={`/login/password/${loginRef}`}>
          {props.translate("resetpw.return-login")}
        </a>
      </div>
    </>
  ) 
}

ResetPasswordMain.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default InjectIntl(ResetPasswordMain);
