/*
 * Code and data structures for talking to the eduid-idp (login) backend microservice.
 */

import { createAction, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginAppDispatch, LoginRootState } from "login/app_init/initStore";
import { KeyValues, makeRequest, RequestThunkAPI } from "./common";

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
  expires_in: number;
  expires_max: number;
  display_id: string;
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

export type LoginUseOtherDevice2Request = UseOtherDevice2WithRef | UseOtherDevice2WithStateId;
export type LoginUseOtherDevice2Response = UseOtherDevice2Response | UseOtherDevice2ResponseLoggedIn;

/* Response types */
interface UseOtherDevice2ResponseCommon {
  device1_info: DeviceInfo;
  expires_in: number;
  expires_max: number;
  login_ref: string;
  short_code: string;
}

export type UseOtherDevice2Response = UseOtherDevice2ResponseCommon & {
  state: "IN_PROGRESS" | "ABORTED" | "FINISHED" | "DENIED";
};

export type UseOtherDevice2ResponseLoggedIn = UseOtherDevice2ResponseCommon & {
  state: "AUTHENTICATED";
  response_code: string;
};

export interface DeviceInfo {
  addr: string;
  proximity: "SAME" | "NEAR" | "FAR";
  description?: string;
}

/* Request types */
interface UseOtherDevice2WithRef {
  ref: string;
}

interface UseOtherDevice2WithStateId {
  state_id: string;
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

interface LoginNextRequest {
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
}

export type SAMLParameters = { SAMLResponse: string; RelayState?: string };

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
  // Since the whole body of the executor is enclosed in try/catch, this linter warning is excused.
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<PayloadAction<T, string, never, boolean>>(async (resolve, reject) => {
    try {
      const state = thunkAPI.getState();

      const response = await makeRequest<T>(thunkAPI, state.config.base_url, endpoint, body, data);

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
        thunkAPI.dispatch(loginFail(error.toString()));
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
export const loginFail = createAction("login_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
