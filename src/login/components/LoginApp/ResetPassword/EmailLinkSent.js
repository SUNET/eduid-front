import React from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch, } from 'react-redux';
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import SuccessIcon from "../ResetPassword/SuccessIcon";

function EmailLinkSent(props){
  const email = useSelector(state => state.resetPassword.email);
  const dispatch = useDispatch();

  const sendLink = () => {
    dispatch(postEmailLink(email));
  };

  return (
    <>
      <SuccessIcon /> 
      <p className="heading">
        {props.translate("resetpw.reset-pw-initialized")}
      </p>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.check-email-link")({ email: email })}</p>
        <p>{props.translate("resetpw.resend-link")} 
          <a className={`resend-link`} onClick={sendLink}> {props.translate("resetpw.resend-link-button")} </a>
        </p>
      </div>
    </>
  ) 
}

EmailLinkSent.propTypes = {
  translate: PropTypes.func, 
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default i18n(withRouter(EmailLinkSent));