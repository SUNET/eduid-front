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

function createSignupMachine() {
  const machine =
    /** @xstate-layout N4IgpgJg5mDOIC5SwJZQHYFcAOA6AymltvgC4CGATqQMQDCA8gLIAKAMgKIAqHA2gAwBdRKGwB7VKRRj0IkAA9EARgAcK3AFYATBoBs-ACxaDKw7rUAaEAE9EW-ktwBOAOwv7T-k6Wrd2gL7+VqgYOLgAgrAA1gBiYpQcALbkKAA24RAQlHCwBEQ4SSmpcZSJ9Mzs3HxCcuKS0rJICsqG-LgqTgDMSk66SvwaThouVrYIeuqdUxqdRgb87lougcH5eAAS5OgQqWB05NikAMYAFuTh21xiAKp5odj7h6fk5aycPALCTXUoUjJyigQSk6LjaThUWiUumMLg0GhUulGiHhGnaOi67hcPlUWhWIBCxFwm22u0exzOFwgV1uLEoYiOOTJzxo4RYAEkAPr4a50OgcfD4T61CS-BoA5S6Fy6doaAyyuFdLR9EY2RAGXTS2ZeHwI7SzAx4glhYk7PYHcnnS43XC0+mM83M1mcmLhNlsIXfEV-RqgQFQqUyuVywadJVKFVjQZaXAGTwLKFKOUqKaGtZErampkUq23Qj3amvSofGqe+r-Jp+1yOJxdAzdbWdfgIpEITp+XADBwdKZ9AxKVP3dMks1PbNU6154gF8IAIQYACUuB7RF6xRXlFXnLX695G83VQgDC5Oh3O+r7AiaxoB4STaSHWPqTa6QzYLBp+yuTy+QLlyAft64pApuNazDuwJNoiB7dC4HamMCKjaHWx4GkE+JpneI4WpST62q+743Cyn4um6f4AWuvobliW5gf0u6QS2fYnvw9jGA4R6eIhyxoUaGwZveo6WuOtwxEUNBkau5aUQgLhOAYHYwj4+hqAiEbKB0uBKDoWgqFCGiqImEI3sa-FYc8OGERAMhgLgsAUKQNm8UOmYPkJ1ISWWPrNOMWgtrpzgqCY-D6Posn9LiPEYaZhRpLg85gFAKB2WACTJGkRGctyvL8oKJYrp5QE6bBfZqFooZGKosKMQGnR6P08KGAYdZtsZfHDjFqRxQlSUOalYlOhyJHunl-6SV5gIaie5jKsYiG1VCLaDKigU+N0kL8KGWKtc5uwdXcxAcOgvV0GIEBgIW7zVF8+WilJ3mNvJSgaAMvR9LqZUGC2nSmDGUL8IYqheE2EWrIOmF7ZOBRHSlJ1nSyc6Lh5t3jYgkpTQi4azTM+lQZGR7tFiTYbeCCq6Nt4NpZ1eE5B1sPnQNWU-rl12jQV64IEVv2leVkIqFV0GhjGcpDD23jzGTkVg9FlPPnab606d9PEa6w0s+Rd2ApzJUQjzlUaIxOm4N9+iyjWSqwio5PS2JVnoI59mOVF7WU0jgHs5NuDTZjJjYwtB6SuofP9KYnQk4MEug7epl0NkZ1HSg5CpLkkMPLHYDx4nsD0OsDAMPgHAciw4QCgA6guAAirsUd5-RQgFR6ybVYUsS29XqLJLGzHowyzE4VvDjHkDp1Imf7Tgg9xyPSfZ7n+eDWy5cMFXGstHX4IN10wzeC3B69NGiEOKGcmQjW3GRyZA9pxnSdj6nQ-Xyw5BvgA7vEEAZV+2W-iN6so0CR4nl0vYHosxdJNX1geWuThNLPXXlKeYNZ+ySyjpfe+U9k5rAnsPBOqRH4vzfh-Iay8-7YjaK0UMHRZKxi0L5SBDg2gQi7CCGYvRjz90zFfdBt8sHXxLmAAARuQTApATjoA-ozHKxCgKJmPO0LSDhaxgLlC2JwZVcDrTUN0eYehULnzahwtBOCMH3B4VPPhgjhGiMISrKR7NSEdnmBQ1wclVG0LGGLdophgYQTrJCdhpJOFGJoLbe25AHK2SdgYyeRjbHSW0C2dw0oVrAi0v0TaSC9G4BiCgdAickpgGuLAFKuBB5hIKUUyg4jvySJ-mNQq9hNDaH0mtHQ8JcaIG8LBGCR5jDDDUMMba2TcmpHyYU4ppSHJjMqQNIhtS2bSV0CCGMbgEFtiWF0VuG1YKmDjPA9UMxOiBDQugRW8AmhORTmQKgpBhTzO8gAWh1J7SE-Q3Agj7KopQrcazOF0OCFiahgoDDYcgsIkRYjxA6hkLIORb4dRKIkW5yMgKPJ0J7cEOkph9gcIsiBYw5TRjcG4Ho+gdLDBmNtcFJQoWZGyG+JFbtpKPNkX8iEyZZi11xV9XQ8lZJaFcQ4FwTUhi6PQlLAerkLK5kwa5Bl1c-T2G2cmDwNDEJPXaeMQKRtVCk3VCFUVTlMJZjctaamb5jVypXkCZ6sFXCQlhIMJReLkRau6IhcOergoGsiQJbCOZb7UktSQ5MbRhiLNDF4VV8SDzqnkuymYcwFg0I1P4syj5TUvhyIG0syK7EQlRGGqYKqyVuLVIYdoJh3C6Vkl0KE3rxUuUElKrJRQg2FWBLBfo0IHXwiPOGaqjhYxSnML2yqltQX6N9eZf1QykonEgG29mkI0VYm0OGQYG1QxfThEbWSyZhWNkPvWlBja-XCUXdJHwgxPERtcWqvQLYaHQK8Amrw31eiynHZkimRQuqJWSn1NIF6a40JlMFVRQrPAfU+jG-y+kdLQj1KHEdqaIZrEOsdRWwHARNUcGoJqNDGw0PVF8mN-Ld2qWPOYOtwVUMyzNbABWZ1sOID5l9IwmlApEvRBCDUEcxUnt2jLeFOS50LpzYy7yuHNLiy8EK1JXgYNjCmG0Osck6zwnzeYY9F9TQdRY62Jwj6ONBh5foAFJguiptMUY7hgTM4GdMOoSESFdILG3qWhAqi43UfVOVJ6bhrP2ZvinGzic8GwFfpQCABmtLGGcNjYwSw63uE2eGT2dZQrAiGHzHTk69jBeMcQMLqRzFCJEV5X+0jiMxmep2Wq8xDAqMhLgUEtUBg4wGDQoLhjR4ldgLO2A86YsSflRKJYmgpimF7VicwzXA7mF5hVLo-HDXR0KwZqUbQXOzVeR5vySp2hDB0kGZ6xhDkTqyTkvJRSpklOyGUqZjm1JedA0eIw-LwzmFDiDATYQhk3fKcUlOUyJniZupJwE7z1FCv5XvJ6jDOgqKetqrw0JJSghYoM67IzbsVIM6HA7XSwx+G1IMPLBn7k0McKyzFHKcW1RbPc6U-1-qJiempxM+kjn+CAA */
    signupModel.createMachine({
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
                  target: "Fail",
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

export const signupMachine = createSignupMachine();
export type SignupMachineType = ReturnType<typeof createSignupMachine>;
