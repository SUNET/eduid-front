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

  if (!isErrorResult(result) && isInvalidSessionError(result.data) && args?.body !== undefined) {
    // The backend invalidated the session while answering, which also cleared the CSRF token
    // server side. Retrying with the token from this response would fail with "CSRF failed to
    // validate", since that token was minted into the now dead session. Fetch a fresh token
    // from the service root and retry the request once.
    const fresh_csrf_token = await fetchFreshCsrfToken(baseUrl, csrf_token, api, extraOptions);
    if (fresh_csrf_token) {
      csrf_token = fresh_csrf_token;
      result = await rawBaseQuery(addCsrfTokenToArgs(args, fresh_csrf_token), api, extraOptions);
    }
  }

  // manage results of api call
  if (isErrorResult(result)) {
    await handleBaseQueryError(result, csrf_token, api, state);
  } else if (isApiError(result.data)) {
    // Do not extract the CSRF token from error responses. The backend mints a token into the
    // session it holds while answering, and for session errors (resetpw.invalid_session) that
    // session has just been invalidated - storing that token poisons every following request
    // with "CSRF failed to validate".
    return await handleApiError(result.data, result.meta, csrf_token, api);
  } else {
    // extract CSRF token from response
    csrf_token = handleCsrfTokenFromResponse(result.data, csrf_token, api);
  }
  return result;
};

// The backend returns this message when the session held by the browser can not be used for the
// request. The session is cleared server side before answering, so the correct response is to
// retry the request - but only after getting a CSRF token that belongs to the new session.
function isInvalidSessionError(data: unknown): boolean {
  return isApiError<{ message?: string }>(data) && data.payload.message === "resetpw.invalid_session";
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
