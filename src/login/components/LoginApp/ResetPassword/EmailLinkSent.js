import React from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch, } from 'react-redux';
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import { countDownStart, RenderingTimer} from "./CountDownTimer";
function EmailLinkSent(props){
  const email = useSelector(state => state.resetPassword.email);
  const dispatch = useDispatch();

  const sendLink = () => {
    if(email){
      dispatch(postEmailLink(email));
      countDownStart();
     } 
  };

  return (
    <>
      <p className="heading">
        {props.translate("resetpw.reset-pw-initialized")}
      </p>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.check-email-link")({ email: email })}</p>
        <div className="timer">
          <p>{props.translate("resetpw.resend-link")} 
            <RenderingTimer sendLink={sendLink} {...props}/>
          </p>
        </div>
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