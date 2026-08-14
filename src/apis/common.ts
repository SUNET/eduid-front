import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storeCsrfToken } from "commonConfig";
import { EDUID_CONFIG_URL } from "globals";
import { handleApiError, handleBaseQueryError } from "./helpers/errorHandlers";
import { hasCsrfToken, isApiError, isApiResponse, isErrorResult } from "./helpers/typeGuards";
import type { StateWithCommonConfig } from "./helpers/types";

const ajaxHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  "Accept-Encoding": "gzip,deflate",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Requested-With": "XMLHttpRequest",
};

export const customBaseQuery: BaseQueryFn = async (args, api, extraOptions: { service?: string }) => {
  const state = api.getState() as StateWithCommonConfig;
  let csrf_token = state.config.csrf_token;
  const service_urls: { [key: string]: string | undefined } = {
    jsConfig: EDUID_CONFIG_URL,
    signup: state.config.signup_service_url,
    personalData: state.config.personal_data_service_url,
    authn: state.config.authn_service_url,
    security: state.config.security_service_url,
    orcid: state.config.orcid_service_url,
    email: state.config.emails_service_url,
    letterProofing: state.config.letter_proofing_service_url,
    bankid: state.config.bankid_service_url,
    eidas: state.config.eidas_service_url,
    frejaeID: state.config.freja_eid_service_url,
    ladok: state.config.ladok_service_url,
    login: state.config.login_service_url,
    resetPassword: state.config.reset_password_service_url,
  };
  if (!extraOptions?.service) {
    return customError("No service specified");
  }
  if (!(extraOptions.service in service_urls)) {
    return customError("Unknown service: " + extraOptions.service);
  }
  const baseUrl = service_urls[extraOptions.service];
  if (baseUrl === undefined) {
    return customError("No url for service: " + extraOptions.service);
  }
  const rawBaseQuery = createBaseQuery(baseUrl, args?.body === undefined ? "GET" : "POST");

  // Add CSRF token to body if needed
  const base_args = addCsrfTokenToArgs(args, csrf_token);

  // call backend api
  let result = await rawBaseQuery(base_args, api, extraOptions);

  if (!isErrorResult(result) && isInvalidSessionError(result.data)) {
    // The backend invalidated the session while answering, which also cleared the CSRF token
    // server side. Retrying with the token from this response would fail with "CSRF failed to
    // validate", since that token was minted into the now dead session. Fetch a fresh token from
    // the service root, so this browser is not left holding a token from the dead session, and
    // retry the request itself when there is a body to retry with. A request without a body
    // (a GET) carries no CSRF token, so there is nothing to retry - but the token still has to be
    // refreshed, or the next POST goes out with the dead session's token.
    const fresh_csrf_token = await fetchFreshCsrfToken(baseUrl, csrf_token, api, extraOptions);
    if (fresh_csrf_token) {
      csrf_token = fresh_csrf_token;
      if (args?.body !== undefined) {
        result = await rawBaseQuery(replaceCsrfTokenInArgs(args, fresh_csrf_token), api, extraOptions);
      }
    }
  } else if (!isErrorResult(result) && isCsrfValidationError(result.data) && args?.body !== undefined) {
    // The opposite situation: the session answering is alive and well, and it is the token this
    // browser sent that is stale. The token in this response is the one that session expects, so
    // store it and retry once. Re-authenticating the user (see handleApiError) would throw away a
    // half finished password reset over a token this browser can simply correct.
    const live_csrf_token = handleCsrfTokenFromResponse(result.data, csrf_token, api);
    if (live_csrf_token && live_csrf_token !== csrf_token) {
      csrf_token = live_csrf_token;
      result = await rawBaseQuery(replaceCsrfTokenInArgs(args, live_csrf_token), api, extraOptions);
    }
  }

  // manage results of api call
  if (isErrorResult(result)) {
    await handleBaseQueryError(result, csrf_token, api, state);
  } else if (isApiError(result.data)) {
    // The CSRF token is not extracted from error responses in general. The backend mints a token
    // into the session it holds while answering, and for session errors (resetpw.invalid_session)
    // that session has just been invalidated - storing that token poisons every following request
    // with "CSRF failed to validate".
    //
    // A response that failed CSRF validation is the one error response whose token can be trusted:
    // it was produced by a live session that is still serving this browser, and it is the token we
    // sent that is stale. Storing it is what lets handleApiError's re-authentication go out with a
    // token the backend will accept, instead of the same stale one that just failed.
    //
    // The two cases can never be confused: an invalidated session reports through
    // payload.message ("resetpw.invalid_session") and never sets payload.error.csrf_token, while a
    // CSRF validation failure reports through payload.error.csrf_token. Do not "simplify" this
    // back into extracting the token from every error response - that is the bug this guard exists
    // to prevent.
    if (isCsrfValidationError(result.data)) {
      csrf_token = handleCsrfTokenFromResponse(result.data, csrf_token, api);
    }
    return await handleApiError(result.data, result.meta, csrf_token, api);
  } else {
    // extract CSRF token from response
    handleCsrfTokenFromResponse(result.data, csrf_token, api);
  }
  return result;
};

