import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storeCsrfToken } from "commonConfig";
import { EDUID_CONFIG_URL } from "globals";
import { clearNotifications } from "slices/Notifications";
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
  const result = await rawBaseQuery(base_args, api, extraOptions);
  // manage results of api call
  if (isErrorResult(result)) {
    await handleBaseQueryError(result, csrf_token, api, state);
  } else {
    // Clear error notifications only on successful non-GET requests
    // e.g., "POST_SIGNUP_GET_CAPTCHA_SUCCESS" not clears errors
    if (isApiResponse(result.data) && !result.data.type.includes("GET")) {
      api.dispatch(clearNotifications());
    }
    // extract CSRF token from response
    csrf_token = handleCsrfTokenFromResponse(result.data, csrf_token, api);
    if (isApiError(result.data)) {
      return await handleApiError(result.data, result.meta, csrf_token, api);
    }
  }
  return result;
};

function addCsrfTokenToArgs(args: FetchArgs, csrf_token: string | undefined): FetchArgs {
  if (args?.body !== undefined && args.body.csrf_token === undefined) {
    return { ...args, body: { ...args.body, csrf_token } };
  }
  return args;
}

function handleCsrfTokenFromResponse(
  data: unknown,
  csrf_token: string | undefined,
  api: BaseQueryApi
): string | undefined {
  if (isApiResponse(data) && hasCsrfToken(data)) {
    if (data.payload.csrf_token && data.payload.csrf_token !== csrf_token) {
      api.dispatch(storeCsrfToken(data.payload.csrf_token));
      delete data.payload.csrf_token;
      return data.payload.csrf_token;
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
