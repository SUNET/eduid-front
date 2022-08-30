/*
 * Code and data structures for talking to the eduid-idp (login) backend microservice.
 */

import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ErrorsAppDispatch, ErrorsRootState } from "errors-init-app";
import { LoginAppDispatch, LoginRootState } from "login-init-app";
import { KeyValues, makeGenericRequest, RequestThunkAPI } from "./common";

/*********************************************************************************************************************/
export interface LoginAbortRequest {
  ref: string;
}

export interface LoginAbortResponse {
  finished: boolean;
}

/**
 * @public
 * @function fetchAbort
 * @desc     Request the backend to abort the current login request.
 */
export const fetchAbort = createAsyncThunk<
  LoginAbortResponse, // return type
  LoginAbortRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchAbort", async (args, thunkAPI) => {
  const body: KeyValues = {
    ref: args.ref,
  };

  return makeLoginRequest<LoginAbortResponse>(thunkAPI, "abort", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
export interface LoginErrorInfoResponseLoggedIn {
  logged_in: true;
  eppn: string;
  has_mfa: boolean;
  has_verified_nin: boolean;
  has_locked_nin: boolean;
}

export interface LoginErrorInfoResponseNotLoggedIn {
  logged_in: false;
}

export type LoginErrorInfoResponse = LoginErrorInfoResponseLoggedIn | LoginErrorInfoResponseNotLoggedIn;

/**
 * @public
 * @function fetchErrorInfo
 * @desc     Get info about logged in user to make errors more precise.
 */
export const fetchErrorInfo = createAsyncThunk<
  LoginErrorInfoResponse, // return type
  undefined, // args type
  { dispatch: LoginAppDispatch | ErrorsAppDispatch; state: LoginRootState | ErrorsRootState }
>("login/api/fetchErrorInfo", async (args, thunkAPI) => {
  const state = thunkAPI.getState();
  const base_url = state.config.base_url || state.config.error_info_url;

  if (!base_url) {
    return { logged_in: false };
  }

  let endpoint: string | undefined = "error_info";
  if (state.config.error_info_url) {
    /* For the errors app, we have the full URL in base_url from above */
    endpoint = undefined;
  }

  const body: KeyValues = {};

  return makeGenericRequest<LoginErrorInfoResponse>(thunkAPI, base_url, endpoint, body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export type LoginUseOtherDevice1Request = UseOtherDevice1Fetch | UseOtherDevice1Abort | UseOtherDevice1SubmitCode;
export type LoginUseOtherDevice1Response = UseOtherDevice1ResponseWithQR | UseOtherDevice1ResponseWithoutQR;

/* Request types */
interface UseOtherDevice1CommonRequest {
  ref: string;
  this_device?: string;
  remember_me?: boolean;
}

interface UseOtherDevice1Fetch extends UseOtherDevice1CommonRequest {
  action: "FETCH";
  username?: string;
}

interface UseOtherDevice1Abort extends UseOtherDevice1CommonRequest {
  action: "ABORT";
}

interface UseOtherDevice1SubmitCode extends UseOtherDevice1CommonRequest {
  action: "SUBMIT_CODE";
  response_code: string;
}

/* Response types */
interface UseOtherDevice1ResponseCommon {
  bad_attempts: number;
  display_id: string;
  expires_in: number;
  expires_max: number;
  response_code_required?: boolean;
  state_id: string;
}

export type UseOtherDevice1ResponseWithQR = UseOtherDevice1ResponseCommon & {
  state: "NEW" | "IN_PROGRESS" | "AUTHENTICATED";
  qr_img: string;
  qr_url: string;
  short_code: string;
};

export type UseOtherDevice1ResponseWithoutQR = UseOtherDevice1ResponseCommon & {
  state: "ABORTED" | "FINISHED" | "DENIED";
};

/**
 * @public
 * @function fetchUseOtherDevice1
 * @desc     Request login using another device. Used on device 1 to get a QR code from the backend.
 */
export const fetchUseOtherDevice1 = createAsyncThunk<
  LoginUseOtherDevice1Response, // return type
  LoginUseOtherDevice1Request, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/useOtherDevice1", async (args, thunkAPI) => {
  const body: KeyValues = args;

  return makeLoginRequest<LoginUseOtherDevice1Response>(thunkAPI, "use_other_1", body)
    .then((response) => response.payload)
    .catch((err) => {
      return thunkAPI.rejectWithValue(err);
    });
});

/*********************************************************************************************************************/

/* Request types */
interface UseOtherDevice2WithRef {
  ref: string;
  action?: "ABORT";
}

interface UseOtherDevice2WithStateId {
  state_id: string;
  action?: "ABORT";
}

export type LoginUseOtherDevice2Request = UseOtherDevice2WithRef | UseOtherDevice2WithStateId;
export type LoginUseOtherDevice2Response = UseOtherDevice2Response | UseOtherDevice2ResponseLoggedIn;

/* Response types */
interface UseOtherDevice2ResponseCommon {
  device1_info: DeviceInfo;
  expires_in: number;
  expires_max: number;
  login_ref: string;
  short_code: string;
  username?: string;
  display_name?: string;
  response_code_required?: boolean;
}

export type UseOtherDevice2Response = UseOtherDevice2ResponseCommon & {
  state: "IN_PROGRESS" | "ABORTED" | "FINISHED" | "DENIED";
};

export type UseOtherDevice2ResponseLoggedIn = UseOtherDevice2ResponseCommon & {
  state: "AUTHENTICATED";
  response_code: string;
};

export interface ServiceInfo {
  display_name: { [key: string]: string }; // SP display name in different locales
}

export interface DeviceInfo {
  addr: string;
  proximity: "SAME" | "NEAR" | "FAR";
  description?: string;
  is_known_device: boolean;
  service_info: ServiceInfo;
}

/**
 * @public
 * @function fetchUseOtherDevice2
 * @desc     Request to login on another device (on the device scanning the QR code, device 2).
 */
export const fetchUseOtherDevice2 = createAsyncThunk<
  LoginUseOtherDevice2Response, // return type
  LoginUseOtherDevice2Request, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/useOtherDevice2", async (args, thunkAPI) => {
  // The backend endpoint will use 'ref' if it is provided, but when the user follows the QR code
  // there is no pending request (with a 'ref') at first, only a state_id parameter from the QR URL.
  const body: KeyValues = args;

  return makeLoginRequest<LoginUseOtherDevice2Response>(thunkAPI, "use_other_2", body)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/

export interface LoginNextRequest {
  ref: string;
  this_device?: string;
  remember_me: boolean;
}

export type IdPAction = "NEW_DEVICE" | "OTHER_DEVICE" | "USERNAMEPASSWORD" | "MFA" | "TOU" | "FINISHED";

export interface LoginNextResponse {
  // The response from the /next API endpoint consists of (in the happy case):
  //   action: what action the backed requires next, or FINISHED
  //   target: the API endpoint for the next action
  //   parameters: SAML parameters for completing the FINISHED 'action'
  action: IdPAction;
  target: string;
  parameters?: SAMLParameters;
  authn_options?: LoginAuthnOptions;
  service_info?: ServiceInfo;
}

export type SAMLParameters = { SAMLResponse: string; RelayState?: string; used?: boolean };

export interface LoginAuthnOptions {
  freja_eidplus?: boolean;
  other_device?: boolean;
  password?: boolean;
  forced_username?: string;
  usernamepassword?: boolean;
  webauthn?: boolean;
  display_name?: string;
}

/**
 * @public
 * @function fetchNext
 * @desc     Request the backend to tell us what action to perform next in the login flow.
 */
export const fetchNext = createAsyncThunk<
  LoginNextResponse, // return type
  LoginNextRequest, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchNext", async (args, thunkAPI) => {
  // TODO: We also have the full next_url in config, should we remove that?
  return makeLoginRequest<LoginNextResponse>(thunkAPI, "next", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});
/*********************************************************************************************************************/

export interface LoginNewDeviceResponse {
  // The response from the /new_device API endpoint consists of (in the happy case):
  //   new_device: a string to store in local storage, and pass on any subsequent requests to /next
  new_device: string;
}

/**
 * @public
 * @function fetchNewDevice
 * @desc     Request the backend to initialise a new "known device", to recognise this device in the future.
 */
export const fetchNewDevice = createAsyncThunk<
  LoginNewDeviceResponse, // return type
  { ref: string }, // args type
  { dispatch: LoginAppDispatch; state: LoginRootState }
>("login/api/fetchNewDevice", async (args, thunkAPI) => {
  return makeLoginRequest<LoginNewDeviceResponse>(thunkAPI, "new_device", args)
    .then((response) => response.payload)
    .catch((err) => thunkAPI.rejectWithValue(err));
});

/*********************************************************************************************************************/
async function makeLoginRequest<T>(
  thunkAPI: RequestThunkAPI,
  endpoint: string,
  body?: KeyValues,
  data?: KeyValues
): Promise<PayloadAction<T, string, never, boolean>> {
  const state = thunkAPI.getState();

  if (!state.config.base_url) {
    throw new Error("Missing configuration base_url");
  }

  return makeGenericRequest<T>(thunkAPI, state.config.base_url, endpoint, body, data);
}
