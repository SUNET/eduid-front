import { useActor } from "@xstate/react";
import { fetchLogout } from "apis/eduidLogin";
import { fetchState } from "apis/eduidSignup";
import { RegisterEmail, SignupEmailForm } from "components/Signup/SignupEmailForm";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupCredentialPassword, SignupCredentials } from "./SignupCredentials";
import { ProcessEmailCode, SignupEnterCode } from "./SignupEnterCode";
import { ProcessToU, SignupToU } from "./SignupToU";
import { SignupConfirmPassword, SignupUserCreated } from "./SignupUserCreated";

export function SignupApp(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const [state] = useActor(signupContext.signupService);
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
      {state.matches("AskForEmailAddress.SignupEmailForm") && <SignupEmailForm />}
      {state.matches("HandleCaptchaAndToU.SignupCaptcha") && <SignupCaptcha />}
      {state.matches("HandleCaptchaAndToU.ProcessCaptcha") && <ProcessCaptcha />}
      {state.matches("HandleCaptchaAndToU.SignupToU") && <SignupToU />}
      {state.matches("HandleCaptchaAndToU.ProcessToU") && <ProcessToU />}
      {state.matches("HandleCaptchaAndToU.RegisterEmail") && <RegisterEmail />}
      {state.matches("HandleEmail.SignupEnterCode") && <SignupEnterCode />}
      {state.matches("HandleEmail.ProcessEmailCode") && <ProcessEmailCode />}
      {state.matches("HandleCredentials.SignupCredentials") && <SignupCredentials />}
      {state.matches("HandleCredentials.SignupCredentialPassword") && <SignupCredentialPassword />}
      {state.matches("FinaliseUser.SignupConfirmPassword") && <SignupConfirmPassword />}
      {state.matches("FinaliseUser.SignupUserCreated") && <SignupUserCreated />}
    </React.Fragment>
  );
}

/**
 * Startup state to determine what kind of signup this is, and what to do next.
 */
function SignupStart() {
  const dispatch = useAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const is_configured = useAppSelector((state) => state.config.is_configured);

  useEffect(() => {
    // bootstrap signup state in redux store by asking the backend for it
    async function fetchSignupState(): Promise<void> {
      const response = await dispatch(fetchState());
      if (fetchState.fulfilled.match(response)) {
        if (response.payload.state.already_signed_up) {
          dispatch(fetchLogout({}));
        }
        const { email } = response.payload.state || {};
        if (email?.address) {
          signupContext.signupService.send({ type: "BYPASS" });
        } else signupContext.signupService.send({ type: "COMPLETE" });
      }
    }
    if (is_configured) {
      fetchSignupState();
    }
  }, [is_configured]);

  return null;
}
