import { getPasswordRequest } from "apis/eduidSignup";
import React, { useContext, useEffect } from "react";
import { useSignupAppDispatch } from "signup-hooks";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCredentials(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);

  // TODO: Ask user if they want to create a password or use a password-less login method
  signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });

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
