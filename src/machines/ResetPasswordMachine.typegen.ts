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
    | "AskForEmailOrConfirmEmail.ResetPasswordCaptcha"
    | "AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordEnterEmail"
    | "FinaliseResetPassword"
    | "FinaliseResetPassword.ResetPasswordSuccess"
    | "FinaliseResetPassword.SetNewPassword"
    | "HandleCaptcha"
    | "HandleCaptcha.Fail"
    | "HandleCaptcha.Finished"
    | "HandleCaptcha.HandleCaptcha"
    | "HandleCaptcha.ProcessCaptcha"
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
          | "EmailLinkSent"
          | "Finished"
          | "ResetPasswordCaptcha"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleCaptcha"?: "Fail" | "Finished" | "HandleCaptcha" | "ProcessCaptcha";
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
