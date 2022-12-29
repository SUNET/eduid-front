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
    | "HandleEmailCode"
    | "HandleEmailCode.EmailCode"
    | "HandleEmailCode.EmailCodeFinished"
    | "HandleExtraSecurities"
    | "HandleExtraSecurities.HandleExtraSecurities"
    | "ProcessExtraSecurities"
    | "ProcessExtraSecurities.ExtraSecurityFinished"
    | "ProcessExtraSecurities.Fail"
    | "ProcessExtraSecurities.ProcessExtraSecurities"
    | "ProcessExtraSecurities.ResetPasswordFrejaEID"
    | "ProcessExtraSecurities.ResetPasswordPhoneVerification"
    | "ProcessExtraSecurities.ResetPasswordSecurityKey"
    | "ProcessExtraSecurities.ResetPasswordWithoutSecurity"
    | "ResetPasswordStart"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "Finished"
          | "ResetPasswordApp"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail";
        "EmailLinkSent"?: "EmailLinkSent" | "EmailLinkSentFinished";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleEmailCode"?: "EmailCode" | "EmailCodeFinished";
        "HandleExtraSecurities"?: "HandleExtraSecurities";
        "ProcessExtraSecurities"?:
          | "ExtraSecurityFinished"
          | "Fail"
          | "ProcessExtraSecurities"
          | "ResetPasswordFrejaEID"
          | "ResetPasswordPhoneVerification"
          | "ResetPasswordSecurityKey"
          | "ResetPasswordWithoutSecurity";
      };
  tags: never;
}
