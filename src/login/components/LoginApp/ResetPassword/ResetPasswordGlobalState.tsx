import { useInterpret } from "@xstate/react";
import { createResetPasswordMachine, ResetPasswordMachineType } from "machines/ResetPasswordMachine";
import React, { createContext } from "react";
import { InterpreterFrom } from "xstate";

export const ResetPasswordGlobalStateContext = createContext({
  resetPasswordService: {} as InterpreterFrom<ResetPasswordMachineType>,
});

export function ResetPasswordGlobalStateProvider(props: { children?: React.ReactNode }) {
  const resetPasswordService = useInterpret(createResetPasswordMachine());

  return (
    <ResetPasswordGlobalStateContext.Provider value={{ resetPasswordService: resetPasswordService }}>
      {props.children}
    </ResetPasswordGlobalStateContext.Provider>
  );
}
