import { useInterpret } from "@xstate/react";
import { createSignupMachine, SignupMachineType } from "machines/SignupMachine";
import React, { createContext, useMemo } from "react";
import { InterpreterFrom } from "xstate";

export const SignupGlobalStateContext = createContext({ signupService: {} as InterpreterFrom<SignupMachineType> });

export function SignupGlobalStateProvider(props: { children?: React.ReactNode }) {
  const signupService = useInterpret(createSignupMachine());
  const signupServiceValue = useMemo(() => ({ signupService }), [signupService]);

  return (
    <SignupGlobalStateContext.Provider value={signupServiceValue}>{props.children}</SignupGlobalStateContext.Provider>
  );
}
