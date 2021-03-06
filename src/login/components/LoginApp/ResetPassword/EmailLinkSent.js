import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import SuccessIconAnimation from "./SuccessIconAnimation";
import { RenderingTimer, countDownStart, getLocalStorage, LOCAL_STORAGE_PERSISTED_COUNT } from "./CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "./ResetPasswordMain";
function EmailLinkSent(props){
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendLink = (e) => {
    e.preventDefault();
    if(email){
      dispatch(postEmailLink(email));
    }
  };

  useEffect(()=>{
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT);
    if(count > - 1)
      countDownStart();
  },[])

  useEffect(()=>{
    const emailFromLocalStorage = getLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL);
    if(emailFromLocalStorage)
      setEmail(emailFromLocalStorage)
  },[email])

  return (
    <>
      <SuccessIconAnimation />
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

export default InjectIntl(withRouter(EmailLinkSent));