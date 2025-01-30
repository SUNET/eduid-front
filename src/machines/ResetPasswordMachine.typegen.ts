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
    | "AskForEmailOrConfirmEmail.Finished"
    | "AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordEnterEmail"
    | "FinaliseResetPassword"
    | "FinaliseResetPassword.ResetPasswordSuccess"
    | "FinaliseResetPassword.SetNewPassword"
    | "HandleCaptcha"
    | "HandleCaptcha.EmailLinkSent"
    | "HandleCaptcha.Finished"
    | "HandleCaptcha.ProcessCaptcha"
    | "HandleCaptcha.ResetPasswordCaptcha"
    | "HandleExtraSecurities"
    | "HandleExtraSecurities.ExtraSecurityFinished"
    | "HandleExtraSecurities.Fail"
    | "HandleExtraSecurities.HandleExtraSecurities"
    | "HandleExtraSecurities.ResetPasswordExternalMFA"
    | "HandleExtraSecurities.ResetPasswordSecurityKey"
    | "ResetPasswordApp"
    | "ReturnToPrevious"
    | "ReturnToPrevious.ReturnToPrevious"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "AskForEmailOrConfirmEmail"
          | "Finished"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleCaptcha"?: "EmailLinkSent" | "Finished" | "ProcessCaptcha" | "ResetPasswordCaptcha";
        "HandleExtraSecurities"?:
          | "ExtraSecurityFinished"
          | "Fail"
          | "HandleExtraSecurities"
          | "ResetPasswordExternalMFA"
          | "ResetPasswordSecurityKey";
        "ReturnToPrevious"?: "ReturnToPrevious";
      };
  tags: never;
}
