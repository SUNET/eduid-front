import { useActorRef } from "@xstate/react";
import { createSignupMachine, SignupMachineType } from "machines/SignupMachine";
import React, { createContext, useMemo } from "react";
import { Actor } from "xstate";

export const SignupGlobalStateContext = createContext({ signupService: {} as Actor<SignupMachineType> });

export function SignupGlobalStateProvider(props: { children?: React.ReactNode }) {
  const signupService = useActorRef(createSignupMachine());
  const signupServiceValue = useMemo(() => ({ signupService }), [signupService]);

  return (
    <SignupGlobalStateContext.Provider value={signupServiceValue}>{props.children}</SignupGlobalStateContext.Provider>
  );
}
