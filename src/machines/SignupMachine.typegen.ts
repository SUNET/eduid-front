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
  eventsCausingActions: {
    assignEmailCode: "TRY_CODE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "CreateUser"
    | "ProcessCaptcha"
    | "ProcessEmailCode"
    | "RegisterEmail"
    | "SignupCaptcha"
    | "SignupCredentialPassword"
    | "SignupCredentialWebauthn"
    | "SignupCredentials"
    | "SignupEmailForm"
    | "SignupEnterCode"
    | "SignupStart"
    | "SignupToU"
    | "SignupUserCreated";
  tags: never;
}
