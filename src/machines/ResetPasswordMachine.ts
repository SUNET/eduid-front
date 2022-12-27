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
      CHOOSE_SECURITY_KEY: () => ({}), // no payload
      CHOOSE_PHONE_VERIFICATION: () => ({}), // no payload
      CHOOSE_FREJA_EID: () => ({}), // no payload
      CHOOSE_NO_EXTRA_SECURITY: () => ({}), // no payload
      COMPLETE: () => ({}), // no payload
      FAIL: () => ({}), // no payload
      SUCCESS: () => ({}), // no payload
      BYPASS: () => ({}),
      AVAILABLE_EXTRA_SECURITY: () => ({}),
      UNAVAILABLE_EXTRA_SECURITY: () => ({}),
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
                  target: "Finished",
                },
                API_FAIL: {
                  target: "#resetPassword.AskForEmailOrConfirmEmail",
                },
              },
            },
            ResetPasswordEnterEmail: {
              on: {
                API_SUCCESS: {
                  target: "Finished",
                },
                API_FAIL: {
                  target: "#resetPassword.AskForEmailOrConfirmEmail",
                },
              },
            },
            Finished: {
              type: "final",
            },
          },
          onDone: {
            target: "EmailLinkSent",
          },
        },
        EmailLinkSent: {
          initial: "EmailLinkSent",
          states: {
            EmailLinkSent: {
              on: {
                API_SUCCESS: {
                  target: "EmailLinkSentFinished",
                },
              },
            },
            EmailLinkSentFinished: {
              type: "final",
            },
          },
          onDone: {
            target: "HandleEmailCode",
          },
        },
        HandleEmailCode: {
          initial: "EmailCode",
          states: {
            EmailCode: {
              on: {
                API_SUCCESS: {
                  target: "EmailCodeFinished",
                },
                API_FAIL: {
                  target: "#resetPassword.AskForEmailOrConfirmEmail",
                },
              },
            },
            EmailCodeFinished: {
              type: "final",
            },
          },
          onDone: {
            target: "HandleExtraSecurities",
          },
        },
        HandleExtraSecurities: {
          initial: "ProcessExtraSecurities",
          states: {
            ProcessExtraSecurities: {
              on: {
                AVAILABLE_EXTRA_SECURITY: {
                  target: "ResetPasswordExtraSecurities",
                },
                UNAVAILABLE_EXTRA_SECURITY: {
                  target: "ResetPasswordWithoutSecurity",
                },
              },
            },
            ResetPasswordExtraSecurities: {
              on: {
                CHOOSE_SECURITY_KEY: {
                  target: "ResetPasswordSecurityKey",
                },
                CHOOSE_PHONE_VERIFICATION: {
                  target: "ResetPasswordPhoneVerification",
                },
                CHOOSE_FREJA_EID: {
                  target: "ResetPasswordFrejaEID",
                },
                CHOOSE_NO_EXTRA_SECURITY: {
                  target: "ResetPasswordWithoutSecurity",
                },
                ABORT: {
                  target: "",
                },
              },
            },
            ResetPasswordSecurityKey: {
              on: {
                API_SUCCESS: {
                  target: "ExtraSecurityFinished",
                },
                API_FAIL: {
                  target: "ResetPasswordExtraSecurities",
                },
              },
            },
            ResetPasswordPhoneVerification: {
              on: {
                API_SUCCESS: {
                  target: "ExtraSecurityFinished",
                },
                API_FAIL: {
                  target: "ResetPasswordExtraSecurities",
                },
              },
            },
            ResetPasswordFrejaEID: {
              on: {
                API_SUCCESS: {
                  target: "ExtraSecurityFinished",
                },
                API_FAIL: {
                  target: "ResetPasswordExtraSecurities",
                },
              },
            },
            ResetPasswordWithoutSecurity: {
              on: {
                API_SUCCESS: {
                  target: "ExtraSecurityFinished",
                },
                API_FAIL: {
                  target: "ResetPasswordExtraSecurities",
                },
              },
            },
            ExtraSecurityFinished: {
              type: "final",
            },
          },
          onDone: {
            target: "FinaliseResetPassword",
          },
        },
        FinaliseResetPassword: {
          initial: "SetNewPassword",
          states: {
            SetNewPassword: {
              on: {
                API_SUCCESS: {
                  target: "ResetPasswordSuccess",
                },
                API_FAIL: {
                  target: "#resetPassword.AskForEmailOrConfirmEmail",
                },
              },
            },
            ResetPasswordSuccess: {
              type: "final",
            },
          },
        },
      },
    });
  return machine;
}

export type ResetPasswordMachineType = ReturnType<typeof createResetPasswordMachine>;
