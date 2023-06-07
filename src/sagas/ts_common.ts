/*
 * Typed variants of things defined in common.js. Converting common.js to TypeScript was too big of a bite right now.
 */

import { RequestThunkAPI } from "apis/common";
import { DispatchWithAuthn, authnAuthenticate } from "apis/eduidAuthn";
import { TOKEN_SERVICE_URL } from "globals";

export class NeedsAuthenticationError extends Error {}

export const checkStatus = async function (response: Response, thunkAPI: RequestThunkAPI): Promise<Response> {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    const authn_type = response.headers.get("WWW-Authenticate");
    if (authn_type === "eduID") {
      const authnDispatch = thunkAPI.dispatch as DispatchWithAuthn;
      const authn = await authnDispatch(
        authnAuthenticate({
          method: "authenticate",
          frontend_action: "authnLogin",
          frontend_state: window.location.pathname,
        })
      );
      if (authnAuthenticate.fulfilled.match(authn)) {
        if (authn.payload.location) {
          window.location.assign(authn.payload.location);
        }
      }
    }

    throw new NeedsAuthenticationError("Request needs authentication");
  }

  if (response.status === 0) {
    const next = document.location.href;
    document.location.assign(TOKEN_SERVICE_URL + "?next=" + next);
    throw new NeedsAuthenticationError("Request needs authentication");
  }

  throw new Error(`HTTP ${response.status} ${response.statusText}`);
};

export const ajaxHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  "Accept-Encoding": "gzip,deflate",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Requested-With": "XMLHttpRequest",
};

export const postRequest: RequestInit = {
  method: "post",
  redirect: "manual", // we use this to 'trap' the 302 response we get when not authenticated
  credentials: "include",
  headers: ajaxHeaders,
};

export const getRequest: RequestInit = {
  method: "get",
  redirect: "manual", // we use this to 'trap' the 302 response we get when not authenticated
  credentials: "include",
  headers: ajaxHeaders,
};
