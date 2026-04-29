import { eduIDApi } from "./common";
import { LoginUsernamePasswordResponse } from "./eduidLogin";
import {
  BeginRegisterWebauthnRequest,
  BeginRegisterWebauthnResponse,
  RegisterWebAuthnRequest,
  SecurityResponse,
} from "./eduidSecurity";
import type { ApiResponse } from "./helpers/types";

export interface SignupState {
  already_signed_up: boolean;
  email: {
    completed: boolean;
    address?: string;
    expires_time_left?: number;
    expires_time_max?: number;
    sent_at?: string;
    throttle_time_left?: number;
    throttle_time_max?: number;
    bad_attempts?: number;
    bad_attempts_max?: number;
  };
  invite: {
    user?: { given_name?: string; surname?: string; email?: string };
    code?: string;
    completed: boolean;
    finish_url?: string;
    initiated_signup: boolean;
    is_logged_in: boolean;
  };
  name: {
    given_name?: string;
    surname?: string;
  };
  tou: { completed: boolean; version?: string };
  captcha: { completed: boolean };
  credentials: {
    completed?: boolean;
    generated_password?: string;
    use_suggested_password?: string;
    custom_password?: string;
    webauthn_registered?: boolean;
    webauthn_description?: string;
    webauthn_is_discoverable?: boolean;
  };
  idp_request_ref?: string;
  user_created: boolean;
}

export interface SignupStatusResponse {
  state: SignupState;
}

export interface GetCaptchaResponse {
  captcha_img?: string;
  captcha_audio?: string;
}
export interface CaptchaRequest {
  internal_response?: string;
}

export interface AcceptToURequest {
  tou_accepted: boolean;
  tou_version: string;
}

export interface AcceptToUArgs {
  version: string;
}
export interface RegisterEmailRequest {
  email: string;
  given_name: string;
  surname: string;
}
export interface VerifyEmailRequest {
  verification_code: string;
}
export interface CreateUserRequest {
  use_suggested_password?: boolean;
  use_webauthn?: boolean;
  custom_password?: string;
}

export interface SignupReturnToAuthnRequest {
  ref: string;
}

export const signupApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchState: builder.query<ApiResponse<SignupStatusResponse>, void>({
      query: () => ({
        url: "state",
      }),
      extraOptions: { service: "signup" },
    }),
    getSignupCaptchaRequest: builder.query<ApiResponse<GetCaptchaResponse>, void>({
      query: () => ({
        url: "get-captcha",
        body: {},
      }),
      extraOptions: { service: "signup" },
    }),
    sendSignupCaptchaResponse: builder.query<ApiResponse<SignupStatusResponse>, CaptchaRequest>({
      query: (body) => ({
        url: "captcha",
        body,
      }),
      extraOptions: { service: "signup" },
    }),
    acceptToURequest: builder.query<ApiResponse<SignupStatusResponse>, AcceptToUArgs>({
      query: (body) => ({
        url: "accept-tou",
        body: {
          tou_accepted: true,
          tou_version: body.version,
        },
      }),
      extraOptions: { service: "signup" },
    }),
    registerEmailRequest: builder.query<ApiResponse<SignupStatusResponse>, RegisterEmailRequest>({
      query: (body) => ({
        url: "register-email",
        body,
      }),
      extraOptions: { service: "signup" },
    }),
    verifyEmailRequest: builder.query<ApiResponse<SignupStatusResponse>, VerifyEmailRequest>({
      query: (body) => ({
        url: "verify-email",
        body,
      }),
      extraOptions: { service: "signup" },
    }),
    getPasswordRequest: builder.query<ApiResponse<SignupStatusResponse>, void>({
      query: () => ({
        url: "get-password",
        body: {},
      }),
      extraOptions: { service: "signup" },
    }),
    createUserRequest: builder.query<ApiResponse<SignupStatusResponse>, CreateUserRequest>({
      query: (body) => ({
        url: "create-user",
        body: {
          custom_password: body.custom_password,
          use_suggested_password: Boolean(body.use_suggested_password),
          use_webauthn: Boolean(body.use_webauthn),
        },
      }),
      extraOptions: { service: "signup" },
    }),
    startRegisterWebauthn: builder.query<ApiResponse<BeginRegisterWebauthnResponse>, BeginRegisterWebauthnRequest>({
      query: (body) => ({
        url: "webauthn/register/begin",
        body,
      }),
      extraOptions: { service: "signup" },
    }),
    signupRegisterWebauthn: builder.query<ApiResponse<SecurityResponse>, RegisterWebAuthnRequest>({
      query: (body) => ({
        url: "webauthn/register/complete",
        body: {
          response: body.webauthn_attestation,
          description: body.description,
          clientExtensionResults: body.clientExtensionResults,
        },
      }),
      extraOptions: { service: "signup" },
    }),
    signupReturnToAuthn: builder.query<ApiResponse<SignupStatusResponse>, SignupReturnToAuthnRequest>({
      query: (body) => ({
        url: "return-to-auth",
        body: {
          ref: body.ref,
        },
      }),
      extraOptions: { service: "signup" },
    }),
    signupAuthn: builder.query<ApiResponse<LoginUsernamePasswordResponse>, SignupReturnToAuthnRequest>({
      query: (body) => ({
        url: "signup_auth",
        body: {
          ref: body.ref,
        },
      }),
      extraOptions: { service: "signup" },
    }),
  }),
});

export default signupApi;
