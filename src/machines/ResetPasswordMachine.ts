import { setup } from "xstate";

export function createResetPasswordMachine() {
  const machine =
    setup({
      types: {
        events: {} as
          | { type: 'GO_BACK' }
          | { type: 'API_FAIL' }
          | { type: 'API_SUCCESS' }
          | { type: 'CHOOSE_SECURITY_KEY' }
          | { type: 'CHOOSE_FREJA_EID' }
          | { type: 'COMPLETE' }
          | { type: 'CAN_DO_EXTRA_SECURITY' }
          | { type: 'WITHOUT_EXTRA_SECURITY' }
          | { type: 'START_EXTRA_SECURITY' }
          | { type: 'KNOWN_USER' }
          | { type: 'UNKNOWN_USER' }
          | { type: 'BYPASS' }
          | { type: 'START_RESET_PW' }
      }
    }).createMachine({
      predictableActionArguments: true,
      id: "resetPassword",
      initial: "ResetPasswordApp",
      states: {
        ResetPasswordApp: {
          on: {
            START_RESET_PW: {
              target: "AskForEmailOrConfirmEmail",
            },
            CAN_DO_EXTRA_SECURITY: {
              target: "HandleExtraSecurities",
            },
            WITHOUT_EXTRA_SECURITY: {
              target: "FinaliseResetPassword",
            },
          },
        },
        AskForEmailOrConfirmEmail: {
          initial: "AskForEmailOrConfirmEmail",
          states: {
            AskForEmailOrConfirmEmail: {
              on: {
                KNOWN_USER: {
                  target: "ResetPasswordConfirmEmail",
                },
                UNKNOWN_USER: {
                  target: "ResetPasswordEnterEmail",
                },
              },
            },
            ResetPasswordConfirmEmail: {
              on: {
                COMPLETE: {
                  target: "Finished",
                },
                GO_BACK: {
                  target: "#resetPassword.ReturnToPrevious",
                },
              },
            },
            ResetPasswordEnterEmail: {
              on: {
                COMPLETE: {
                  target: "Finished",
                },
                GO_BACK: {
                  target: "#resetPassword.ReturnToPrevious",
                },
              },
            },
            Finished: {
              type: "final",
            },
          },
          onDone: {
            target: "HandleCaptcha",
          },
        },
        HandleCaptcha: {
          initial: "ResetPasswordCaptcha",
          states: {
            ResetPasswordCaptcha: {
              on: {
                COMPLETE: {
                  target: "ProcessCaptcha",
                },
              },
            },
            ProcessCaptcha: {
              on: {
                API_SUCCESS: {
                  target: "EmailLinkSent",
                },
                API_FAIL: {
                  target: "ResetPasswordCaptcha",
                },
                START_RESET_PW: {
                  target: "#resetPassword.AskForEmailOrConfirmEmail.ResetPasswordEnterEmail",
                },
              },
            },
            EmailLinkSent: {
              on: {
                WITHOUT_EXTRA_SECURITY: {
                  target: "#resetPassword.FinaliseResetPassword",
                },
                CHOOSE_SECURITY_KEY: {
                  // target: "ResetPasswordEnterEmail",
                  target: "Finished",
                },
                GO_BACK: {
                  target: "#resetPassword.ReturnToPrevious",
                },
              },
            },
            Finished: {
              type: "final",
            },
          },
          onDone: {
            target: "HandleExtraSecurities",
          },
        },
        HandleExtraSecurities: {
          initial: "HandleExtraSecurities",
          states: {
            HandleExtraSecurities: {
              on: {
                CHOOSE_SECURITY_KEY: {
                  target: "ExtraSecurityFinished",
                },
                CHOOSE_FREJA_EID: {
                  target: "ResetPasswordExternalMFA",
                },
                WITHOUT_EXTRA_SECURITY: {
                  target: "ExtraSecurityFinished",
                },
                API_SUCCESS: {
                  target: "ExtraSecurityFinished",
                },
              },
            },
            ResetPasswordSecurityKey: {
              on: {
                API_SUCCESS: {
                  target: "ExtraSecurityFinished",
                },
                API_FAIL: {
                  target: "Fail",
                },
              },
            },
            ResetPasswordExternalMFA: {
              on: {
                COMPLETE: {
                  target: "ExtraSecurityFinished",
                },
              },
            },
            ExtraSecurityFinished: {
              type: "final",
            },
            Fail: {
              always: {
                target: "HandleExtraSecurities",
              },
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
                GO_BACK: {
                  target: "#resetPassword.AskForEmailOrConfirmEmail.ResetPasswordEnterEmail",
                },
                START_EXTRA_SECURITY: {
                  target: "#resetPassword.HandleExtraSecurities",
                },
              },
            },
            ResetPasswordSuccess: {
              type: "final",
            },
          },
        },
        ReturnToPrevious: {
          initial: "ReturnToPrevious",
          states: {
            ReturnToPrevious: {
              type: "final",
            },
          },
        },
      },
    });
  return machine;
}

export type ResetPasswordMachineType = ReturnType<typeof createResetPasswordMachine>;
