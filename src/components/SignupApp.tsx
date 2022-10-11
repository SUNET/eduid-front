import { useActor } from "@xstate/react";
import { fetchState } from "apis/eduidSignup";
import { SignupGlobalStateContext } from "components/Signup/SignupGlobalState";
import { SignupEmailForm, RegisterEmail } from "login/components/RegisterEmail/SignupEmailForm";
import { useContext, useEffect } from "react";
import { useSignupAppDispatch } from "signup-hooks";
import { SignupCredentials } from "./Signup/SignupCredentials";
import { SignupToU } from "./Signup/SignupToU";
import { ProcessCaptcha, SignupCaptcha } from "./SignupCaptcha";
import { SignupEnterCode } from "./SignupEnterCode";

export function SignupApp(): JSX.Element {
  const dispatch = useSignupAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const [state] = useActor(signupContext.signupService);

  useEffect(() => {
    dispatch(fetchState());
  }, []);

  return (
    <div id="content" className="horizontal-content-margin content">
      {state.matches("SignupEmailForm") && <SignupEmailForm />}
      {state.matches("SignupCaptcha") && <SignupCaptcha />}
      {state.matches("ProcessCaptcha") && <ProcessCaptcha />}
      {state.matches("SignupToU") && <SignupToU />}
      {state.matches("RegisterEmail") && <RegisterEmail />}
      {state.matches("SignupEnterCode") && <SignupEnterCode />}
      {state.matches("SignupCredentials") && <SignupCredentials />}

      <p> </p>

      <span>DEBUGGING: Machine state: {state.value}</span>
    </div>
  );
}
