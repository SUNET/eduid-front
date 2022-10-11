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
        | { type: "EMAIL_COMPLETE" }
        | { type: "CAPTCHA_COMPLETE" }
        | { type: "CAPTCHA_SUCCESS" }
        | { type: "CAPTCHA_FAIL" }
        | { type: "CHOOSE_PASSWORD" }
        | { type: "CHOOSE_FIDO" }
        | { type: "CODE_COMPLETE" }
        | { type: "CODE_SUCCESS" }
        | { type: "CODE_FAIL" }
        | { type: "CREATE_USER" }
        | { type: "TOU_SUCCESS" }
        | { type: "TOU_FAIL" }
        | { type: "EMAIL_SUCCESS" }
        | { type: "EMAIL_FAIL" },
    },
    predictableActionArguments: true,
    id: "signup",
    initial: "SignupEmailForm",
    states: {
      SignupEmailForm: {
        on: {
          EMAIL_COMPLETE: {
            target: "SignupCaptcha",
          },
        },
      },
      SignupCaptcha: {
        on: {
          CAPTCHA_COMPLETE: {
            target: "ProcessCaptcha",
          },
        },
      },
      ProcessCaptcha: {
        on: {
          CAPTCHA_SUCCESS: {
            target: "SignupToU",
          },
          CAPTCHA_FAIL: {
            target: "SignupCaptcha",
          },
        },
      },
      SignupToU: {
        on: {
          TOU_SUCCESS: {
            target: "RegisterEmail",
          },
          TOU_FAIL: {
            target: "SignupEmailForm",
          },
        },
      },
      RegisterEmail: {
        on: {
          EMAIL_SUCCESS: {
            target: "SignupEnterCode",
          },
          EMAIL_FAIL: {
            target: "SignupEmailForm",
          },
        },
      },
      SignupEnterCode: {
        on: {
          CODE_COMPLETE: {
            target: "ProcessEmailCode",
          },
          CODE_FAIL: {
            target: "SignupEmailForm",
          },
        },
      },
      ProcessEmailCode: {
        on: {
          CODE_SUCCESS: {
            target: "SignupCredentials",
          },
          CODE_FAIL: {
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
          CREATE_USER: {
            target: "SignupFinished",
          },
        },
      },
      SignupCredentialFIDO: {
        on: {
          CREATE_USER: {
            target: "SignupFinished",
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
