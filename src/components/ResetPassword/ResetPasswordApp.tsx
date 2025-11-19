import { resetPasswordApi } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router";
import loginSlice from "slices/Login";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { EmailLinkSent } from "./EmailLinkSent";
import { GoBackButton } from "./GoBackButton";
import { HandleExtraSecurities } from "./HandleExtraSecurities";
import { ProcessCaptcha, ResetPasswordCaptcha } from "./ResetPasswordCaptcha";
import { ResetPasswordEnterEmail } from "./ResetPasswordEnterEmail";
import { ResetPasswordSuccess, SetNewPassword } from "./SetNewPassword";

// URL parameters passed to ResetPasswordRequestEmail
export interface UrlParams {
  ref?: string;
}

export function ResetPasswordApp(): React.JSX.Element {
  const params = useParams() as UrlParams;
  const dispatch = useAppDispatch();
  const loginRef = useAppSelector((state) => state.login.ref);
  const swedishEID_status = useAppSelector((state) => state.resetPassword.swedishEID_status);
  const intl = useIntl();
  const next_page = useAppSelector((state) => state.resetPassword.next_page);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Reset Password",
      defaultMessage: "Reset password | eduID",
    });
  }, [intl]);

  useEffect(() => {
    if (swedishEID_status === "eidas.mfa_authn_success" || swedishEID_status === "bankid.mfa_authn_success") {
      dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("swedishEID"));
    }
  }, [dispatch, swedishEID_status]);

  useEffect(() => {
    if (next_page === undefined) {
      if (loginRef === undefined && params.ref !== undefined) {
        dispatch(loginSlice.actions.addLoginRef({ ref: params.ref, start_url: window.location.href }));
      }
      dispatch(resetPasswordSlice.actions.setNextPage("ASK_FOR_EMAIL_OR_CONFIRM_EMAIL"));
    }
  }, [dispatch, loginRef, params, next_page]);

  return (
    <React.Fragment>
      {next_page === "ASK_FOR_EMAIL_OR_CONFIRM_EMAIL" && <AskForEmailOrConfirmEmail />}
      {next_page === "RESET_PW_CONFIRM_EMAIL" && <ResetPasswordConfirmEmail />}
      {next_page === "RESET_PW_ENTER_EMAIL" && <ResetPasswordEnterEmail />}
      {next_page === "RESET_PW_CAPTCHA" && <ResetPasswordCaptcha />}
      {next_page === "PROCESS_CAPTCHA" && <ProcessCaptcha />}
      {next_page === "EMAIL_LINK_SENT" && <EmailLinkSent />}
      {next_page === "HANDLE_EXTRA_SECURITIES" && <HandleExtraSecurities />}
      {next_page === "SET_NEW_PASSWORD" && <SetNewPassword />}
      {next_page === "RESET_PW_SUCCESS" && <ResetPasswordSuccess />}
    </React.Fragment>
  );
}

function AskForEmailOrConfirmEmail(): null {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email_status === undefined || !email_status) {
      if (email_address) {
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_CONFIRM_EMAIL"));
      } else {
        dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_ENTER_EMAIL"));
      }
    }
  }, [email_status, email_address, dispatch]);

  return null;
}

/**
 *
 * When we get an e-mail address from the login username page, this page asks the user for
 * confirmation before requesting the backend to send an actual e-mail to the user.
 */
export function ResetPasswordConfirmEmail(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const [getResetPasswordState] = resetPasswordApi.useLazyGetResetPasswordStateQuery();

  async function sendEmailOnClick() {
    dispatch(clearNotifications());
    if (email_address) {
      dispatch(resetPasswordSlice.actions.setEmailAddress(email_address));
      getResetPasswordState();
    }
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Start account recovery process"
            description="Account recovery front page heading"
          />
        </h1>
        <div className="lead" />
        <p>
          <FormattedMessage
            defaultMessage="Click the button below to send an e-mail to {email}"
            description="Account recovery front page"
            values={{
              email: (
                <span id="email_address">
                  <output data-testid="email-address">
                    <strong>{email_address}</strong>.
                  </output>
                </span>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage="If you decide to cancel, simply click the Go Back button to return to the login page."
            description="Account recovery cancel information"
          />
        </p>
      </section>

      <div className="buttons">
        <GoBackButton />
        <EduIDButton buttonstyle="primary" type="submit" onClick={sendEmailOnClick}>
          <FormattedMessage defaultMessage="Send e-mail" description="Send e-mail button" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}
