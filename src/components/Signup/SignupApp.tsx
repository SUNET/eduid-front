import { skipToken } from "@reduxjs/toolkit/query";
import { useSelector } from "@xstate/react";
import { loginApi } from "apis/eduidLogin";
import { signupApi } from "apis/eduidSignup";
import { RegisterEmail, SignupEmailForm } from "components/Signup/SignupEmailForm";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupCredentialPassword, SignupCredentials } from "./SignupCredentials";
import { ProcessEmailCode, SignupEnterCode } from "./SignupEnterCode";
import { ProcessToU, SignupToU } from "./SignupToU";
import { SignupConfirmPassword, SignupUserCreated } from "./SignupUserCreated";

export function SignupApp(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const state = useSelector(signupContext.signupService, (s) => s);
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Register",
      defaultMessage: "Register | eduID",
    });
  }, []);

  return (
    <React.Fragment>
      {state.matches("SignupStart") && <SignupStart />}
      {state.matches({AskForEmailAddress: "SignupEmailForm"}) && <SignupEmailForm />}
      {state.matches({HandleCaptchaAndToU: "ProcessCaptcha"}) && <ProcessCaptcha />}
      {state.matches({HandleCaptchaAndToU: "SignupCaptcha"}) && <SignupCaptcha />}
      {state.matches({HandleCaptchaAndToU: "SignupToU"}) && <SignupToU />}
      {state.matches({HandleCaptchaAndToU: "ProcessToU"}) && <ProcessToU />}
      {state.matches({HandleCaptchaAndToU: "RegisterEmail"}) && <RegisterEmail />}
      {state.matches({HandleEmail: "SignupEnterCode"}) && <SignupEnterCode />}
      {state.matches({HandleEmail: "ProcessEmailCode"}) && <ProcessEmailCode />}
      {state.matches({HandleCredentials: "SignupCredentials"}) && <SignupCredentials />}
      {state.matches({HandleCredentials: "SignupCredentialPassword"}) && <SignupCredentialPassword />}
      {state.matches({FinaliseUser: "SignupConfirmPassword"}) && <SignupConfirmPassword />}
      {state.matches({FinaliseUser: "SignupUserCreated"}) && <SignupUserCreated />}
    </React.Fragment>
  );
}

/**
 * Startup state to determine what kind of signup this is, and what to do next.
 */
function SignupStart() {
  const signupContext = useContext(SignupGlobalStateContext);
  const is_configured = useAppSelector((state) => state.config.is_configured);
  // bootstrap signup state in redux store by asking the backend for it when configuration is done
  const { data } = signupApi.useFetchStateQuery(is_configured?undefined:skipToken);
  const [ fetchLogout_trigger ] = loginApi.useLazyFetchLogoutQuery();
  
  useEffect(() => {
    if (data != undefined) {
      if (data.payload.state.already_signed_up) {
        fetchLogout_trigger({});
      }
      if(data.payload.state.email?.address) {
        signupContext.signupService.send({ type: "EMAIL_DONE" });
      } else signupContext.signupService.send({ type: "COMPLETE" });
    }
  }, [data]);

  return null;
}
