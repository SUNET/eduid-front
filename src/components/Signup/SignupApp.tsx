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
    dispatch(signupSlice.actions.setNextPage("SignupStart"));
  }, [dispatch]);

  return (
    <React.Fragment>
      {next_page === "SignupStart" && <SignupStart />}
      {next_page === "SignupEmailForm" && <SignupEmailForm />}
      {next_page === "ProcessCaptcha" && <ProcessCaptcha />}
      {next_page === "SignupCaptcha" && <SignupCaptcha />}
      {next_page === "SignupToU" && <SignupToU />}
      {next_page === "ProcessToU" && <ProcessToU />}
      {next_page === "RegisterEmail" && <RegisterEmail />}
      {next_page === "SignupEnterCode" && <SignupEnterCode />}
      {next_page === "ProcessEmailCode" && <ProcessEmailCode />}
      {next_page === "SignupCredentials" && <SignupCredentials />}
      {next_page === "SignupCredentialPassword" && <SignupCredentialPassword />}
      {next_page === "SignupConfirmPassword" && <SignupConfirmPassword />}
      {next_page === "SignupUserCreated" && <SignupUserCreated />}
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
        dispatch(signupSlice.actions.setNextPage("SignupCaptcha"));
      } else dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
    }
  }, [data, fetchLogout, dispatch]);

  return null;
}
