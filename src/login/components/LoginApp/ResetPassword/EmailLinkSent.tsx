import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import {
  getLocalStorage,
  countFiveMin,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK,
  clearCountdown,
} from "./CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "./ResetPasswordMain";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import { FormattedMessage } from "react-intl";

function EmailLinkSent(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const sendLink = (e: React.MouseEvent<HTMLElement>) => {
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
        <p>
          <FormattedMessage
            defaultMessage="Please check your email {email} to continue. Link is valid for 2 hours."
            description="Reset Password email link sent description"
            values={{
              email: <b>{email}</b>,
            }}
          />
        </p>
        <div className="timer">
          <p>
            <FormattedMessage
              defaultMessage="If you didn’t receive the email? Check your junk email, or."
              description="Reset Password email link sent"
            />
            <a id={"resend-email"} onClick={sendLink}>
              <FormattedMessage defaultMessage="resend link" description="Reset Password email link button" />
            </a>
            <span id="timer-in" className="display-none">
              <FormattedMessage defaultMessage="in" description="Reset Password timer" />
            </span>
            <span id="count-down-time-email" />
          </p>
          <h1>{email}</h1>
        </div>
      </div>
    </>
  );
}

export default EmailLinkSent;
