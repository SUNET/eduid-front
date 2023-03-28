import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { EduidJSAppCommonConfig, storeCsrfToken } from "commonConfig";
import { DashboardAppDispatch } from "dashboard-init-app";
import { ErrorsAppDispatch } from "errors-init-app";
import { FaqAppDispatch } from "faq-init-app";
import { LoginAppDispatch } from "login-init-app";
import { checkStatus, getRequest, NeedsAuthenticationError, postRequest } from "sagas/ts_common";
import { SignupAppDispatch } from "signup-init-app";

export interface StateWithCommonConfig {
  config: EduidJSAppCommonConfig;
}

export interface RequestThunkAPI {
  getState: () => StateWithCommonConfig;
  dispatch: DashboardAppDispatch | ErrorsAppDispatch | LoginAppDispatch | SignupAppDispatch | FaqAppDispatch;
  signal: AbortSignal;
}

export interface KeyValues {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/*
 * Any response received from the backend might contain an updated CSRF token, which needs to be
 * passed to the backend on any subsequent requests. Update the value in the store if it changes.
 */
interface ResponseWithCsrf {
  payload: { csrf_token?: string };
}
function updateCsrf(action: ResponseWithCsrf, thunkAPI: RequestThunkAPI) {
  if (action.payload === undefined || action.payload.csrf_token === undefined) return action;
  const state = thunkAPI.getState();
  if (action.payload.csrf_token != state.config.csrf_token) {
    thunkAPI.dispatch(storeCsrfToken(action.payload.csrf_token));
  }
  delete action.payload.csrf_token;
  return action;
}

/*********************************************************************************************************************/
export async function makeGenericRequest<T>(
  thunkAPI: RequestThunkAPI,
  base_url: string,
  endpoint?: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // Since the whole body of the executor is enclosed in try/catch, this linter warning is excused.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<PayloadAction<T, string, never, boolean>>(async (resolve, reject) => {
    try {
      const response = await makeRequest<T>(thunkAPI, base_url, endpoint, body, data);

      if (response.error) {
        // Dispatch fail responses so that notification middleware will show them to the user.
        // The current implementation in notify-middleware.js _removes_ error and payload.message from
        // response, so we clone it first so we can reject the promise with the full error response.
        const saved = JSON.parse(JSON.stringify(response));
        thunkAPI.dispatch(response);
        reject(saved);
      }

      resolve(response);
    } catch (error) {
      if (error instanceof NeedsAuthenticationError) {
        // silently ignore errors about missing authentication
        reject();
      } else if (error instanceof Error) {
        thunkAPI.dispatch(genericApiFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}

/*********************************************************************************************************************/
// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const genericApiFail = createAction("genericApi_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});

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
 * Return a promise that will make an API call to an eduID backend, for use in async thunks.
 */
export function makeRequest<T>(
  thunkAPI: RequestThunkAPI,
  base_url: string,
  endpoint?: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  const url = urlJoin(base_url, endpoint);

  // Add the current CSRF token
  if (body !== undefined && body.csrf_token === undefined) {
    body.csrf_token = state.config.csrf_token;
  }

  return makeBareRequest<T>(thunkAPI, url, body, data);
}

/*********************************************************************************************************************/
/*
 * Return a promise that will make an API call to an eduID backend, for use in async thunks.
 * Less restricted than makeRequest above.
 */
export function makeBareRequest<T>(
  thunkAPI: RequestThunkAPI,
  url: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // do POST if there is a body, otherwise GET
  const req = body === undefined ? getRequest : postRequest;

  const request: RequestInit = {
    ...req,
    ...data,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: thunkAPI.signal,
  };

  return fetch(url, request)
    .then(checkStatus)
    .then(async (response) => (await response.json()) as ResponseWithCsrf)
    .then((action) => updateCsrf(action, thunkAPI) as PayloadAction<T, string, never, boolean>);
}

// type predicate to help identify rejected payloads from backend.
export function isFSA(action: any): action is PayloadAction {
  try {
    return "type" in action && "payload" in action;
  } catch {
    return false;
  }
}
