import React, { useContext } from "react";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCredentials(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);

  // TODO: Ask user if they want to create a password or use a password-less login method
  signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });

  return <React.Fragment></React.Fragment>;
}
