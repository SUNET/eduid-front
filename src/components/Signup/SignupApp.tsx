import { useActor } from "@xstate/react";
import { fetchState } from "apis/eduidSignup";
import { RegisterEmail, SignupEmailForm } from "components/Signup/SignupEmailForm";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { useContext, useEffect } from "react";
import { useSignupAppDispatch } from "signup-hooks";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupCredentialPassword, SignupCredentials } from "./SignupCredentials";
import { ProcessEmailCode, SignupEnterCode } from "./SignupEnterCode";
import { SignupToU } from "./SignupToU";
import { CreateUser, SignupUserCreated } from "./SignupUserCreated";

export function SignupApp(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const [state] = useActor(signupContext.signupService);

  return (
    <div id="content" className="horizontal-content-margin content">
      {state.matches("SignupStart") && <SignupStart />}
      {state.matches("AskForEmailAddress.SignupEmailForm") && <SignupEmailForm />}
      {state.matches("HandleCaptchaAndToU.SignupCaptcha") && <SignupCaptcha />}
      {state.matches("HandleCaptchaAndToU.ProcessCaptcha") && <ProcessCaptcha />}
      {state.matches("HandleCaptchaAndToU.SignupToU") && <SignupToU />}
      {state.matches("HandleEmail.RegisterEmail") && <RegisterEmail />}
      {state.matches("HandleEmail.SignupEnterCode") && <SignupEnterCode />}
      {state.matches("HandleEmail.ProcessEmailCode") && <ProcessEmailCode />}
      {state.matches("HandleCredentials.SignupCredentials") && <SignupCredentials />}
      {state.matches("HandleCredentials.SignupCredentialPassword") && <SignupCredentialPassword />}
      {state.matches("FinaliseUser.CreateUser") && <CreateUser />}
      {state.matches("FinaliseUser.SignupUserCreated") && <SignupUserCreated />}

      <p> </p>

      <span>DEBUGGING: Machine state: {JSON.stringify(state.value)}</span>
    </div>
  );
}

/**
 * Startup state to determine what kind of signup this is, and what to do next.
 */
function SignupStart() {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);

  useEffect(() => {
    // bootstrap signup state in redux store by asking the backend for it
    dispatch(fetchState());
  }, []);

  signupContext.signupService.send({ type: "COMPLETE" });

  return null;
}