// The backend returns this message when the session held by the browser can not be used for the
// request. The session is cleared server side before answering, so the correct response is to
// retry the request - but only after getting a CSRF token that belongs to the new session.
function isInvalidSessionError(data: unknown): boolean {
  return isApiError<{ message?: string }>(data) && data.payload.message === "resetpw.invalid_session";
}

// The backend returns this when the CSRF token sent with the request is not the one the session
// holds. The session itself is alive, so the token in the response can be used to try again.
function isCsrfValidationError(data: unknown): boolean {
  return isApiError(data) && data.payload.error?.csrf_token?.[0] === "CSRF failed to validate";
}

// Issue a GET to the service root to get a CSRF token for the current session.
async function fetchFreshCsrfToken(
  baseUrl: string,
  csrf_token: string | undefined,
  api: BaseQueryApi,
  extraOptions: { service?: string },
): Promise<string | undefined> {
  const result = await createBaseQuery(baseUrl, "GET")({ url: "" }, api, extraOptions);
  if (isErrorResult(result) || isApiError(result.data)) {
    return undefined;
  }
  return handleCsrfTokenFromResponse(result.data, csrf_token, api);
}

function addCsrfTokenToArgs(args: FetchArgs, csrf_token: string | undefined): FetchArgs {
  if (args?.body !== undefined && args.body.csrf_token === undefined) {
    return { ...args, body: { ...args.body, csrf_token } };
  }
  return args;
}

// Used for retries, where the token the caller put in the body is the reason the request failed.
// addCsrfTokenToArgs would leave that token in place.
function replaceCsrfTokenInArgs(args: FetchArgs, csrf_token: string): FetchArgs {
  return { ...args, body: { ...args.body, csrf_token } };
}

function handleCsrfTokenFromResponse(
  data: unknown,
  csrf_token: string | undefined,
  api: BaseQueryApi,
): string | undefined {
  if (isApiResponse(data) && hasCsrfToken(data)) {
    const new_csrf_token = data.payload.csrf_token;
    if (new_csrf_token && new_csrf_token !== csrf_token) {
      api.dispatch(storeCsrfToken(new_csrf_token));
      delete data.payload.csrf_token;
      return new_csrf_token;
    }
  }
  return csrf_token;
}

function customError(error: string) {
  return {
    error: {
      status: "CUSTOM_ERROR",
      error: error,
    },
  };
}

function createBaseQuery(baseUrl: string, method: string) {
  return fetchBaseQuery({
    baseUrl,
    credentials: "include",
    redirect: "manual",
    method,
    headers: ajaxHeaders,
    responseHandler: "content-type",
  });
}

export const eduIDApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "eduIDApi",
  endpoints: () => ({}),
});
