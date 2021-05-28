import React from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useDispatch, connect } from 'react-redux';
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../../Inputs/CustomInput";
import EduIDButton from "../../../../components/EduIDButton";
import { validate } from "../../../app_utils/validation/validateEmail";
import PropTypes from "prop-types";
import { countDownStart } from "./CountDownTimer";

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
      disabled={props.invalid}
      onClick={props.sendLink}
    >
      {props.translate("resetpw.send-link")}
    </EduIDButton>
  </Form>
);
  
EmailForm = reduxForm({
  form: "reset-pass-email-form",
  validate,
})(EmailForm);

EmailForm = connect(() => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailForm);


function ResetPasswordForm(props){
  const dispatch = useDispatch();

  const sendLink = (e) => {
    e.preventDefault();
    const email = document.querySelector("input[name='email']").value;
    if(email){
      dispatch(postEmailLink(email));
      countDownStart();
     }
  };

  return (
    <>
      <p className="heading">{props.translate("resetpw.heading-add-email")}</p>
      <EmailForm sendLink={sendLink} {...props} />
      <div className="return-login-link">
        <a href={"/login"}>
          {props.translate("resetpw.return-login")}
        </a>
      </div>
    </>
  ) 
}

ResetPasswordForm.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default i18n(withRouter(ResetPasswordForm));