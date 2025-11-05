import { skipToken } from "@reduxjs/toolkit/query";
import { loginApi } from "apis/eduidLogin";
import { signupApi } from "apis/eduidSignup";
import { RegisterEmail, SignupEmailForm } from "components/Signup/SignupEmailForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { signupSlice } from "slices/Signup";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupCredentialPassword, SignupCredentials } from "./SignupCredentials";
import { ProcessEmailCode, SignupEnterCode } from "./SignupEnterCode";
import { ProcessToU, SignupToU } from "./SignupToU";
import { SignupConfirmPassword, SignupUserCreated } from "./SignupUserCreated";

export function SignupApp(): React.JSX.Element {
  const next_page = useAppSelector((state) => state.signup.next_page);
  const intl = useIntl();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Register",
      defaultMessage: "Register | eduID",
    });
  }, [intl]);

  useEffect(() => {
    if (!next_page) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_START"));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      {next_page === "SIGNUP_START" && <SignupStart />}
      {next_page === "SIGNUP_EMAIL_FORM" && <SignupEmailForm />}
      {next_page === "PROCESS_CAPTCHA" && <ProcessCaptcha />}
      {next_page === "SIGNUP_CAPTCHA" && <SignupCaptcha />}
      {next_page === "SIGNUP_TOU" && <SignupToU />}
      {next_page === "PROCESS_TOU" && <ProcessToU />}
      {next_page === "REGISTER_EMAIL" && <RegisterEmail />}
      {next_page === "SIGNUP_ENTER_CODE" && <SignupEnterCode />}
      {next_page === "PROCESS_EMAIL_CODE" && <ProcessEmailCode />}
      {next_page === "SIGNUP_CREDENTIALS" && <SignupCredentials />}
      {next_page === "SIGNUP_CREDENTIAL_PASSWORD" && <SignupCredentialPassword />}
      {next_page === "SIGNUP_CONFIRM_PASSWORD" && <SignupConfirmPassword />}
      {next_page === "SIGNUP_USER_CREATED" && <SignupUserCreated />}
    </React.Fragment>
  );
}

/**
 * Startup state to determine what kind of signup this is, and what to do next.
 */
function SignupStart() {
  const is_configured = useAppSelector((state) => state.config.is_configured);
  // bootstrap signup state in redux store by asking the backend for it when configuration is done
  const { data } = signupApi.useFetchStateQuery(is_configured ? undefined : skipToken);
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data != undefined) {
      if (data.payload.state.already_signed_up) {
        fetchLogout({});
      }
      if (data.payload.state.email?.address) {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_CAPTCHA"));
      } else dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
    }
  }, [data, fetchLogout, dispatch]);

  return null;
}
