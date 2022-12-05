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
    | "AskForEmailAddress"
    | "AskForEmailAddress.SignupEmailForm"
    | "FinaliseUser"
    | "FinaliseUser.CreateUser"
    | "FinaliseUser.SignupUserCreated"
    | "HandleCaptchaAndToU"
    | "HandleCaptchaAndToU.Fail"
    | "HandleCaptchaAndToU.Finished"
    | "HandleCaptchaAndToU.ProcessCaptcha"
    | "HandleCaptchaAndToU.ProcessToU"
    | "HandleCaptchaAndToU.RegisterEmail"
    | "HandleCaptchaAndToU.SignupCaptcha"
    | "HandleCaptchaAndToU.SignupToU"
    | "HandleCredentials"
    | "HandleCredentials.CredentialsFinished"
    | "HandleCredentials.SignupCredentialPassword"
    | "HandleCredentials.SignupCredentialWebauthn"
    | "HandleCredentials.SignupCredentials"
    | "HandleEmail"
    | "HandleEmail.EmailFinished"
    | "HandleEmail.ProcessEmailCode"
    | "HandleEmail.SignupEnterCode"
    | "SignupStart"
    | {
        "AskForEmailAddress"?: "SignupEmailForm";
        "FinaliseUser"?: "CreateUser" | "SignupUserCreated";
        "HandleCaptchaAndToU"?:
          | "Fail"
          | "Finished"
          | "ProcessCaptcha"
          | "ProcessToU"
          | "RegisterEmail"
          | "SignupCaptcha"
          | "SignupToU";
        "HandleCredentials"?:
          | "CredentialsFinished"
          | "SignupCredentialPassword"
          | "SignupCredentialWebauthn"
          | "SignupCredentials";
        "HandleEmail"?: "EmailFinished" | "ProcessEmailCode" | "SignupEnterCode";
      };
  tags: never;
}
