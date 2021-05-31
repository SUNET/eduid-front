import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useSelector, useDispatch, } from 'react-redux';
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import { countDownStart, RenderingTimer} from "./CountDownTimer";
function EmailLinkSent(props){
  const dispatch = useDispatch();
  const email = useSelector(state => state.resetPassword.email);
  const notificationErrors = useSelector(state => state.notifications.errors);
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    setErrors(notificationErrors)
  },[errors])

  const sendLink = (e) => {
    e.preventDefault();
    if(email){
      dispatch(postEmailLink(email));
     if(notificationErrors !== undefined)
      setErrors(notificationErrors);
      if(errors.length <= 0)
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