import { useInterpret } from "@xstate/react";
import { createSignupMachine, SignupMachineType } from "machines/SignupMachine";
import React, { createContext } from "react";
import { InterpreterFrom } from "xstate";

export const SignupGlobalStateContext = createContext({ signupService: {} as InterpreterFrom<SignupMachineType> });

export function SignupGlobalStateProvider(props: { children?: React.ReactNode }) {
  const signupService = useInterpret(createSignupMachine());

  return (
    <SignupGlobalStateContext.Provider value={{ signupService: signupService }}>
      {props.children}
    </SignupGlobalStateContext.Provider>
  );
}
