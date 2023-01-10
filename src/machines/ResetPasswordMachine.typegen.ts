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
    | "HandleExtraSecurities.ResetPasswordExternalMFA"
    | "HandleExtraSecurities.ResetPasswordPhoneVerification"
    | "HandleExtraSecurities.ResetPasswordSecurityKey"
    | "ResetPasswordApp"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "AskForEmailOrConfirmEmail"
          | "Finished"
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
          | "ResetPasswordExternalMFA"
          | "ResetPasswordPhoneVerification"
          | "ResetPasswordSecurityKey";
      };
  tags: never;
}
