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
    /** @xstate-layout N4IgpgJg5mDOIC5QCc5gC4AUCGtYHcB7ZCAOgCU0tcDiIBBAB0YGIBhAeQFlMAZAUQAq-ANoAGALqJQjQrACW6eYQB20kAA9EAJgAsADlLaArABoQAT0QBGa2IDsR4wF9n51LAw48REhSretCRMrPQAavQAkrz0AEICAPr8ABqC5PQJAMr8bACq5JGCAJriUkggsgpKqupaCADMurqkAJy6YgBs9vX1LR3a1vXmVgjWuj2kxmLTM7Ni2q7uATS+ZJSe1D50ISy5AHLhUTHx-Emp6Vk5+YUlkuqVispq5XWNzW2d3b39g8M2un1SHNgfNFiAPF4VnRSPRYABrABixH4AFtsPIADYcZBsVQAM3kyBRqPRGJh8KRyBJmOxuJUBKJ1Ix7G4fCEoju5Qe1WeoDqHX02lIXWs+nsZksNnq1g6k30PW0gt09gcYhcbnByy2flhiORaJpOPxhOJBrJuspTNpxsZZpYsSKmHomUypXuckeNReiAFQpFYolIxa9TEQJBs2sYIhmyCZAt+tJ1vpJqZ-g2gVWdIZptJLHomEiWVybDY-Bdbq5Hp5tRsYhaQt6nRMf1GY2MpH0LS7+mVumsA0jGujGeh8apZqT2dT60h2ogWZTdvzhYRRwrMirTxrozrDZaTcDUu09TD4emCyHWtj5L148TRuTttJadnsYXT8xediHHIgnXFU3L0+RsUVDE7A8W0GfR2ymM9QUvdMoR1CkE0Nd8c0xF8Y1WfgVHQMA70-ZcixLMtXU5Dcqi3b1RnGUN7H0ftD1bMRrCcOCLyWRC5xvS0JwfKczSwkcSFw-DCOZYjV2if9uWo4DRgFFonEg7QOlDOx7DGRVjC08ZBy419Vl41CsQExdnxnbC6DEgimS-H8-wogCqKAyVRmldt1L0nS9Olcw6msPpDA6dp+nVQzrOQ28rXMj8ySZXh5BUOFMjAPC8wLEjS3LZy5LcwK6NIBimMgtV6Ng8NOM1bjrzHWL0NTRLktS9L0Eylc1zywDeU0f4Q2Kxjm3c2xjDY8UoyvYz6v4xqhOalK0oyuJHNknrtzGAaSuGkZ+3mJxJtq4yAAlsBUCAMTAfgNHQZBsDSgBjABXZBHjgFgIFUMBSFgdBsHw0hhyQshTvOy7rtu+6wGe16lDgNbXN6upjG0FtGMmQ6jOhUGLqum67sel63tgUgcfB-GoZh4n2GOjgOGyS48gKYoEgAaX4W4ykoz1epGewAWFIKxGVDoheVewApsbRhdaYxpRMTGopBs7cYhgnoaJuGSbJvHIcJ2H5Hethafp05MFpvZTjCfgCgRSI2HoQRIg4PYEZ5jbpfeOXSvcobSFsfcRbF+x7EVkTlbB3X1aprXSZV8m9Y1g2jZNhmEXIfgACkMn4SIABE3erGi9q9+XmJVNjRcD+wq+FkOw+BuPI7VynNcN7X46j1vk9gGm6YZvYODONIMmyJmbkL+S+tGT3ZbLlsOjlwXq9r8WG54nWW-14mm9Vint61jrsrIyeCqlmWWm9nbEDFZpV5r4PQ4QrG-E3-ek53qzw4PixWbACwj6ZGLDlciXMXLuxotoEwbFtDBXFC2JoXkOjIJQagrouh17XjfonGO7dhLAx-n-ABUkupgPykjHQ0CjBwOYr0dsMo0FoP5pgk6nct4f1jl-YGmAAAWX0wgEXkASB6-0ngsh4AIYQp8KEICgWNahAp4HuWMLoWUjDGFP0iuHXeCdo5tzgPgucvD+GCOEaI1QR9pK8GkduORMCaEIMBAw9RyDmHPyVjoruB88FcLnBDAiKhsAYi4KucRbIpHdURrYqhsDFHMWMC0Qw4o4IGRqi-COe8cH6JJgiXMNjIH1GPECawxhwotkKaGOCMwOgsOhAiZKQT5CeF8deNK6A9hgHwOHQBwCT6RIgQpNSykxgQXcvULSGN3HaPqYEjETSwAtOMm0jpXTgaWNIe6KJNFuj0LCtfWRUxal+BmY05pU1oTLM6d0lav58kKR2f7PZ5cugdg6CvR+rgNQqEIBAOA6ggZzk2QM6eABaFoLYQXti7NC1RCoBhaX0EctY5zgjMCBUXBS8jb4tFFEFKBLQtIdBbFpZSY1EmlJDmMew1UAV1RQhJScFlMToqnq8cUrRRkjB7EKSqap6iuIYhgqZjcZr3jms+UVaEbQYQxCys+CBdBFP3GUka0pQxoJKfoYWYh6iIuFTxSVZlxWYUWXQY1srKxbIUoKQwhShrMUGNYRwYh5Ty0STakpSKTIMrijKwxsZbISTlTImU2hHAJPGQ6zywoHDaWgn5VJtLpr0oatKpqZokqLTasGj2CSjA6p9rtMYsohVaJFSm2aaahIzKaTwyAObi79HDcGJRu1yqnjPDSlFGTdHd2Jg2614x83z3cseHlsw5YCvlKWtJHjsF6J7p49huC-mWuBXUTsMCC37P5spe+99NGzu0fOvtnDu2EP-gO6eQV0bbWYuMZSyS4I1P1Vgth78V0k1NSQYxKgwACNemYjF4DgOBUvlCuJLYVEVRSV6k93iDHfogP45AsyQn0CvWB6lQIR0jAScpEwsHX2sObh+7JpBl2awsDW2AdaICYZ0IqwwdgW3xMSR28Mibu1LrI4u3JzK12gcY4qf2dZI3lPY84lxbiy08ROXMs5R06AMYaOC0d8p2LTEnV0Bi9QvXyfmUh0glzVmAsE6ym+EsxnUv0w0hTCzuNIcyE9B6D04DwHM-K8YUKr60JVMVdUrggA */
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
            AVAILABLE_EXTRA_SECURITY: {
              target: "HandleExtraSecurities",
            },
            UNAVAILABLE_EXTRA_SECURITY: {
              target: "FinaliseResetPassword",
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
                ABORT: {
                  target: "#resetPassword.ResetPasswordApp",
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
                ABORT: {
                  target: "#resetPassword.ResetPasswordApp",
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
                API_FAIL: {
                  target: "#resetPassword.HandleExtraSecurities",
                },
                ABORT: {
                  target: "#resetPassword.ResetPasswordApp",
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
