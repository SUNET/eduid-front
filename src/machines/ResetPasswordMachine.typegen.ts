// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {};
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | "AskForEmailOrConfirmEmail"
    | "AskForEmailOrConfirmEmail.AskForEmailOrConfirmEmail"
    | "AskForEmailOrConfirmEmail.EmailLinkSent"
    | "AskForEmailOrConfirmEmail.Finished"
    | "AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordEnterEmail"
    | "FinaliseResetPassword"
    | "FinaliseResetPassword.ResetPasswordSuccess"
    | "FinaliseResetPassword.SetNewPassword"
    | "HandleExtraSecurities"
    | "HandleExtraSecurities.ExtraSecurityFinished"
    | "HandleExtraSecurities.Fail"
    | "HandleExtraSecurities.HandleExtraSecurities"
    | "HandleExtraSecurities.ResetPasswordExternalMFA"
    | "HandleExtraSecurities.ResetPasswordPhoneVerification"
    | "HandleExtraSecurities.ResetPasswordSecurityKey"
    | "ResetPasswordApp"
    | "ReturnToPrevious"
    | "ReturnToPrevious.ReturnToPrevious"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "AskForEmailOrConfirmEmail"
          | "EmailLinkSent"
          | "Finished"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleExtraSecurities"?:
          | "ExtraSecurityFinished"
          | "Fail"
          | "HandleExtraSecurities"
          | "ResetPasswordExternalMFA"
          | "ResetPasswordPhoneVerification"
          | "ResetPasswordSecurityKey";
        "ReturnToPrevious"?: "ReturnToPrevious";
      };
  tags: never;
}
