import { skipToken } from "@reduxjs/toolkit/query";
import { loginApi } from "apis/eduidLogin";
import { signupApi, SignupState } from "apis/eduidSignup";
import { RegisterEmail } from "components/Signup/SignupEmailForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { NextPageTypes, signupSlice } from "slices/Signup";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupCredentials } from "./SignupCredentials";
import { SignupCredentialsError } from "./SignupCredentialsError";
import { ProcessEmailCode, SignupEnterCode } from "./SignupEnterCode";
import { SignupEntry } from "./SignupEntry";
import { ProcessToU, SignupToU } from "./SignupToU";
import { SignupUserCreated } from "./SignupUserCreated";

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
      {next_page === "SIGNUP_ENTRY" && <SignupEntry />}
      {next_page === "PROCESS_CAPTCHA" && <ProcessCaptcha />}
      {next_page === "SIGNUP_CAPTCHA" && <SignupCaptcha />}
      {next_page === "SIGNUP_TOU" && <SignupToU />}
      {next_page === "PROCESS_TOU" && <ProcessToU />}
      {next_page === "REGISTER_EMAIL" && <RegisterEmail />}
      {next_page === "SIGNUP_ENTER_CODE" && <SignupEnterCode />}
      {next_page === "PROCESS_EMAIL_CODE" && <ProcessEmailCode />}
      {next_page === "SIGNUP_CREDENTIALS_ERROR" && <SignupCredentialsError />}
      {next_page === "SIGNUP_CREDENTIALS" && <SignupCredentials />}
      {next_page === "SIGNUP_USER_CREATED" && <SignupUserCreated />}
    </React.Fragment>
  );
}

function getExternalMfaNextPage(state: SignupState): NextPageTypes {
  if (state.tou?.completed && state.email?.address) return "SIGNUP_ENTER_CODE";
  if (state.tou?.completed) return "SIGNUP_ENTRY";
  if (!state.email?.address) return "SIGNUP_ENTRY";
  return "SIGNUP_TOU";
}

function getEmailNextPage(state: SignupState): NextPageTypes {
  if (!state.captcha.completed) return "SIGNUP_CAPTCHA";
  if (!state.tou?.completed) return "SIGNUP_TOU";
  return "SIGNUP_ENTER_CODE";
}

function getNextPage(state: SignupState): NextPageTypes | null {
  if (state.already_signed_up) return null;
  if (state.email?.completed) return "SIGNUP_CREDENTIALS";
  if (state.external_mfa?.completed) return getExternalMfaNextPage(state);
  if (state.email?.address) return getEmailNextPage(state);
  return "SIGNUP_ENTRY";
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
  }, [is_configured, data, loginRef, urlRef, signupReturnToAuthn, service_info]);

  useEffect(() => {
    if (data !== undefined) {
      const nextPage = getNextPage(data.payload.state);
      if (nextPage === null) {
        fetchLogout({});
      } else {
        dispatch(signupSlice.actions.setNextPage(nextPage));
      }
    }
  }, [data, fetchLogout, dispatch]);

  return null;
}
