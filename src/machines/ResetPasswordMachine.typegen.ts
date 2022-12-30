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
    | "AskForEmailOrConfirmEmail.Finished"
    | "AskForEmailOrConfirmEmail.ResetPasswordApp"
    | "AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordEnterEmail"
    | "EmailLinkSent"
    | "EmailLinkSent.EmailLinkSent"
    | "EmailLinkSent.EmailLinkSentFinished"
    | "FinaliseResetPassword"
    | "FinaliseResetPassword.ResetPasswordSuccess"
    | "FinaliseResetPassword.SetNewPassword"
    | "HandleEmailCodeStart"
    | "HandleEmailCodeStart.EmailCode"
    | "HandleEmailCodeStart.EmailCodeFinished"
    | "HandleEmailCodeStart.Fail"
    | "HandleExtraSecurities"
    | "HandleExtraSecurities.ExtraSecurityFinished"
    | "HandleExtraSecurities.Fail"
    | "HandleExtraSecurities.HandleExtraSecurities"
    | "HandleExtraSecurities.ProcessExtraSecurities"
    | "HandleExtraSecurities.ResetPasswordPhoneVerification"
    | "HandleExtraSecurities.ResetPasswordSecurityKey"
    | "ResetPasswordStart"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "Finished"
          | "ResetPasswordApp"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail";
        "EmailLinkSent"?: "EmailLinkSent" | "EmailLinkSentFinished";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleEmailCodeStart"?: "EmailCode" | "EmailCodeFinished" | "Fail";
        "HandleExtraSecurities"?:
          | "ExtraSecurityFinished"
          | "Fail"
          | "HandleExtraSecurities"
          | "ProcessExtraSecurities"
          | "ResetPasswordPhoneVerification"
          | "ResetPasswordSecurityKey";
      };
  tags: never;
}
