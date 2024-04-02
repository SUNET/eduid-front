import { createModel } from "xstate/lib/model";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ResetPasswordContext {}

const resetPasswordModel = createModel(
  // Initial context
  {} as ResetPasswordContext,
  {
    // Event creators
    events: {
      GO_BACK: () => ({}), // no payload
      API_FAIL: () => ({}), // no payload
      API_SUCCESS: () => ({}), // no payload
      CHOOSE_SECURITY_KEY: () => ({}), // no payload
      CHOOSE_PHONE_VERIFICATION: () => ({}), // no payload
      CHOOSE_FREJA_EID: () => ({}), // no payload
      COMPLETE: () => ({}), // no payload
      CAN_DO_EXTRA_SECURITY: () => ({}), // no payload
      WITHOUT_EXTRA_SECURITY: () => ({}), // no payload
      START_EXTRA_SECURITY: () => ({}), // no payload
      KNOWN_USER: () => ({}), // no payload
      UNKNOWN_USER: () => ({}), // no payload
    },
  }
);

export function createResetPasswordMachine() {
  const machine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCc5gC4AUCGtYHcB7ZCAOgCU0tcDiIBBAB0YGIBhAeQFlMAZAUQAq-ANoAGALqJQjQrACW6eYQB20kAA9EAJgAsADlLaArABoQAT0QBGa2IDsR4wF9n51LAw48REhSretCRMrGz0AHIA+gAiHJH8ABqC5PSRAMr8bACq5ACSggCa4lJIILIKSqrqWghi5la1ru4BNL5klJ7UPnQhLADq+QASHFmC8Ukp6Zk5+UWS6uWKymqlNXWWiGJNIB5erXSk9LAA1gBixPwAttjyADYcyGyqAGbyyJdXN7eHJ+fIn3cHk8VK93gDbuxuHwhKJ5qVFpUVqAagA2fTaUgo+zWfT2MwbBDWADM1hRpGM+iJRO06N09gcYhcbh2LW6fiOZwu10Bjxebw+3O+HL+4KBfLBgpYACECph6Gk0sUFnIllVVog0RisTi8fVEABOIliUhiU1m82m6zbXZdIJkYVcr5ikH88H+TqBNrA0ECr4seiYXLpLJsNj8BVK+EqxHVGxifUYon6sQokx6wnWXTGUj6fV5-R03TWbS2a2su0-Tn-QXOn1ujp7NkQb2uyUBoOnei5XiRmTR5axwnxxPJ1P4hrE7REk0W2faMse-bs36OnktiVfd2Nu3r313f1SjjkQS9sr9tXImw4wy5lNpgnE-TZ4yzi3z5k2z0HB3Vp28l0bncW62m0-AqOgYC-vu7bBqG4aKnCfYVAO6qEroRqkPY+jFuOV5iNYTivma77NIuTaViKNb-nWgrAV+JBgRBUEQjBnbdqeCIoZehJovqTjpsWKLGnY2K6DSxiiSSC7bm0FGrvc1GtpuDYgXQjGQeCB5HieiFnshF4PiS2ZCaJ4mSdY5g1NY+popiuh3kypEyd+K7MbWSlAeCvDyCoxxpGA4H+oGsFhhGumcQZVnocaWE4QJjIxS+RFiCRLJkRWP6iopgHfF5Pl+QF6BBR2XY9uF55IpoNjRZh2H3hO1jGAReLSapy5Vllu5unlvn+YF9CHseHEVYOmYYbF9U2NoKVOK19H2q5nXinu3wABbYCoEC3GA9AAEbEEVw36ZVazplsH7lrJgwbVtYD8Bo6DINg-kAMYAK7IEscAsBAqhgKQsDoNgEGkJ+S5kNdm3bfdj3PWA72fUocBHaqJ2IMY2jpth5JzeDpCQ7dMNPa9H1fbA+M3dDD3E-DpNI7A7DDBwGRTNkeSFJEADS-BzCUSGo+oDT2LofEotZYh0mLyZ0vYllTRLpD6sYJImLj5EE1TsMk4j8hwBTUN3dTcMI2TjMcMz-CRJgwzhJbABq-B5KcuRhIIuQcOEKMxqhxYK0rKu4QgdWkLY0v2FLEv2PYasVhrhta7TOt63HRPG3TusM2wTMs6c5D8AAUqk-C5NEXtcVVhLTboivK3FBL0gREeS+LMsx1dlPxzTJv0-rhNG9rptZ+bLPhHEiTJKkGRs7MZeRfL1f+3XDQosrmIt+H6-Rxd6XtwbqcDz3Kf94npswWkIahQhfN6QLPtVzXAdY8La9h03UdtwcR8J93Gd0eDB8WE5mACwxUQrwVnmjBA2gTAEW0DZXEgddBZkxCiVBaD0FYl0B-PwX8u7pz1ipeaACgEgNYqVCBg5oFNSMPA3UBIkzZlJBgjBwtsEQw7vvE+PdCHg0wKtP6dtILyFeC9YGyxIQ8AEMIChqEqGwNoYHYwugyTMOYVvJybV2F72Pj-Ahl06B8IEUIkRYjVCgLYmVa+EVIFyJoWiOhDQRZkiYao1BrDt7ORwRwnR+DyY8KbDDSCKhsC3C4J2CR0JpHlWOpQmBdiEHpmMPqQweJkr4TYb3TWeCk7k1OH6GR3EpxThNI1Mc6ZqTGjSWaFEGTTg+RCfITw-iKz+XQOEMA+B5qgPPnBMKViRqyJRHxTMDlynYhxh4zRpA6nBNuI0sAzTZKtPaZ08G5jyHRNvtxewRJGH2TKQSEw50NHzWmfUuZTT9F+GWR0rpA1tIFIrjsvZoz65YhzEMyOb8t7MhUIQCAcB1BgybMqGJqEAC0Bh0zgtxKQEWeZkkogMEiokYsMmLJ6MwUFWyK7UNxCLHE1loH6mxCidM2I+JNWScYLEol7CpWBRlRaVEuqCmxd7biRI8SYXQkMgwuZlHGEDgWDESVTQlkpBJCWGTMosuWm6WVf5WVfHZeXGoYlpyjkmoSEkxoMGNX0BLMQRJ9AyuZUq+VtEMUkGVXcVVc8g40lINSOqgdiTWEcGISkKtknomwo5NKniFodTlQBFaf8AngQ0myqMYLuKkm0I4JJXK3VGUxA4TMZkxpWkmacxVa5LWbh6gVcC9rIE4T4tNR+D5MxkiwbmvG+aFK2u+DMxpq1IBltGqmJNhoHFxhfDONJDKrnBsohasNbp1oGz2gdLtqENU8tRfqflK6V5upfHxJBeg8T0uqaaht6tvHf18fO7iBZpxVqXjoak5JzTEiarspFI6d6f2PdksmmTO5pxyWeiuuZYHGuvQgYWot17fIybgn9n7rUQGIcAv9VlknNVdemdCfFUlpJqYe2O77oPcNHYYlQYBBGfRMRym+FGkNCsVvYxR9lMJitfDmk5eMoMH1-rBwJyBZlhPoIhmwJKMRAe1UkytTHZwscDVM9jXDf6cO7hYNtsAO0QAE1AsShg7B9sUckodyUpOMt3n3E9OTpkqtjTimoegnXaZTeUvTLjXHuNY+RGZDTLmvpIOppM6YaSXrFQ+h9SLannPmbB0gNzVkgss1RxAuIxkvqDWc2Z4XR0RrtGkN6L0XpwHgLFtViB0LZkXtqrliVIMd1ncgdA6m8WgcJQmOBpKBJi2nBSKkY0kwoi5Qe1zuGZ37Rq-4dAH0VCCEILwQgUAfLqbzDmBr2EmsktJAJBuJpvXFl9TSRqrhXBAA */
    resetPasswordModel.createMachine({
      context: resetPasswordModel.initialContext,
      tsTypes: {} as import("./ResetPasswordMachine.typegen").Typegen0,
      predictableActionArguments: true,
      id: "resetPassword",
      initial: "ResetPasswordApp",
      states: {
        ResetPasswordApp: {
          on: {
            UNKNOWN_USER: {
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
                API_SUCCESS: {
                  target: "EmailLinkSent",
                },
                API_FAIL: {
                  target: "ResetPasswordEnterEmail",
                },
                GO_BACK: {
                  target: "#resetPassword.ReturnToPrevious",
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
                GO_BACK: {
                  target: "#resetPassword.ReturnToPrevious",
                },
              },
            },
            EmailLinkSent: {
              on: {
                API_SUCCESS: {
                  target: "Finished",
                },
                API_FAIL: {
                  // target: "ResetPasswordEnterEmail",
                  target: "EmailLinkSent",
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
                  target: "ResetPasswordSecurityKey",
                },
                CHOOSE_PHONE_VERIFICATION: {
                  target: "ResetPasswordPhoneVerification",
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
            ResetPasswordPhoneVerification: {
              on: {
                COMPLETE: {
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
