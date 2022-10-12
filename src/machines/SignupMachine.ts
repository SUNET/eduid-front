import { createMachine } from "xstate";

interface SignupContext {
  email?: string;
  tou_accepted: boolean;
}

export function createSignupMachine() {
  /** @xstate-layout N4IgpgJg5mDOIC5SwJZQHYFcAOA6M6ALmAE4CiAtgIYoA2AxAMpkAqA+mQLICCAkgDKJQ2APapCKEeiEgAHogBMARgAsuAKwA2AAwB2AMy7NSzQp0BOADQgAnoiXaluFRZXaAHJvNLzu3SoBfIOt0EQg4GVQMHHwiUkoaWhlRcUlpJDlEFQVrOwR3c1xfbXMXbXV3fX11FXNgkCisPFgACxEAdwBhKmxCAGMWqmSxFAkpGXkEQycVSpdVdT8q0tzEAqLdEuVNTXVzdX1NfXrGnGHU8YzJpXdVhCVdIvNn831sw911H2OggKA */
  const machine = createMachine({
    context: { tou_accepted: false },
    tsTypes: {} as import("./SignupMachine.typegen").Typegen0,
    schema: {
      context: {} as SignupContext,
      events: {} as
        | { type: "API_FAIL" }
        | { type: "API_SUCCESS" }
        | { type: "COMPLETE" }
        | { type: "ABORT" }
        | { type: "FAIL" }
        | { type: "SUCCESS" }
        | { type: "CHOOSE_FIDO" }
        | { type: "CHOOSE_PASSWORD" },
    },
    predictableActionArguments: true,
    id: "signup",
    initial: "SignupEmailForm",
    states: {
      SignupEmailForm: {
        on: {
          COMPLETE: {
            target: "SignupCaptcha",
          },
        },
      },
      SignupCaptcha: {
        on: {
          COMPLETE: {
            target: "ProcessCaptcha",
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
            target: "RegisterEmail",
          },
          ABORT: {
            target: "SignupEmailForm",
          },
        },
      },
      RegisterEmail: {
        on: {
          API_SUCCESS: {
            target: "SignupEnterCode",
          },
          API_FAIL: {
            target: "SignupEmailForm",
          },
        },
      },
      SignupEnterCode: {
        on: {
          COMPLETE: {
            target: "ProcessEmailCode",
          },
          ABORT: {
            target: "SignupEmailForm",
          },
        },
      },
      ProcessEmailCode: {
        on: {
          API_SUCCESS: {
            target: "SignupCredentials",
          },
          API_FAIL: {
            target: "SignupEnterCode",
          },
        },
      },
      SignupCredentials: {
        on: {
          CHOOSE_PASSWORD: {
            target: "SignupCredentialPassword",
          },
          CHOOSE_FIDO: {
            target: "SignupCredentialFIDO",
          },
        },
      },
      SignupCredentialPassword: {
        on: {
          API_SUCCESS: {
            target: "CreateUser",
          },
          API_FAIL: {
            target: "SignupCredentials",
          },
        },
      },
      SignupCredentialFIDO: {
        on: {
          API_SUCCESS: {
            target: "CreateUser",
          },
          API_FAIL: {
            target: "SignupCredentials",
          },
        },
      },
      CreateUser: {
        on: {
          API_SUCCESS: {
            target: "SignupFinished",
          },
          API_FAIL: {
            target: "SignupCredentials",
          },
        },
      },
      SignupFinished: {
        type: "final",
      },
    },
  });
  return machine;
}

export const signupMachine = createSignupMachine();
export type SignupMachineType = ReturnType<typeof createSignupMachine>;
