import EduIDButton from "components/EduIDButton";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { EmailLinkSent } from "./EmailLinkSent";
import { GoBackButton } from "./GoBackButton";
import { ResetPasswordEnterEmail } from "./ResetPasswordEnterEmail";

// URL parameters passed to ResetPasswordRequestEmail
export interface UrlParams {
  ref?: string;
}

export function ResetPasswordRequestEmail(): JSX.Element {
  const params = useParams() as UrlParams;
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_sent = useAppSelector((state) => state.resetPassword.email_sent); // Has an e-mail been sent?
  const email_throttle_seconds = useAppSelector((state) => state.resetPassword.email_throttle_seconds);

  const loginRef = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    if (loginRef === undefined && params.ref !== undefined) {
      // If the user reloads the page, we restore state.login.ref with the login ref we still have as a URL parameter
      dispatch(loginSlice.actions.addLoginRef({ ref: params.ref, start_url: window.location.href }));
    }
  }, [loginRef, params]);

  if (!email_sent) {
    if (email_address) {
      return <ResetPasswordBeginEmail />;
    } else {
      return <ResetPasswordEnterEmail />;
    }
  }

  const seconds = email_throttle_seconds || 0;
  return <EmailLinkSent expires_in={seconds} expires_max={300} />;
}

function ResetPasswordBeginEmail(): JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);

  function sendEmailOnClick() {
    if (email_address) {
      dispatch(resetPasswordSlice.actions.requestEmailLink(email_address));
      // TODO: update backend to provide timeout in response
      dispatch(resetPasswordSlice.actions.saveEmailThrottledSeconds(5 * 60));
    }
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="To start the account recovery process, press the button below to send an e-mail to {email}."
          description="Account recovery front page"
          values={{
            email: (
              <span id="email_address">
                <output data-testid="email-address">
                  <strong>{email_address}</strong>
                </output>
              </span>
            ),
          }}
        />
      </p>

      <div className="buttons">
        <GoBackButton />
        <EduIDButton buttonstyle="primary" type="submit" className="settings-button" onClick={sendEmailOnClick}>
          <FormattedMessage defaultMessage="Send e-mail" description="Send e-mail button" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}
