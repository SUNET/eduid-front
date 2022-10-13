import { assign, createMachine, EventObject } from "xstate";

interface SignupContext {
  email_code: string;
}

interface TryCodeEvent extends EventObject {
  type: "TRY_CODE";
  email_code: string;
}
const assignEmailCode = assign<SignupContext, TryCodeEvent>({
  email_code: (context, event) => event.email_code,
});

export function createSignupMachine() {
  /** @xstate-layout N4IgpgJg5mDOIC5SwJZQHYFcAOA6AymltvgC4CGATqQMQDCA8gLIAKAMgKIAqHio2Ae1SkUA9HxAAPRAEYADAA4ATLgAsAVjlz1M1QoCcCgOzKANCACeidUpVatMpTYDMANlVLnAXy-nUGHAIiHA4AW3IUABsAMQFKUPpmdm5eJBBBYVFxNOkEXTlXNU0ZGWd5dWcNZ3MrBGdK3CV9Zv05SoU5PRkfP2C8QgDsOnJsUgBjAAtyRNZOHgkMlBExCVyZIxLcVyMdAoVVIyN9GRrEZx3cUvrnCtd1faNvXxB-YlwWSgExuFhh0cnpgBBFgASQA+vgAKp0OgcfD4BZCJZZVayDYyLY7eSuB5HE6WRAGXAtQyqQxyGSuMquHovPrvT7fWC-EbjKY0YHg6KAkFsRGZFY5NE6XBafaU1ylAquU51JRGS7XepNKk2Iy016BAbELgCSEzZLzNKLZbZUC5ZwFNRGMnGdRGVxUpT42r1Qokg7OilyfSqVQa+nanC6-WAgBCDAASlx+cjBeazlaDradg6nS7EEofWoWgpXBSyfJVDTnpq8JGwFAULBSGBKGEIpEOaCIdDYfDY6bUQg7upcIdNJ0mgdKjKCXUHcTc8cZMcXCXeoNcBWqzW6w2os2uTy+cakV2hT31H2B1oPL7HsXZc4lAop81jJ19HdDgu6Uug9gOOha5Q6AIIDAA05lSfh9xRQ8jCUQp5U0JQyU6So5CUWUNFUUV7DadRVEpH0nkXN5P2-X9-0AjkI2jTsIITPJFBUDQtB0PRDBMFDxzQjD7BuHD830aCAyXD4vh+DdIlIoDOVbGE4QRPcBTNKREF7fsdjPYdLzHWpjzkTitAdDp1FJAS3iEplYFE8StzBbleSo+NFKPE9VKHC9R1lODdO0SUSjaBRjK1Po6EoSAwB-FByEiWB6AACQYBh8A4MEWEBeEAHUowAETshTcmU08XJHK9xz4jFMIleU5Evfz+kC4LALCiKoroWL4sS6IQQyhhsu7Iw2lFVSs0q1QfSg2USnzXSZDzZ91BxaqgkGIKQoayIWHIZkAHc4ggKyoWkjs5LjHLE0KZMWPtR0bwzBATDvCUoPWW4nHw99CNq5aRAitbNu2qybN3MD5O7S1Tptc60yu2VHX0XBBzFDYKg0PzS0Dd76s+yJUrAAAjchMFICZ0F2tsZO6w8QetFMLvTMbOh0uH1kdKas3VFGPzR0KMax3H8cJv6dzJmiKbOu0IedMb5Rhhn9EeUoZGw+alvIWtIVgOtif22TAaO7s8uc89Cs0xATBhzCRsHfQykV4LlbAVX1ck-7BYcvXBwNjTZQUe5dKpeo-XuJ5nnQAC4AkMsFuIMgqFIZ3cl9PsvcYmxJVabD3MpWH7C9HFLQUbo2bewZRNieJY9kWwpfsS3PGcS22mvW9+xaG0DEUVRnGRgiAsW1kATLvJsOcTPvXlkpWmMBu7w6LQs1sQ48Pm0yfj+NlyH7qa7jUR0sXuWaO+um90KuMoTFr3Qvfmz8Q3XibT6aCU2hlw5ZX0PsnEw9vHm2Dx5pXatf1Ev3PQOl9jNFPqUHEZhxz1AxGSMBvUDDz1Zl3GqRcfx1nEv3BQeZiSfydIYKkRsEB+jvHAwwHR9jDU0G+cOS9mQWRDkA48jRHROjKH6I4bFagaBhvBFovtfKKEvhzFa8BDoHhotgoeN5igwJ9G0IhXs7BV2PL1Eo-EC7d2IEtdG4VVrrVgFtSgEAgF3k0MoBQlpjzNGGqoKGhxGgM00DhdYL1w6fh0ZzPR3M8YEwUiaaiDkPC0z0I4hwnRNCGU8NbMAtt7aUFMUPDY8EoK2Pfp0WUeJh6VQqDodwF9NGoOINEFA6BqwTEgFgyxuAZEUjka0NwmTqllW3jeZoShqrrwUGNBUJJPCtB9HnbYPgfBAA */
  const machine = createMachine(
    {
      context: {} as SignupContext,
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
          | TryCodeEvent
          | { type: "CHOOSE_FIDO" }
          | { type: "CHOOSE_PASSWORD" },
      },
      predictableActionArguments: true,
      id: "signup",
      initial: "SignupStart",
      states: {
        SignupStart: {
          on: {
            COMPLETE: {
              target: "SignupEmailForm",
            },
          },
        },
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
            TRY_CODE: {
              target: "ProcessEmailCode",
              actions: ["assignEmailCode"],
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
              target: "SignupCredentialWebauthn",
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
        SignupCredentialWebauthn: {
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
              target: "SignupUserCreated",
            },
            API_FAIL: {
              target: "SignupCredentials",
            },
          },
        },
        SignupUserCreated: {
          type: "final",
        },
      },
    },
    {
      actions: { assignEmailCode },
    }
  );
  return machine;
}

export const signupMachine = createSignupMachine();
export type SignupMachineType = ReturnType<typeof createSignupMachine>;
