import { PayloadAction } from "@reduxjs/toolkit";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";
import { EDUID_CONFIG_URL } from "globals";
import { showNotification } from "slices/Notifications";
import { AuthenticateResponse } from "./eduidAuthn";

const ajaxHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  "Accept-Encoding": "gzip,deflate",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Requested-With": "XMLHttpRequest",
};

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions: { service?: string }) => {
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

  // Make sure we add the csrf token to the body
  let base_args;
  if (args?.body !== undefined && args.body.csrf_token === undefined) {
    base_args = { ...args, body: { ...args.body, csrf_token: csrf_token } };
  } else {
    base_args = args;
  }

  const result = await rawBaseQuery(base_args, api, extraOptions);

  if (isErrorResult(result)) {
    // FetchBaseQuery errors
    if (typeof result.error.status === "number") {
      if (result.error.status === 401) {
        // If we get a 401, authenticate for login
        await re_authenticate(csrf_token, api);
      } else if (result.error.status === 0 && state.config.authn_service_url) {
        // re-implementing handling of status 0 errors
        // redirect to login with return to where we are now
        const current_page = window.location.href;
        window.location.href =
          state.config.authn_service_url + "/services/authn/login?next=" + encodeURIComponent(current_page);
      } else {
        // should be errors only, i.e. 400 and 500 series
        api.dispatch(showNotification({ message: "HTTP " + result.error.status, level: "error" }));
      }
    } else {
      // fetchBaseQuery wrapped errors
      api.dispatch(showNotification({ message: result.error.status + " " + result.error.error, level: "error" }));
    }
  } else {
    // FetchBaseQuery successful responses including API errors from backend
    if (isApiResponse(result.data) && hasCsrfToken(result.data)) {
      // Successful response from backend, extract the csrf token from the response
      if (result.data.payload.csrf_token && result.data.payload.csrf_token !== csrf_token) {
        // If the csrf token has changed, update the store
        // and update local variable in case reauth is needed
        csrf_token = result.data.payload.csrf_token;
        api.dispatch(storeCsrfToken(result.data.payload.csrf_token));
        delete result.data.payload.csrf_token;
      }
    }

    if (isApiError(result.data)) {
      console.log("API Error: ", JSON.stringify(result.data));
      // validation errors from backend has slightly different format
      if (
        result.data.payload.error?.csrf_token &&
        result.data.payload.error.csrf_token[0] === "CSRF failed to validate"
      ) {
        await re_authenticate(csrf_token, api);
      } else if (result.data.payload.error?.nin) {
        api.dispatch(showNotification({ message: result.data.payload.error.nin[0], level: "error" }));
      } else if (
        result.data.payload.message === "resetpw.captcha-already-completed" ||
        result.data.payload.message === "authn_status.must-authenticate"
      ) {
        // captcha already completed, no need to show error
        // reauth is handled in ReAuthnMiddleware
      } else {
        const msg = result.data.payload.message || "error_in_form";
        api.dispatch(showNotification({ message: msg, level: "error" }));
      }
      // For RTK query purposes return the result as error
      return {
        error: result.data,
        meta: result.meta,
      };
    }
  }
  return result;
};

export interface ApiResponse<T> {
  error?: boolean;
  payload: T;
  type: string;
}

type ApiError<T> = ApiResponse<T> & {
  error: true;
  payload: T & { error?: { csrf_token?: string[]; nin?: string[] }; message?: string };
};

export interface StateWithCommonConfig {
  config: EduidJSAppCommonConfig;
}

async function re_authenticate(csrf_token: string | undefined, api: BaseQueryApi) {
  const reauth_result = await customBaseQuery(
    { url: "authenticate", body: { frontend_action: "login", csrf_token: csrf_token } },
    api,
    { service: "authn" }
  );

  if (reauth_result.data && isApiResponse<AuthenticateResponse>(reauth_result.data)) {
    if (reauth_result.data.payload.location) {
      window.location.href = reauth_result.data.payload.location;
    }
  }
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

/*********************************************************************************************************************/
/*
 * Type guards
 */

// type predicate to help identify rejected payloads from backend.
export function isFSA(action: unknown): action is PayloadAction<unknown> {
  try {
    return typeof action === "object" && action !== null && "type" in action && "payload" in action;
  } catch {
    return false;
  }
}

// FetchBaseQuery error
function isErrorResult(result: unknown): result is { error: FetchBaseQueryError; meta?: FetchBaseQueryMeta } {
  return typeof result === "object" && result !== null && "error" in result;
}

function isApiResponse<T>(data: unknown): data is ApiResponse<T> {
  return typeof data === "object" && data !== null && "payload" in data && "type" in data;
}

function isApiError<T>(data: unknown): data is ApiError<T> {
  return typeof data === "object" && data !== null && "error" in data && data.error === true;
}

function hasCsrfToken<T>(data: ApiResponse<T>): data is ApiResponse<T & { csrf_token?: string }> {
  return (
    typeof data.payload === "object" &&
    data.payload !== null &&
    "csrf_token" in data.payload &&
    typeof data.payload.csrf_token === "string"
  );
}

export const eduIDApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "eduIDApi",
  endpoints: () => ({}),
});
