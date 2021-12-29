/*
 * Code and data structures for talking to the eduid-idp (login) backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginAppDispatch, LoginRootState } from "login/app_init/initStore";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

/***********************************************************************************/
export interface LoginAuthnOptions {
  password?: boolean;
  other_device?: boolean;
  webauthn?: boolean;
  freja_eidplus?: boolean;
  username?: string;
}
/**
 * @public
 * @function fetchAuthnOptions
 * @desc     Get info about available options for authentication.
 */
export const fetchAuthnOptions = createAsyncThunk<
  LoginAuthnOptions,
  { ref: string },
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchAuthnOptions", async (args, thunkAPI) => {
  const body: KeyValues = {
    ref: args.ref,
  };

  return makeLoginRequest<LoginAuthnOptions>(thunkAPI, "authn_options", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/***********************************************************************************/
export interface LoginRequestOtherResponse {
  state_id: string;
  short_code: string;
  expires_in: number;
  qr_img: string;
  other_url: string;
}

/**
 * @public
 * @function requestUseOtherDevice
 * @desc     Request login using another device. Used on device 1 to get a QR code from the backend.
 */
export const requestUseOtherDevice = createAsyncThunk<
  LoginRequestOtherResponse, // return type
  { ref: string; username?: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/requestOtherDevice", async (args, thunkAPI) => {
  const body: KeyValues = {
    ref: args.ref,
    username: args.username,
  };

  return makeLoginRequest<LoginRequestOtherResponse>(thunkAPI, "request_other", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/***********************************************************************************/
export interface LoginUseOtherResponse {
  login_ref: string;
  expires_in: number;
}

/**
 * @public
 * @function fetchUseOtherDevice
 * @desc     Request to login on another device (on the device scanning the QR code, device 2).
 */
export const fetchUseOtherDevice = createAsyncThunk<
  { state_id: string; data: LoginUseOtherResponse }, // return type
  { state_id: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/useOtherDevice", async (args, thunkAPI) => {
  const body: KeyValues = {
    state_id: args.state_id,
  };

  return makeLoginRequest<LoginUseOtherResponse>(thunkAPI, "use_other", body)
    .then((response) => ({
      state_id: args.state_id,
      data: response.payload,
    }))
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/***********************************************************************************/
export interface LoginNextResponse {
  // The response from the /next API endpoint consists of (in the happy case):
  //   action: what action the backed requires next, or FINISHED
  //   target: the API endpoint for the next action
  //   parameters: SAML parameters for completing the FINISHED 'action'
  action: string;
  target: string;
  parameters?: SAMLParameters;
}
export type SAMLParameters = { SAMLResponse: string; RelayState?: string };

/**
 * @public
 * @function fetchNext
 * @desc     Request the backend to tell us what action to perform next in the login flow.
 */
export const fetchNext = createAsyncThunk<
  LoginNextResponse, // return type
  { ref: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchNext", async (args, thunkAPI) => {
  const body: KeyValues = {
    ref: args.ref,
  };

  // TODO: We also have the full next_url in config, should we remove that?
  return makeLoginRequest<LoginNextResponse>(thunkAPI, "next", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/***********************************************************************************/
async function makeLoginRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  // Since the whole body of the executor is enclosed in try/catch, this linter warning is excused.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<PayloadAction<T, string, never, boolean>>(async (resolve, reject) => {
    try {
      const state = thunkAPI.getState();

      const response = await makeRequest<T>(thunkAPI, state.config.base_url, endpoint, body, data);

      if (response.error) {
        // dispatch fail responses so that notification middleware will show them to the user
        thunkAPI.dispatch(response);
        reject(response);
      }

      resolve(response);
    } catch (error) {
      if (error instanceof Error) {
        thunkAPI.dispatch(loginFail(error.toString()));
        reject(error.toString());
      } else {
        reject(error);
      }
    }
  });
}

// Fake an error response from the backend. The action ending in _FAIL will make the notification
// middleware picks this error up and shows something to the user.
export const loginFail = createAction("login_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
