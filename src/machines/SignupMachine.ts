import { setup } from "xstate";

export function createSignupMachine() {
  const machine = setup({
    types: {
      events: {} as 
        | { type: 'ABORT' }
        | { type: 'API_FAIL' }
        | { type: 'API_SUCCESS' }
        | { type: 'BYPASS' }
        | { type: 'CHOOSE_FIDO' }
        | { type: 'CHOOSE_PASSWORD' }
        | { type: 'COMPLETE' }
        | { type: 'SUCCESS' } 
        | { type: 'FAIL' }
    }
  }).createMachine({
    predictableActionArguments: true,
    id: "signup",
    initial: "SignupStart",
    context: { event: undefined },
    states: {
      SignupStart: {
        on: {
          COMPLETE: {
            target: "AskForEmailAddress",
          },
          BYPASS: {
            target: "#signup.HandleCaptchaAndToU",
          },
        },
      },
      AskForEmailAddress: {
        initial: "SignupEmailForm",
        states: {
          SignupEmailForm: {
            on: {
              COMPLETE: {
                target: "#signup.HandleCaptchaAndToU",
              },
              API_SUCCESS: {
                target: "#signup.HandleEmail.SignupEnterCode",
              },
              API_FAIL: {
                target: "SignupEmailForm",
              },
            },
          },
        },
      },
      HandleCaptchaAndToU: {
        initial: "SignupCaptcha",
        states: {
          SignupCaptcha: {
            on: {
              COMPLETE: {
                target: "ProcessCaptcha",
              },
              ABORT: {
                target: "Fail",
              },
              BYPASS: {
                target: "SignupToU",
              },
            },
          },
          ProcessCaptcha: {
            on: {
              API_SUCCESS: {
                target: "SignupToU",
              },
              API_FAIL: {
                target: "SignupCaptcha",
              },
            },
          },
          SignupToU: {
            on: {
              COMPLETE: {
                target: "ProcessToU",
              },
              ABORT: {
                target: "Fail",
              },
              BYPASS: {
                target: "Finished",
              },
            },
          },
          ProcessToU: {
            on: {
              API_SUCCESS: {
                target: "RegisterEmail",
              },
              API_FAIL: {
                target: "Fail",
              },
            },
          },
          RegisterEmail: {
            on: {
              API_SUCCESS: {
                target: "Finished",
              },
              API_FAIL: {
                target: "Fail",
              },
            },
          },

          Fail: {
            always: {
              target: "#signup.AskForEmailAddress",
            },
          },
          Finished: {
            type: "final",
          },
        },
        onDone: {
          target: "HandleEmail",
        },
      },
      HandleEmail: {
        initial: "SignupEnterCode",
        states: {
          SignupEnterCode: {
            on: {
              COMPLETE: {
                target: "ProcessEmailCode",
              },
              BYPASS: {
                target: "EmailFinished",
              },
              ABORT: {
                target: "#signup.AskForEmailAddress",
              },
            },
          },
          ProcessEmailCode: {
            on: {
              API_SUCCESS: {
                target: "EmailFinished",
              },
              API_FAIL: {
                target: "SignupEnterCode",
              },
            },
          },
          EmailFinished: {
            type: "final",
          },
        },
        onDone: {
          target: "HandleCredentials",
        },
      },
      HandleCredentials: {
        initial: "SignupCredentials",
        states: {
          SignupCredentials: {
            on: {
              CHOOSE_PASSWORD: {
                target: "SignupCredentialPassword",
              },
              CHOOSE_FIDO: {
                target: "SignupCredentialWebauthn",
              },
              ABORT: {
                target: "#signup.AskForEmailAddress",
              },
            },
          },
          SignupCredentialPassword: {
            on: {
              API_SUCCESS: {
                target: "CredentialsFinished",
              },
              API_FAIL: {
                target: "SignupCredentials",
              },
            },
          },
          SignupCredentialWebauthn: {
            on: {
              API_SUCCESS: {
                target: "CredentialsFinished",
              },
              API_FAIL: {
                target: "SignupCredentials",
              },
            },
          },
          CredentialsFinished: {
            type: "final",
          },
        },
        onDone: {
          target: "FinaliseUser",
        },
      },
      FinaliseUser: {
        initial: "SignupConfirmPassword",
        states: {
          SignupConfirmPassword: {
            on: {
              API_SUCCESS: {
                target: "SignupUserCreated",
              },
              API_FAIL: {
                target: "#signup.HandleCredentials",
              },
              ABORT: {
                target: "#signup.AskForEmailAddress",
              },
            },
          },
          SignupUserCreated: {
            type: "final",
          },
        },
      },
    },
  });
  return machine;
}

export type SignupMachineType = ReturnType<typeof createSignupMachine>;
