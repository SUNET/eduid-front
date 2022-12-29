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
    | "AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordEnterEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordRequestEmail"
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
    | "HandleExtraSecurities.ExtraSecurityFinished"
    | "HandleExtraSecurities.Fail"
    | "HandleExtraSecurities.HandleExtraSecurities"
    | "HandleExtraSecurities.ProcessExtraSecurities"
    | "HandleExtraSecurities.ResetPasswordFrejaEID"
    | "HandleExtraSecurities.ResetPasswordPhoneVerification"
    | "HandleExtraSecurities.ResetPasswordSecurityKey"
    | "HandleExtraSecurities.ResetPasswordWithoutSecurity"
    | "ResetPasswordStart"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "Finished"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail"
          | "ResetPasswordRequestEmail";
        "EmailLinkSent"?: "EmailLinkSent" | "EmailLinkSentFinished";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleEmailCode"?: "EmailCode" | "EmailCodeFinished";
        "HandleExtraSecurities"?:
          | "ExtraSecurityFinished"
          | "Fail"
          | "HandleExtraSecurities"
          | "ProcessExtraSecurities"
          | "ResetPasswordFrejaEID"
          | "ResetPasswordPhoneVerification"
          | "ResetPasswordSecurityKey"
          | "ResetPasswordWithoutSecurity";
      };
  tags: never;
}
