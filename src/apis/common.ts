import { PayloadAction } from "@reduxjs/toolkit";
import { EduidJSAppCommonConfig } from "commonConfig";

export interface StateWithCommonConfig {
  config: EduidJSAppCommonConfig;
}

/*********************************************************************************************************************/
/*
 * Make sure an URL has a trailing slash, optionally joining it with an endpoint.
 */
export function urlJoin(base_url: string, endpoint?: string) {
  if (!base_url.endsWith("/")) {
    base_url = base_url.concat("/");
  }
  if (endpoint) {
    return base_url + endpoint;
  }
  return base_url;
}

// type predicate to help identify rejected payloads from backend.
export function isFSA(action: any): action is PayloadAction {
  try {
    return "type" in action && "payload" in action;
  } catch {
    return false;
  }
}
