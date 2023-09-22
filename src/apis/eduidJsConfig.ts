/*
 * Code and data structures for talking to the eduid-idp (login) backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IndexAppDispatch as DashboardAppDispatch,
  IndexAppDispatch as ErrorsAppDispatch,
  IndexAppDispatch as LoginAppDispatch,
  IndexAppDispatch as SignupAppDispatch,
} from "index-init-app";
import { KeyValues, makeBareRequest, RequestThunkAPI, StateWithCommonConfig } from "./common";

/*********************************************************************************************************************/
export interface JsConfigGetConfigResponse {
  [key: string]: unknown;
}

/**
 * @public
 * @function fetchJsConfig
 * @desc     Fetch eduID JS app config from backend.
 */
export const fetchJsConfig = createAsyncThunk<
  JsConfigGetConfigResponse, // return type
  { url: string }, // args type
  {
    dispatch: DashboardAppDispatch | ErrorsAppDispatch | LoginAppDispatch | SignupAppDispatch | helpAppDispatch;
    state: StateWithCommonConfig;
  }
>("config/fetchJsConfig", async (args, thunkAPI) => {
  return makeJsConfigRequest<JsConfigGetConfigResponse>(thunkAPI, args.url)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeJsConfigRequest<T>(
  thunkAPI: RequestThunkAPI,
  url: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // Since the whole body of the executor is enclosed in try/catch, this linter warning is excused.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<PayloadAction<T, string, never, boolean>>(async (resolve, reject) => {
    try {
      const response = await makeBareRequest<T>(thunkAPI, url, body, data);

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
      if (error instanceof Error) {
        thunkAPI.dispatch(jsConfigFail(error.toString()));
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
export const jsConfigFail = createAction("jsconfig_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
