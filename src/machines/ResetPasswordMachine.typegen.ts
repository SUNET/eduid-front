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
    | "AskForEmailAddress"
    | "AskForEmailAddress.EmailLinkSent"
    | "AskForEmailAddress.EmailLinkSent.EmailLinkSent"
    | "AskForEmailAddress.ResetPasswordEnterEmail"
    | "ResetPasswordStart"
    | {
        AskForEmailAddress?:
          | "EmailLinkSent"
          | "ResetPasswordEnterEmail"
          | { EmailLinkSent?: "EmailLinkSent" };
      };
  tags: never;
}
