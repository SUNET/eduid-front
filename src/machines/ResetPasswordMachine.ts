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
    },
  }
);

export function createResetPasswordMachine() {
  const machine = resetPasswordModel.createMachine({
    context: resetPasswordModel.initialContext,
    tsTypes: {} as import("./ResetPasswordMachine.typegen").Typegen0,
    predictableActionArguments: true,
    id: "resetPassword",
    initial: "ResetPasswordStart",
    states: {
      ResetPasswordStart: {
        on: {
          COMPLETE: {
            target: "AskForEmailAddress",
          },
        },
      },
      AskForEmailAddress: {
        initial: "ResetPasswordEmailForm",
        states: {
          ResetPasswordEmailForm: {
            on: {
              COMPLETE: {
                target: "HandleEmailCode",
              },
              ABORT: {
                target: "AskForEmailAddress",
              },
            }
          },
          HandleEmailCode: {
            on: {
              API_SUCCESS: {
                target: "HandleExtraSecurityKey",
              },
              API_FAIL: {
                target: "ResetPasswordEmailForm",
              }
            }
          },
          HandleExtraSecurityKey: {
            initial: "ExtraSecurityKey",
            on:{
              CHOOSE_EXTRA_SECURITY: {
                target:"ResetPasswordSecurityToken"
              },
              CHOOSE_PHONE_VERIFICATION: {
                target:"ResetPasswordPhoneVerification"
              },
              CHOOSE_FREJA_EID: {
                target:"ResetPasswordFrejaEid"
              },
              CHOOSE_NO_EXTRA_SECURITY: {
                target:"SetNewPassword"
              },
            },
          },
          ResetPasswordSecurityToken: {
            on: {
              API_SUCCESS: {
                target: "SetNewPassword",
              },
              API_FAIL: {
                target: "HandleExtraSecurityKey"
              }
            }
          },
          ResetPasswordPhoneVerification: {
            on: {
              API_SUCCESS: {
                target: "SetNewPassword",
              },
              API_FAIL: {
                target: "HandleExtraSecurityKey"
              }
            }
          },
          ResetPasswordFrejaEid: {
            on: {
              API_SUCCESS: {
                target: "SetNewPassword",
              },
              API_FAIL: {
                target: "HandleExtraSecurityKey"
              }
            }
          },
          SetNewPassword: {
            on: {
              API_SUCCESS: {
                target: "ResetPasswordSuccess",
              },
              API_FAIL: {
                target: "ResetPasswordEmailForm"
              }
            }
          },
          ResetPasswordSuccess: {
            
          }
  });
  return machine;
}

export type ResetPasswordMachineType = ReturnType<typeof createResetPasswordMachine>;
