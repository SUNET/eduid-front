import { PayloadAction } from "@reduxjs/toolkit";
import { newCsrfToken } from "actions/DashboardConfig";
import { EduidJSAppCommonConfig } from "commonConfig";
import { DashboardAppDispatch } from "dashboard-init-app";
import { LoginAppDispatch } from "login/app_init/initStore";
import { checkStatus, getRequest, postRequest } from "sagas/ts_common";

export interface StateWithCommonConfig {
  config: EduidJSAppCommonConfig;
}

export interface RequestThunkAPI {
  getState: () => StateWithCommonConfig;
  dispatch: DashboardAppDispatch | LoginAppDispatch;
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
function updateCsrf(action: { payload: { csrf_token?: string } }, thunkAPI: RequestThunkAPI) {
  if (action.payload === undefined || action.payload.csrf_token === undefined) return action;
  const state = thunkAPI.getState();
  if (action.payload.csrf_token != state.config.csrf_token) {
    thunkAPI.dispatch(newCsrfToken(action.payload.csrf_token));
  }
  delete action.payload.csrf_token;
  return action;
}

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

  let url;
  if (endpoint) {
    if (!base_url.endsWith("/")) {
      base_url = base_url.concat("/");
    }
    url = base_url + endpoint;
  } else {
    url = base_url;
  }

  // Add the current CSRF token
  if (body !== undefined && body.csrf_token === undefined) {
    body.csrf_token = state.config.csrf_token;
  }

  return makeBareRequest<T>(thunkAPI, url, body, data);
}

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
    .then(async (response) => (await response.json()) as PayloadAction<T, string, never, boolean>)
    .then((action) => updateCsrf(action, thunkAPI) as PayloadAction<T, string, never, boolean>);
}
