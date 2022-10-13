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
      {state.matches("SignupEmailForm") && <SignupEmailForm />}
      {state.matches("SignupCaptcha") && <SignupCaptcha />}
      {state.matches("ProcessCaptcha") && <ProcessCaptcha />}
      {state.matches("SignupToU") && <SignupToU />}
      {state.matches("RegisterEmail") && <RegisterEmail />}
      {state.matches("SignupEnterCode") && <SignupEnterCode />}
      {state.matches("ProcessEmailCode") && <ProcessEmailCode />}
      {state.matches("SignupCredentials") && <SignupCredentials />}
      {state.matches("SignupCredentialPassword") && <SignupCredentialPassword />}
      {state.matches("CreateUser") && <CreateUser />}
      {state.matches("SignupUserCreated") && <SignupUserCreated />}

      <p> </p>

      <span>DEBUGGING: Machine state: {state.value}</span>
    </div>
  );
}

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
