import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import {
  getLocalStorage,
  countFiveMin,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK,
  clearCountdown,
} from "./CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "./ResetPasswordMain";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import { translate } from "../../../../login/translation";
import { FormattedMessage } from "react-intl";

function EmailLinkSent(): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const sendLink = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(resetPasswordSlice.actions.requestEmailLink(email));
    }
  };

  useEffect(() => {
    const count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
    if (count || count > -1) {
      countFiveMin("email");
    } else if (count <= -1) {
      clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
    }
  }, []);

  useEffect(() => {
    const emailFromLocalStorage = getLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL);
    if (emailFromLocalStorage) setEmail(emailFromLocalStorage);
  }, [email]);

  useEffect(() => {
    dispatch(eduidRMAllNotify());
  }, []);

  return (
    <>
      <div id="reset-pass-display">
        <FormattedMessage
          defaultMessage="Please check your email <b>{email}</b> to continue. \n          Link is valid for 2 hours."
          description="Reset Password email link sent message"
          values={{
            b: (chunks: string) => <b>{chunks}</b>,
          }}
        />
        {/* <p>{translate("resetpw.check-email-link")({ email: email })}</p> */}
        <div className="timer">
          <p>
            {translate("resetpw.resend-link")}
            <a id={"resend-email"} onClick={sendLink}>
              {translate("resetpw.resend-link-button")}
            </a>
            <span id="timer-in" className="display-none">
              {translate("resetpw.resend-timer-in")}{" "}
            </span>
            <span id="count-down-time-email" />
          </p>
        </div>
      </div>
    </>
  );
}

EmailLinkSent.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool,
};

export default EmailLinkSent;
