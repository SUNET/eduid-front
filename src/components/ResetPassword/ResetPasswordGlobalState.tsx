// import { useActorRef } from "@xstate/react";
// import { createResetPasswordMachine, ResetPasswordMachineType } from "machines/ResetPasswordMachine";
// import React, { createContext, useMemo } from "react";
// import { Actor } from "xstate";

// export const ResetPasswordGlobalStateContext = createContext({
//   resetPasswordService: {} as Actor<ResetPasswordMachineType>,
// });

// export function ResetPasswordGlobalStateProvider(props: { children?: React.ReactNode }) {
//   const resetPasswordService = useActorRef(createResetPasswordMachine());
//   const resetPasswordServiceValue = useMemo(() => ({ resetPasswordService }), [resetPasswordService]);

//   return (
//     <ResetPasswordGlobalStateContext.Provider value={resetPasswordServiceValue}>
//       {props.children}
//     </ResetPasswordGlobalStateContext.Provider>
//   );
// }
