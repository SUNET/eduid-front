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
    | "ProcessCaptcha"
    | "ProcessEmailCode"
    | "RegisterEmail"
    | "SignupCaptcha"
    | "SignupCredentialFIDO"
    | "SignupCredentialPassword"
    | "SignupCredentials"
    | "SignupEmailForm"
    | "SignupEnterCode"
    | "SignupFinished"
    | "SignupToU";
  tags: never;
}
