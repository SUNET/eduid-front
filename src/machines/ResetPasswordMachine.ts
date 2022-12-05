import { createModel } from "xstate/lib/model";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResetPasswordContext {}

const resetPasswordModel = createModel(
  // Initial context
  {} as ResetPasswordContext,
  {
    // Event creators
    events: {
      ABORT: () => ({}), // no payload
      API_FAIL: () => ({}), // no payload
      API_SUCCESS: () => ({}), // no payload
      CHOOSE_EXTRA_SECURITY: () => ({}), // no payload
      CHOOSE_PHONE_VERIFICATION: () => ({}), // no payload
      CHOOSE_FREJA_EID: () => ({}), // no payload
      CHOOSE_NO_EXTRA_SECURITY: () => ({}), // no payload
      COMPLETE: () => ({}), // no payload
      FAIL: () => ({}), // no payload
      SUCCESS: () => ({}), // no payload
      BYPASS: () => ({}),
    },
  }
);

export function createResetPasswordMachine() {
  const machine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCc5gC4AUCGtYHcB7ZCAOgCU0tcDiIBldbZdAYgGEB5AWUwBkAogBUBAbQAMAXUSgADoVgBLdIsIA7GSAAeiAKwAmADQgAnogBs4gMyld4++IDsARgAsr8QA5vAXx-HUWAwcPCISUgBBWABrADFiAQBbbEUAGwiICEDYCioQ2hIBNXQwZCSU1I4efmExKU15JRV1TR0EfStHUnFzfVdPcT7Pc0cPV2MzBEddV1sHJ2ddXSsATmdHPwC8mjCyKLiE5LSMrLgc8rS+RTVo+jBi0gvUq5u74qreQREJaSQQRuUqg0fzarn0um6Vk8KxWVn0gys-RmE0Qoy683EBnEMOcVmcfn8IDUhAgcE0gWCOzouSC1FCdEYzHQDQUgJaIMQYJRCE8NgxHXBix6mxAFLpBT2MXiZSO6Uy2RplPphWKpSeLKaQNaiH0+nRvX6g36IzG3Nci268w6rkc03M7hFYvyu0iUsOFROCqeL1u93Qj1lPrezL+AOawNAoPWpGcfRWllcK0ciIGjm5A1m-JWTis5k8rkd22VkoOMo98rOAYqQb9GrZEe0iFzKxjcYTSZTTm55l0nktDn03htvV0hdpzup+2lT09Zzr4e1CHWLZ6QyNw1G4nGpib+nM-ate8xvLHSol861HIQAFpzNzrxCYU-n8-HCsCT4gA */
    resetPasswordModel.createMachine({
      context: resetPasswordModel.initialContext,
      tsTypes: {} as import("./ResetPasswordMachine.typegen").Typegen0,
      predictableActionArguments: true,
      id: "resetPassword",
      initial: "ResetPasswordStart",
      states: {
        ResetPasswordStart: {
          on: {
            COMPLETE: {
              target: "AskForEmailOrConfirmEmail",
            },
          },
        },
        AskForEmailOrConfirmEmail: {
          initial: "ResetPasswordRequestEmail",
          states: {
            ResetPasswordRequestEmail: {
              on: {
                COMPLETE: {
                  target: "ResetPasswordConfirmEmail",
                },
                BYPASS: {
                  target: "ResetPasswordEnterEmail",
                },
              },
            },
            ResetPasswordConfirmEmail: {
              on: {
                API_SUCCESS: {
                  target: "EmailLinkSent",
                },
                API_FAIL: {
                  target: "ResetPasswordEnterEmail",
                },
              },
            },
            ResetPasswordEnterEmail: {
              on: {
                API_SUCCESS: {
                  target: "EmailLinkSent",
                },
                API_FAIL: {
                  target: "ResetPasswordEnterEmail",
                },
              },
            },
            EmailLinkSent: {
              type: "final",
            },
          },
        },
      },
    });
  return machine;
}

export type ResetPasswordMachineType = ReturnType<typeof createResetPasswordMachine>;
