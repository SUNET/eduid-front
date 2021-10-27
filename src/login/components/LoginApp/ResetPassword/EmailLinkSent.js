import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
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
function EmailLinkSent(props) {
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
    const emailFromLocalStorage = getLocalStorage(
      LOCAL_STORAGE_PERSISTED_EMAIL
    );
    if (emailFromLocalStorage) setEmail(emailFromLocalStorage);
  }, [email]);

  useEffect(() => {
    dispatch(eduidRMAllNotify());
  }, []);

  return (
    <>
      <div id="reset-pass-display">
        <p>{props.translate("resetpw.check-email-link")({ email: email })}</p>
        <div className="timer">
          <p>
            {props.translate("resetpw.resend-link")}
            <a id={"resend-email"} onClick={sendLink}>
              {props.translate("resetpw.resend-link-button")}
            </a>
            <span id="timer-in" className="display-none">
              {props.translate("resetpw.resend-timer-in")}{" "}
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

export default InjectIntl(withRouter(EmailLinkSent));
