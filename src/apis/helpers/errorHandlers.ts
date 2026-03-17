import type { QueryReturnValue } from "@reduxjs/toolkit/query";
import type { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";
import { showNotification } from "slices/Notifications";
import { customBaseQuery } from "../common";
import type { AuthenticateResponse } from "../eduidAuthn";
import { isApiResponse } from "./typeGuards";
import type { ApiError, StateWithCommonConfig } from "./types";

// Module-level guard: when an /authenticate request is already in flight,
// subsequent callers share the same promise instead of firing concurrent requests.
// This prevents SessionOutOfSync errors caused by multiple 401 responses
// (e.g. from parallel dashboard API calls) each independently triggering /authenticate.
let inFlightReauth: Promise<void> | null = null;

// Moved from common.ts
export async function re_authenticate(csrf_token: string | undefined, api: BaseQueryApi) {
  if (inFlightReauth) {
    // Another re_authenticate call is already in progress — wait for it
    return inFlightReauth;
  }

  inFlightReauth = (async () => {
    try {
      const reauth_result = await customBaseQuery(
        { url: "authenticate", body: { frontend_action: "login", csrf_token: csrf_token } },
        api,
        { service: "authn" },
      );

      if (reauth_result.data && isApiResponse<AuthenticateResponse>(reauth_result.data)) {
        if (reauth_result.data.payload.location) {
          globalThis.location.href = reauth_result.data.payload.location;
        }
      }
    } finally {
      inFlightReauth = null;
    }
  })();

  return inFlightReauth;
}

export async function handleBaseQueryError(
  result: Extract<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>, { error: FetchBaseQueryError }>,
  csrf_token: string | undefined,
  api: BaseQueryApi,
  state: StateWithCommonConfig,
) {
  // FetchBaseQuery errors
  if (typeof result.error.status === "number") {
    if (result.error.status === 401) {
      // If we get a 401, authenticate for login
      await re_authenticate(csrf_token, api);
    } else if (result.error.status === 0 && state.config.authn_service_url) {
      // re-implementing handling of status 0 errors
      // redirect to login with return to where we are now
      const current_page = globalThis.location.href;
      globalThis.location.href =
        state.config.authn_service_url + "/services/authn/login?next=" + encodeURIComponent(current_page);
    } else {
      // should be errors only, i.e. 400 and 500 series
      api.dispatch(showNotification({ message: "HTTP " + result.error.status, level: "error" }));
    }
  } else if (result.error?.status === "FETCH_ERROR") {
    // fetchBaseQuery wrapped errors
    api.dispatch(showNotification({ message: "general.failed_to_fetch", level: "error" }));
  } else {
    api.dispatch(showNotification({ message: result.error.status + " " + result.error.error, level: "error" }));
  }
}

export async function handleApiError<T>(
  data: ApiError<T>,
  meta: FetchBaseQueryMeta | undefined,
  csrf_token: string | undefined,
  api: BaseQueryApi,
): Promise<{ error: ApiError<T>; meta: FetchBaseQueryMeta | undefined }> {
  // validation errors from backend has slightly different format
  if (data.payload.error?.csrf_token && data.payload.error.csrf_token[0] === "CSRF failed to validate") {
    await re_authenticate(csrf_token, api);
  } else if (data.payload.error?.nin) {
    api.dispatch(showNotification({ message: data.payload.error.nin[0], level: "error" }));
  } else if (data.payload.message === "resetpw.captcha-already-completed") {
    // captcha already completed, no need to show error
  } else if (data.payload.message === "authn_status.must-authenticate") {
    // set frontend_action and trigger re-authentication modal
    // use string types to avoid circular dependencies
    const metaObj = (data as { meta?: { frontend_action?: string } }).meta;
    if (metaObj?.frontend_action) {
      api.dispatch({ type: "authn/setFrontendActionAndState", payload: { frontend_action: metaObj.frontend_action } });
    }
    api.dispatch({ type: "authn/setReAuthenticate", payload: true });
  } else {
    const msg = data.payload.message || "error_in_form";
    api.dispatch(showNotification({ message: msg, level: "error" }));
  }
  // For RTK query purposes return the result as error
  return {
    error: data,
    meta: meta,
  };
}
