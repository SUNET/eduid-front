import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EduidJSAppCommonConfig } from "commonConfig";
import { EDUID_CONFIG_URL } from "globals";
import { clearNotifications, showNotification } from "slices/Notifications";
import { ajaxHeaders } from "ts_common";

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions: { service?: string }) => {
  const state = api.getState() as StateWithCommonConfig;
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
    throw new Error("No service specified");
  }
  if (!(extraOptions.service in service_urls)) {
    throw new Error(`Unknown service: ${extraOptions.service}`);
  }
  const baseUrl = service_urls[extraOptions.service];

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    redirect: "manual",
    method: args?.body === undefined ? "GET" : "POST",
    headers: ajaxHeaders,
    responseHandler: "content-type",
  });

  // Make sure we add the csrf token to the body
  let base_args;
  if (args?.body !== undefined && args.body.csrf_token === undefined) {
    base_args = { ...args, body: { ...args.body, csrf_token: state.config.csrf_token } };
  } else {
    base_args = args;
  }
  const result = await rawBaseQuery(base_args, api, extraOptions);

  if (result.data && typeof result.data === "object" && "error" in result.data && result.data.error === true) {
    // Handle notification dispatching directly in the base query instead of in middleware
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorData = result.data as any;
    
    // Check for special messages that should clear notifications
    if (
      errorData.payload?.message === "authn_status.must-authenticate" ||
      errorData.payload?.message === "resetpw.captcha-already-completed"
    ) {
      api.dispatch(clearNotifications());
    } 
    // Handle errors when error flag is true and payload exists
    else if (errorData.error && errorData.payload) {
      let msg: string;
      
      // Handle CSRF token errors
      if (errorData.payload.error?.csrf_token !== undefined) {
        msg = "csrf.try-again";
      }
      // Handle NIN errors
      else if (errorData.payload.error?.nin) {
        msg = errorData.payload.error.nin[0];
      }
      // Handle general errors
      else {
        msg = errorData.payload.errorMsg || errorData.payload.message || "error_in_form";
      }
      
      api.dispatch(showNotification({ message: msg, level: "error" }));
      setTimeout(() => {
        try {
          window.scroll(0, 0);
        } catch (_error) {
          // window.scroll isn't available in the tests jsdom environment
        }
      }, 100);
    }
    // Handle info messages (when error flag is not true or payload exists without error flag)
    else if (errorData.payload?.message) {
      api.dispatch(showNotification({ message: errorData.payload.message, level: "info" }));
      setTimeout(() => {
        try {
          window.scroll(0, 0);
        } catch (_error) {
          // window.scroll isn't available in the tests jsdom environment
        }
      }, 100);
    }

    // return as error for rtk query purposes
    return {
      error: result.data,
      meta: result.meta,
    };
  }
  return result;
};

/*********************************************************************************************************************/
// Legacy action creator for API errors. No longer used - notifications are now dispatched directly
// from customBaseQuery above. Kept for backwards compatibility.
export const genericApiFail = createAction("genericApi_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});

export interface ApiResponse<T> {
  payload: T;
  type: string;
}

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
export function isFSA(action: unknown): action is PayloadAction<unknown> {
  try {
    return typeof action === "object" && action !== null && "type" in action && "payload" in action;
  } catch {
    return false;
  }
}

export const eduIDApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "eduIDApi",
  endpoints: () => ({}),
});
