import { createModel } from "xstate/lib/model";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SignupContext {}

const signupModel = createModel(
  // Initial context
  {} as SignupContext,
  {
    // Event creators
    events: {
      ABORT: () => ({}), // no payload
      API_FAIL: () => ({}), // no payload
      API_SUCCESS: () => ({}), // no payload
      BYPASS: () => ({}), // no payload
      CHOOSE_FIDO: () => ({}), // no payload
      CHOOSE_PASSWORD: () => ({}), // no payload
      COMPLETE: () => ({}), // no payload
      FAIL: () => ({}), // no payload
      SUCCESS: () => ({}), // no payload
    },
  }
);

export function createSignupMachine() {
  const machine = signupModel.createMachine({
    context: signupModel.initialContext,
    tsTypes: {} as import("./SignupMachine.typegen").Typegen0,
    predictableActionArguments: true,
    id: "signup",
    initial: "SignupStart",
    states: {
      SignupStart: {
        on: {
          COMPLETE: {
            target: "AskForEmailAddress",
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
        initial: "CreateUser",
        states: {
          CreateUser: {
            on: {
              API_SUCCESS: {
                target: "SignupUserCreated",
              },
              API_FAIL: {
                target: "#signup.HandleCredentials",
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
