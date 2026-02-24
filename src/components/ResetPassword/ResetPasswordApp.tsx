import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router";
import loginSlice from "slices/Login";
import resetPasswordSlice from "slices/ResetPassword";
import { EmailLinkSent } from "./EmailLinkSent";
import { HandleExtraSecurities } from "./HandleExtraSecurities";
import { ProcessCaptcha, ResetPasswordCaptcha } from "./ResetPasswordCaptcha";
import { ResetPasswordConfirmEmail } from "./ResetPasswordConfirmEmail";
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
  const intl = useIntl();
  const next_page = useAppSelector((state) => state.resetPassword.next_page);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Reset Password",
      defaultMessage: "Reset password | eduID",
    });
  }, [intl]);

  useEffect(() => {
    if (next_page === undefined) {
      if (loginRef === undefined && params.ref !== undefined) {
        dispatch(loginSlice.actions.addLoginRef({ ref: params.ref, start_url: globalThis.location.href }));
      }
      dispatch(resetPasswordSlice.actions.setNextPage("ASK_FOR_EMAIL_OR_CONFIRM_EMAIL"));
    }
  }, [dispatch, loginRef, next_page, params]);

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
