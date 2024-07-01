import { useActor } from "@xstate/react";
import { requestEmailLink } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import loginSlice from "slices/Login";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { EmailLinkSent } from "./EmailLinkSent";
import { GoBackButton } from "./GoBackButton";
import { HandleExtraSecurities } from "./HandleExtraSecurities";
import { PhoneCodeSent } from "./PhoneCodeSent";
import { ResetPasswordEnterEmail } from "./ResetPasswordEnterEmail";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";
import { SelectedSecurityToken } from "./SelectedSecurityToken";
import { ResetPasswordSuccess, SetNewPassword } from "./SetNewPassword";

// URL parameters passed to ResetPasswordRequestEmail
export interface UrlParams {
  ref?: string;
}

export function ResetPasswordApp(): JSX.Element {
  const params = useParams() as UrlParams;
  const dispatch = useAppDispatch();
  const loginRef = useAppSelector((state) => state.login.ref);
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const swedishEID_status = useAppSelector((state) => state.resetPassword.swedishEID_status);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const [state] = useActor(resetPasswordContext.resetPasswordService);
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Reset Password",
      defaultMessage: "Reset Password | eduID",
    });
  }, []);

  useEffect(() => {
    if (swedishEID_status === "eidas.mfa_authn_success" || swedishEID_status === "bankid.mfa_authn_success") {
      resetPasswordContext.resetPasswordService.send({ type: "WITHOUT_EXTRA_SECURITY" });
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("swedishEID"));
    }
  }, [swedishEID_status]);

  useEffect(() => {
    if (loginRef === undefined && params.ref !== undefined) {
      // If the user reloads the page, we restore state.login.ref with the login ref we still have as a URL parameter
      dispatch(loginSlice.actions.addLoginRef({ ref: params.ref, start_url: window.location.href }));
    }
    resetPasswordContext.resetPasswordService.send({ type: "UNKNOWN_USER" });
  }, [loginRef, params]);

  return (
    <React.Fragment>
      {state.matches("AskForEmailOrConfirmEmail") && <AskForEmailOrConfirmEmail />}
      {state.matches("AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail") && <ResetPasswordConfirmEmail />}
      {state.matches("AskForEmailOrConfirmEmail.ResetPasswordEnterEmail") && <ResetPasswordEnterEmail />}
      {state.matches("AskForEmailOrConfirmEmail.EmailLinkSent") && <EmailLinkSent />}
      {state.matches("HandleExtraSecurities.HandleExtraSecurities") && <HandleExtraSecurities />}
      {state.matches("HandleExtraSecurities.ResetPasswordSecurityKey") && <SelectedSecurityToken />}
      {state.matches("HandleExtraSecurities.ResetPasswordPhoneVerification") && <PhoneCodeSent />}
      {state.matches("FinaliseResetPassword.SetNewPassword") && <SetNewPassword />}
      {state.matches("FinaliseResetPassword.ResetPasswordSuccess") && <ResetPasswordSuccess />}
    </React.Fragment>
  );
}

function AskForEmailOrConfirmEmail(): null {
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?

  useEffect(() => {
    if (!email_status) {
      if (!email_address) resetPasswordContext.resetPasswordService.send({ type: "UNKNOWN_USER" });
      else resetPasswordContext.resetPasswordService.send({ type: "KNOWN_USER" });
    }
  }, [email_status, email_address]);

  return null;
}

/**
 *
 * When we get an e-mail address from the login username page, this page asks the user for
 * confirmation before requesting the backend to send an actual e-mail to the user.
 */
export function ResetPasswordConfirmEmail(): JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  async function sendEmailOnClick() {
    dispatch(clearNotifications());
    if (email_address) {
      const response = await dispatch(requestEmailLink({ email: email_address }));
      if (requestEmailLink.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      } else {
        resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
      }
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
        <div className="lead">
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
        </div>
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
