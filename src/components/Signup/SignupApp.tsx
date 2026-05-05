import { skipToken } from "@reduxjs/toolkit/query";
import { loginApi } from "apis/eduidLogin";
import { signupApi } from "apis/eduidSignup";
import { RegisterEmail, SignupEmailForm } from "components/Signup/SignupEmailForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { signupSlice } from "slices/Signup";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupCredentialPassword, SignupCredentialsError } from "./SignupCredentials";
import { ProcessEmailCode, SignupEnterCode } from "./SignupEnterCode";
import { SignupMFA } from "./SignupMFA";
import { ProcessToU, SignupToU } from "./SignupToU";
import { SignupConfirmPassword, SignupUserCreated } from "./SignupUserCreated";

export function SignupApp(): React.JSX.Element {
  const next_page = useAppSelector((state) => state.signup.next_page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!next_page) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_START"));
    }
  }, [dispatch, next_page]);

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
      {next_page === "SIGNUP_CREDENTIALS_ERROR" && <SignupCredentialsError />}
      {next_page === "SIGNUP_CREDENTIAL_PASSWORD" && <SignupCredentialPassword />}
      {next_page === "SIGNUP_MFA" && <SignupMFA />}
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
  const loginRef = useAppSelector((state) => state.login.ref);
  const service_info = useAppSelector((state) => state.login.service_info);
  const params = useParams<{ ref?: string }>();
  const urlRef = params.ref;
  // bootstrap signup state in redux store by asking the backend for it when configuration is done
  const { data } = signupApi.useFetchStateQuery(is_configured ? undefined : skipToken);
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();
  const [signupReturnToAuthn] = signupApi.useLazySignupReturnToAuthnQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!is_configured || !data) return;

    // Check Redux first, then fall back to URL query parameter (survives refresh)
    const ref = loginRef || urlRef;

    if (ref && service_info) {
      signupReturnToAuthn({ ref: ref, service_info: service_info });
    }
  }, [is_configured, data, loginRef, urlRef, signupReturnToAuthn]);

  useEffect(() => {
    if (data !== undefined) {
      if (data.payload.state.already_signed_up) {
        fetchLogout({});
      }
      if (data.payload.state.user_created) {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
      } else if (data.payload.state.email?.address) {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_CAPTCHA"));
        if (data.payload.state.email?.completed) {
          dispatch(signupSlice.actions.setNextPage("SIGNUP_MFA"));
        }
      } else {
        dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
      }
    }
  }, [data, fetchLogout, dispatch]);

  return null;
}
