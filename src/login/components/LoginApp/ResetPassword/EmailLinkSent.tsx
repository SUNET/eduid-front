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
import { clearNotifications } from "../../../../reducers/Notifications";
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
    if (count && typeof count === "string") {
      const parsedCount = JSON.parse(count);
      if (parsedCount > -1) {
        countFiveMin("email");
      }
    } else {
      clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
    }
  }, []);

  useEffect(() => {
    const emailFromLocalStorage = getLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL);
    if (emailFromLocalStorage) setEmail(emailFromLocalStorage);
  }, [email]);

  useEffect(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  return (
    <>
      <h1>
        <FormattedMessage defaultMessage="Reset password " description="Reset Password heading" />
      </h1>
      <div id="reset-pass-display">
        <p>
          <FormattedMessage
            defaultMessage="Please check your email {email} to continue. Link is valid for 2 hours."
            description="Reset Password email link sent"
            values={{
              email: <strong>{email}</strong>,
            }}
          />
        </p>
        <div className="timer">
          <p>
            <FormattedMessage
              defaultMessage="If you didn’t receive the email? Check your junk email, or"
              description="Reset Password email link sent"
            />
            &nbsp;
            <a id={"resend-email"} onClick={sendLink}>
              <FormattedMessage defaultMessage="resend link" description="Reset Password email link sent" />
            </a>
            <span id="timer-in" className="display-none">
              <FormattedMessage defaultMessage="in " description="Reset Password email link sent" />
            </span>
            <span id="count-down-time-email" />
          </p>
        </div>
      </div>
    </>
  );
}

export default EmailLinkSent;
