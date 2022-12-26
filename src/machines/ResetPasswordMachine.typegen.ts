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
    | "AskForEmailOrConfirmEmail.EmailLinkSent"
    | "AskForEmailOrConfirmEmail.ResetPasswordConfirmEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordEnterEmail"
    | "AskForEmailOrConfirmEmail.ResetPasswordRequestEmail"
    | "FinaliseResetPassword"
    | "FinaliseResetPassword.ResetPasswordSuccess"
    | "FinaliseResetPassword.SetNewPassword"
    | "HandleEmailCode"
    | "HandleEmailCode.EmailCode"
    | "HandleEmailCode.EmailCodeFinished"
    | "HandleExtraSecurity"
    | "HandleExtraSecurity.ExtraSecurity"
    | "HandleExtraSecurity.ExtraSecurityFinished"
    | "HandleExtraSecurity.ExtraSecurityKey"
    | "HandleExtraSecurity.FrejaEID"
    | "HandleExtraSecurity.HandleExtraSecurity"
    | "HandleExtraSecurity.PhoneVerification"
    | "HandleExtraSecurity.WithoutExtraSecurity"
    | "ResetPasswordStart"
    | {
        "AskForEmailOrConfirmEmail"?:
          | "EmailLinkSent"
          | "ResetPasswordConfirmEmail"
          | "ResetPasswordEnterEmail"
          | "ResetPasswordRequestEmail";
        "FinaliseResetPassword"?: "ResetPasswordSuccess" | "SetNewPassword";
        "HandleEmailCode"?: "EmailCode" | "EmailCodeFinished";
        "HandleExtraSecurity"?:
          | "ExtraSecurity"
          | "ExtraSecurityFinished"
          | "ExtraSecurityKey"
          | "FrejaEID"
          | "HandleExtraSecurity"
          | "PhoneVerification"
          | "WithoutExtraSecurity";
      };
  tags: never;
}
