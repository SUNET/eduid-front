/*
 * Code and data structures for talking to the eduid-idp (login) backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginAppDispatch, LoginRootState } from "login/app_init/initStore";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

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
 * @desc Redux async thunk to get info about available options for authentication.
 */
export const fetchAuthnOptions = createAsyncThunk<
  LoginAuthnOptions,
  { ref: string },
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchAuthnOptions", async (args, thunkAPI) => {
  try {
    const body: KeyValues = {
      ref: args.ref,
    };

    const response = await makeLoginRequest<LoginAuthnOptions>(thunkAPI, "authn_options", body);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(loginFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

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
 * @desc Redux async thunk to request login using another device. Used on device 1 to get a QR code from the backend.
 */
export const requestUseOtherDevice = createAsyncThunk<
  LoginRequestOtherResponse, // return type
  { ref: string; username?: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/requestOtherDevice", async (args, thunkAPI) => {
  try {
    const body: KeyValues = {
      ref: args.ref,
      username: args.username,
    };

    const response = await makeLoginRequest<LoginRequestOtherResponse>(thunkAPI, "request_other", body);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(loginFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

export interface LoginUseOtherResponse {
  login_ref: string;
  expires_in: number;
}

/**
 * @public
 * @function fetchUseOtherDevice
 * @desc Redux async thunk to request to login on another device (on the device scanning the QR code, device 2).
 */
export const fetchUseOtherDevice = createAsyncThunk<
  { state_id: string; data: LoginUseOtherResponse }, // return type
  { state_id: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/useOtherDevice", async (args, thunkAPI) => {
  try {
    const body: KeyValues = {
      state_id: args.state_id,
    };

    const response = await makeLoginRequest<LoginUseOtherResponse>(thunkAPI, "use_other", body);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return { state_id: args.state_id, data: response.payload };
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(loginFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

export type SAMLParameters = { SAMLResponse: string; RelayState?: string };

export interface LoginNextResponse {
  // The response from the /next API endpoint consists of (in the happy case):
  //   action: what action the backed requires next, or FINISHED
  //   target: the API endpoint for the next action
  //   parameters: SAML parameters for completing the FINISHED 'action'
  action: string;
  target: string;
  parameters?: SAMLParameters;
}

/**
 * @public
 * @function fetchNext
 * @desc Redux async thunk to request the backend to tell us what action to perform next in the login flow.
 */
export const fetchNext = createAsyncThunk<
  LoginNextResponse, // return type
  { ref: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchNext", async (args, thunkAPI) => {
  try {
    const body: KeyValues = {
      ref: args.ref,
    };

    const state = thunkAPI.getState();

    const response = await makeRequest<LoginNextResponse>(thunkAPI, state.config.next_url, undefined, body);

    if (response.error) {
      // dispatch fail responses so that notification middleware will show them to the user
      thunkAPI.dispatch(response);
      return thunkAPI.rejectWithValue(undefined);
    }

    return response.payload;
  } catch (error) {
    if (error instanceof Error) {
      thunkAPI.dispatch(loginFail(error.toString()));
      return thunkAPI.rejectWithValue(error.toString());
    } else {
      throw error;
    }
  }
});

function makeLoginRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  return makeRequest(thunkAPI, state.config.base_url, endpoint, body, data);
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
