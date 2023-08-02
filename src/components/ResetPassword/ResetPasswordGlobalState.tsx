import { useInterpret } from "@xstate/react";
import { createResetPasswordMachine, ResetPasswordMachineType } from "machines/ResetPasswordMachine";
import React, { createContext, useMemo } from "react";
import { InterpreterFrom } from "xstate";

export const ResetPasswordGlobalStateContext = createContext({
  resetPasswordService: {} as InterpreterFrom<ResetPasswordMachineType>,
});

export function ResetPasswordGlobalStateProvider(props: { children?: React.ReactNode }) {
  const resetPasswordService = useInterpret(createResetPasswordMachine());
  const resetPasswordServiceValue = useMemo(() => ({ resetPasswordService }), [resetPasswordService]);

  return (
    <ResetPasswordGlobalStateContext.Provider value={resetPasswordServiceValue}>
      {props.children}
    </ResetPasswordGlobalStateContext.Provider>
  );
}
