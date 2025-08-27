import { webauthnAssertion } from "helperFunctions/navigatorCredential";
import { ApiResponse, eduIDApi } from "./common";

export interface LoginAbortRequest {
  ref: string;
}

export interface LoginAbortResponse {
  finished: boolean;
}

export interface LoginUsernamePasswordRequest {
  ref: string;
  username?: string;
  password: string;
}

export interface LoginUsernamePasswordResponse {
  finished: boolean;
}

export interface LoginToURequest {
  ref: string;
  user_accepts?: string; // version the user accepts
  versions?: string[]; // versions in this bundle
}

export interface LoginToUResponse {
  finished: boolean;
  version?: string; // the version the backend wants the user to accept
}

export interface LoginLogoutRequest {
  ref?: string;
}

export interface LoginLogoutResponse {
  finished: boolean;
  location?: string;
}

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

export interface LoginNextRequest {
  ref: string;
  this_device?: string;
  remember_me: boolean;
}

export type IdPAction = "NEW_DEVICE" | "OTHER_DEVICE" | "USERNAMEPASSWORD" | "MFA" | "TOU" | "FINISHED" | "PASSWORD";

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
  display_name?: string;
  forced_username?: string;
  swedish_eid?: boolean;
  has_session?: boolean;
  other_device?: boolean;
  password?: boolean;
  usernamepassword?: boolean;
  webauthn?: boolean;
  verified_phone_number?: boolean;
}

export interface LoginNewDeviceResponse {
  // The response from the /new_device API endpoint consists of (in the happy case):
  //   new_device: a string to store in local storage, and pass on any subsequent requests to /next
  new_device: string;
}

export interface LoginNewDeviceRequest {
  ref: string;
}

export interface LoginMfaAuthRequest {
  ref: string;
  webauthn_response?: webauthnAssertion;
  this_device?: string;
}

export interface LoginMfaAuthResponse {
  // The response from the /mfa_auth API endpoint consists of (in the happy case):
  //   finished: true if backend thinks mfa_auth requirement is satisfied
  //   webauthn_options: base64-encoded webauthn challenge to pass to navigator.credentials.get()
  finished: boolean;
  webauthn_options?: string;
}

export const loginApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAbort: builder.query<ApiResponse<LoginAbortResponse>, LoginAbortRequest>({
      query: (body) => ({
        url: "abort",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchUsernamePassword: builder.query<ApiResponse<LoginUsernamePasswordResponse>, LoginUsernamePasswordRequest>({
      query: (body) => ({
        url: "pw_auth",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchToU: builder.query<ApiResponse<LoginToUResponse>, LoginToURequest>({
      query: (body) => ({
        url: "tou",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchLogout: builder.query<ApiResponse<LoginLogoutResponse>, LoginLogoutRequest>({
      query: (body) => ({
        url: "logout",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchErrorInfo: builder.query<ApiResponse<LoginErrorInfoResponse>, void>({
      query: () => ({
        url: "error_info",
        body: {}
      }),
      extraOptions: { service: "login" }
    }),
    fetchUseOtherDevice1: builder.query<ApiResponse<LoginUseOtherDevice1Response>, LoginUseOtherDevice1Request>({
      query: (body) => ({
        url: "use_other_1",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchUseOtherDevice2: builder.query<ApiResponse<LoginUseOtherDevice2Response>, LoginUseOtherDevice2Request>({
      query: (body) => ({
        url: "use_other_2",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchNext: builder.query<ApiResponse<LoginNextResponse>, LoginNextRequest>({
      query: (body) => ({
        url: "next",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchNewDevice: builder.query<ApiResponse<LoginNewDeviceResponse>, LoginNewDeviceRequest>({
      query: (body) => ({
        url: "new_device",
        body
      }),
      extraOptions: { service: "login" }
    }),
    fetchMfaAuth: builder.query<ApiResponse<LoginMfaAuthResponse>, LoginMfaAuthRequest>({
      query: (body) => ({
        url: "mfa_auth",
        body
      }),
      extraOptions: { service: "login" }
    })
  })
})