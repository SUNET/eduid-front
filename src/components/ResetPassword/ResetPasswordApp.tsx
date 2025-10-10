import { useSelector } from "@xstate/react";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect, useState } from "react";
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
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";
import { ResetPasswordSuccess, SetNewPassword } from "./SetNewPassword";

// URL parameters passed to ResetPasswordRequestEmail
export interface UrlParams {
  ref?: string;
}

type PageStatus =
  | "resetPasswordApp"
  | "AskForEmailOrConfirmEmail"
  | "ResetPasswordConfirmEmail"
  | "ResetPasswordEnterEmail"
  | "ResetPasswordCaptcha"
  | "ProcessCaptcha"
  | "EmailLinkSent"
  | "HandleExtraSecurities"
  | "SetNewPassword"
  | "ResetPasswordSuccess";

export function ResetPasswordApp(): React.JSX.Element {
  const params = useParams() as UrlParams;
  const dispatch = useAppDispatch();
  const loginRef = useAppSelector((state) => state.login.ref);
  const swedishEID_status = useAppSelector((state) => state.resetPassword.swedishEID_status);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const state = useSelector(resetPasswordContext.resetPasswordService, (s) => s);
  const intl = useIntl();
  const [currentPage, setCurrentPage] = useState<PageStatus>("resetPasswordApp");

  const currentPages = {
    AskForEmailOrConfirmEmail: <AskForEmailOrConfirmEmail />,
    ResetPasswordConfirmEmail: <ResetPasswordConfirmEmail />,
    ResetPasswordEnterEmail: <ResetPasswordEnterEmail />,

    ResetPasswordCaptcha: <ResetPasswordCaptcha />,
    ProcessCaptcha: <ProcessCaptcha />,
    EmailLinkSent: <EmailLinkSent />,
    HandleExtraSecurities: <HandleExtraSecurities />,
    SetNewPassword: <SetNewPassword />,
    ResetPasswordSuccess: <ResetPasswordSuccess />,
  };

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Reset Password",
      defaultMessage: "Reset password | eduID",
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
    setCurrentPage("AskForEmailOrConfirmEmail");
    // resetPasswordContext.resetPasswordService.send({ type: "START_RESET_PW" });
  }, [loginRef, params]);

  return (
    <React.Fragment>
      {currentPages["AskForEmailOrConfirmEmail"] && <AskForEmailOrConfirmEmail setCurrentPage={setCurrentPage} />}
      {currentPages["ResetPasswordConfirmEmail"] && <ResetPasswordConfirmEmail setCurrentPage={setCurrentPage} />}
      {currentPages["ResetPasswordEnterEmail"] && <ResetPasswordEnterEmail setCurrentPage={setCurrentPage} />}
      {currentPages["ResetPasswordCaptcha"] && <ResetPasswordCaptcha setCurrentPage={setCurrentPage} />}
      {currentPages["ProcessCaptcha"] && <ProcessCaptcha setCurrentPage={setCurrentPage} />}
      {currentPages["EmailLinkSent"] && <EmailLinkSent setCurrentPage={setCurrentPage} />}
      {currentPages["HandleExtraSecurities"] && <HandleExtraSecurities setCurrentPage={setCurrentPage} />}
      {currentPages["SetNewPassword"] && <SetNewPassword setCurrentPage={setCurrentPage} />}
      {currentPages["ResetPasswordSuccess"] && <ResetPasswordSuccess setCurrentPage={setCurrentPage} />}
    </React.Fragment>
  );
}

function AskForEmailOrConfirmEmail(setCurrentPage: any): null {
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?

  useEffect(() => {
    if (email_status === undefined || !email_status) {
      if (email_address) {
        setCurrentPage("ResetPasswordConfirmEmail");
        // resetPasswordContext.resetPasswordService.send({ type: "KNOWN_USER" });
      } else {
        setCurrentPage("ResetPasswordEnterEmail");
        // resetPasswordContext.resetPasswordService.send({ type: "UNKNOWN_USER" });
      }
    }
  }, [email_status, email_address]);

  return null;
}

/**
 *
 * When we get an e-mail address from the login username page, this page asks the user for
 * confirmation before requesting the backend to send an actual e-mail to the user.
 */
export function ResetPasswordConfirmEmail(setCurrentPage: any): React.JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const captcha_completed = useAppSelector((state) => state.resetPassword.captcha_completed);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  useEffect(() => {
    if (captcha_completed) {
      dispatch(clearNotifications());
    }
  }, [captcha_completed]);

  async function sendEmailOnClick() {
    dispatch(clearNotifications());
    if (email_address) {
      dispatch(resetPasswordSlice.actions.setEmailAddress(email_address));
      // resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
      setCurrentPage("ResetPasswordCaptcha");
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
