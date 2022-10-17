import { useActor } from "@xstate/react";
import { getPasswordRequest } from "apis/eduidSignup";
import EduIDButton from "components/EduIDButton";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppDispatch } from "signup-hooks";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCredentials(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const [state] = useActor(signupContext.signupService);

  useEffect(() => {
    if (state.event.type != "API_FAIL") {
      // unless we got back here from CreateUser after a backend API error, go straight to using a password for now
      signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });
    }
  }, []);

  console.log("EVENT ", state.event);

  if (state.event.type == "API_FAIL") {
    return (
      <React.Fragment>
        <p>
          <FormattedMessage
            defaultMessage="There was a problem creating your account."
            description="Signup credentials"
          />
        </p>
        <div className="buttons">
          <EduIDButton
            type="submit"
            buttonstyle="secondary"
            onClick={() => signupContext.signupService.send({ type: "ABORT" })}
            id="abort-button"
          >
            <FormattedMessage defaultMessage="Cancel" description="Signup credentials button" />
          </EduIDButton>
          <EduIDButton
            type="submit"
            buttonstyle="primary"
            onClick={() => signupContext.signupService.send({ type: "CHOOSE_PASSWORD" })}
            id="retry-button"
          >
            <FormattedMessage defaultMessage="Retry" description="Signup credentials button" />
          </EduIDButton>
        </div>
      </React.Fragment>
    );
  }

  return <React.Fragment></React.Fragment>;
}

export function SignupCredentialPassword(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();

  async function getPassword() {
    const res = await dispatch(getPasswordRequest());

    if (getPasswordRequest.fulfilled.match(res) && res.payload.email.completed === true) {
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    getPassword();
  }, []);

  return <React.Fragment></React.Fragment>;
}