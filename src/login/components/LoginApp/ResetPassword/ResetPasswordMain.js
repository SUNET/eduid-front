import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { useDispatch } from 'react-redux';
import { getResetPassword } from "../../../redux/actions/getResetPasswordActions"
import ResetPasswordForm from "./ResetPasswordForm";
import EmailLinkSent from "./EmailLinkSent";

const ResetPasswordMain = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResetPassword());
  }, []);

  const url = props.history.location.pathname;

  return (
    <>
      { 
        url === `/reset-password/` ? <ResetPasswordForm urlCode={props.urlCode} {...props}/> : 
        url ===`/reset-password/email-link-sent` ? <EmailLinkSent {...props}/> 
        : null
      }
    </>
  );
}

export default i18n(withRouter(ResetPasswordMain));