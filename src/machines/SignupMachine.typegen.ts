// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "CreateUser"
    | "HandleCaptchaAndToU"
    | "HandleCaptchaAndToU.Finished"
    | "HandleCaptchaAndToU.ProcessCaptcha"
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
    | "HandleEmail.RegisterEmail"
    | "HandleEmail.SignupEnterCode"
    | "SignupEmailForm"
    | "SignupStart"
    | "SignupUserCreated"
    | {
        HandleCaptchaAndToU?:
          | "Finished"
          | "ProcessCaptcha"
          | "SignupCaptcha"
          | "SignupToU";
        HandleCredentials?:
          | "CredentialsFinished"
          | "SignupCredentialPassword"
          | "SignupCredentialWebauthn"
          | "SignupCredentials";
        HandleEmail?:
          | "EmailFinished"
          | "ProcessEmailCode"
          | "RegisterEmail"
          | "SignupEnterCode";
      };
  tags: never;
}
