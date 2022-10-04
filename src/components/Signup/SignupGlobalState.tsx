import { useInterpret } from "@xstate/react";
import { signupMachine } from "machines/SignupMachine";
import React, { createContext } from "react";
import { InterpreterFrom } from "xstate";

export const SignupGlobalStateContext = createContext({ signupService: {} as InterpreterFrom<typeof signupMachine> });

export function SignupGlobalStateProvider(props: { children?: React.ReactNode }) {
  const signupService = useInterpret(signupMachine);

  return (
    <SignupGlobalStateContext.Provider value={{ signupService: signupService }}>
      {props.children}
    </SignupGlobalStateContext.Provider>
  );
}
