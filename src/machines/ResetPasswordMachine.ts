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
      BYPASS: () => ({}), // no payload
      AVAILABLE_EXTRA_SECURITY: () => ({}), // no payload
      UNAVAILABLE_EXTRA_SECURITY: () => ({}), // no payload
      START_EXTRA_SECURITY: () => ({}), // no payload
    },
  }
);

export function createResetPasswordMachine() {
  const machine =
    /** @xstate-layout N4IgpgJg5mDOIC5QCc5gC4AUCGtYHcB7ZCAOgCU0tcDiIBBAB0YGIBhAeQFlMAZAUQAq-ANoAGALqJQjQrACW6eYQB20kAA9EAJgAsADlLaArABoQAT0QBGa2IDsR4wF9n51LAw48REhSretCRMrABCAJqY9ADK0eJSSCCyCkqq6loI9gDMxqTWumIAbCbmVpnWjlmFAJxiuvaF1rX19q7uATS+ZPSwANYAYsT8ALbY8gA2HMhsqgBm8sjDI2PjpD0DQ6MTUzMq84vLE+zcfEKikurJispqiRmF+tqkhfbW+vZmljZZ1oWkxvoslltI96g4xC43CAPF5OnQ1n1BshDpNpnMFkstqt1kiUTt0QcsSwIlFYvFLnJrmk7ogHk8Xm8PqVENUsmJSGJOVzuZzrG1oR0fPCcZsVvi9hiUf5PNQhSRdvtMSsWPRMABJAD60QAqmw2PwyRdEldUrdQBk7NUnllasVPmVbLpcvpqq79PVdNZtLZ+TDZUFuojRds0RLCStpbC5RAFZKiarNf16GreOTjZTTekbGIraQbUUSl8ENZgVkOTyK9pfYKAwiNsiseLFVLKDLAl1+Cp0GAG8qE1rdfrDQkZBmblni7o2aR7PovfabHZrE4K9yq1C-e3hUHeyHY+GJpH-R2uz2USr1Rqkym06OUuOacWHtUnMzi9pCuy7K9dCDjD+fmrNs4T8EVd1RfclUPFFeHkFRemiMAuwvTUdT1A04iNO8qTNTQbCndlZ3nN87GMQiyNXTl13aYDozrXFG1DZssVIGC4IQpD0BQq9k1TLCkjHalzXw6ciMLB1rGMZcPiAqNazAvEmLjCM2PgxDkPoUIOHIQRbwE+8hLwydRLncSbG0MQnhMWTj3hAAJbAVAgcYwH4DR0GQbBEIAYwAV2Qa44BYCBVDAUhYHQbBu1ITcQLIBynJctyPK8sA-ICpQ4D0k0H2EhBjG0N853+Gytz8BLnNc9zPJ8-zAtgUgKqS6rUvS+qVQANV4zSBA1fgAA1BHIegtX4NhtXINVBHCbLBNwi1vw5O03w+XJjByH8-wA0q4saxzKuSmq0rqzKGqaqqUtqjL5CC7UADl6C6lMev4PrBuG0bxsm6bZoM+bEAKkjPTLSEaLkro9sSi6jra07SEwZBCG8uBYEO1qTpu2B2DsjgOGiV78a+qbwg1ABpfgZv4nLDItQoAVIVkmSLKcXxMSiuUKHa6POtGrvq+HEeRvBeeO66grYHG8dezAcbu16Ov4Sb+jVNh6EENUODu36cInX56cZhd8oKFd2b5DcawhnmWr5uGEaRlGRdhzHsdx-Gr3IfgACkRv4NUABFtczR89cMA232MapDA+dmxDNsHbPK-bmsu0X+btoXUet1PTpdqWNTujg3qGkbCYm4nA9yoyQ4ZrImbKV4Xwo02udrK2U6duABft4Ws47rGSRiTCR30nXg7p0Pa8N+x7HZGPeRby2k+h9GxYa1twboG2LFJsALG4tChyHik-onbQTGXbRqgeOvEF0J1nkKR+n+fl5dAX+yl8djHO-XhOIC3nee9+zXj4sPam-0EBnykkYK+7xDY2lyL8F+L97Bv3NrRVun9e7fzXhbOgmAAAWoUOo9nkPMbyUUbjHB4AIYQFcaY6HPjA6+htjC6D+Mg5BrR0Eb0TlDL+q8jxlQgIQ4hpDyGUNUNxEB9CIFQIvrAm+CBdBXzyJw5+qD358IOtgwRv9hHJR7CobA4wuBJmoacOhVM5qnyYZfFh4dI4zibquOOAoMGL34bo-m-RlSyNPqWDkkllpFmBLPOeRQtFkH6HBEx8hPD6N2ohdAd0wD4GEfvQcGF-GPg-C+fIBZ4GvBKjwv+pAYnGPGPEsAiS6LJNSekuK0jeI5LytkRBBQQllDZlE8psSqkJLwX4epaSMmaW0rpaxJ9HztLyJ0symQXikH0DUOoDQmhrO4VCFQhAIBwHULFaMx9R55QALTVDfKcv4FZ8jPjEDkfQvTakBhCMcoOeVoHZA+AYG0xQSwrSaP8OebjDnyR3IpSCKI3mVwyJPBmhSiq-lICo10IIKgfndKDdxvDAz1ghQSKC2JwWMUhViaFDDlHaDLLaBZJY7APyfpJfQdR7mPNKcI+iwYIIEpbEMmMPKyXpmmXlR4hhgSmUNnSxwYhAQ-EvvoUVklekKRJQKiMzyTzdnAuSiBvxtCOAjpPEiPxcifk2vof8+RALst2iqsUSkDyrFUhxLsOrdYmFZvc4iRZHR-DQfHDldq9xqsPBU+JBDIBurHvq-4YcfUQnCTHai2KyltxhjgqNIqpxGC9QsqlTwUWukjutS03CA27TTSvfmlabaY0zUZF0F9c1TxUc8DZ9RGjNGnr0mt2dMZdwzgI+q9aLT5mWYapRHxrkbXyFtK1PasHtxwUIuKADd4jpsJHaSEq3ws2cXPTmNruaLvTXovloiVBgBIQFCR7yR53otNUYwuRFGsONtHZuR7MFeKXWejxdBDHIEqWY+gG7izVHsE8ZtjjWYuJuQun9p7+ZDvQBYMNsAI0QDA3oEEeQcxGqLBHQwESQV8shjo39PiVjYd-IYS0BGyg2jo+op+miv0QwqXEwZ-6SBgZtG+EEZY9BFuLT8HMLxemcYGTUsjIzGlHKFScht9g3y12TaCjj-TqkavhDpkg0RfLeQzmBqcL6S0LNruRVwrggA */
    resetPasswordModel.createMachine({
      context: resetPasswordModel.initialContext,
      tsTypes: {} as import("./ResetPasswordMachine.typegen").Typegen0,
      predictableActionArguments: true,
      id: "resetPassword",
      initial: "ResetPasswordApp",
      states: {
        ResetPasswordApp: {
          on: {
            COMPLETE: {
              target: "AskForEmailOrConfirmEmail",
            },
            START_EXTRA_SECURITY: {
              target: "HandleExtraSecurities",
            },
          },
        },
        AskForEmailOrConfirmEmail: {
          initial: "AskForEmailOrConfirmEmail",
          states: {
            AskForEmailOrConfirmEmail: {
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
                  target: "EmailLinkSent",
                },
                API_FAIL: {
                  target: "ResetPasswordEnterEmail",
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
              },
            },
            EmailLinkSent: {
              on: {
                API_SUCCESS: {
                  target: "Finished",
                },
                API_FAIL: {
                  target: "ResetPasswordEnterEmail",
                },
                ABORT: {
                  target: "ResetPasswordEnterEmail",
                },
              },
            },
            Finished: {
              type: "final",
            },
          },
        },
        HandleExtraSecurities: {
          initial: "HandleExtraSecurities",
          states: {
            HandleExtraSecurities: {
              on: {
                AVAILABLE_EXTRA_SECURITY: {
                  target: "ProcessExtraSecurities",
                },
                UNAVAILABLE_EXTRA_SECURITY: {
                  target: "#resetPassword.FinaliseResetPassword",
                },
              },
            },
            ProcessExtraSecurities: {
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
                CHOOSE_NO_EXTRA_SECURITY: {
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
                target: "ProcessExtraSecurities",
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
                API_FAIL: {
                  target: "#resetPassword.HandleExtraSecurities",
                },
                ABORT: {
                  target: "#resetPassword.HandleExtraSecurities",
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
