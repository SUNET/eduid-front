import { webauthnAssertion } from "helperFunctions/navigatorCredential";
import { ApiResponse, eduIDApi } from "./common";
import { CaptchaRequest, GetCaptchaResponse } from "./eduidSignup";

interface ResetPasswordCaptchaResponse {
  captcha_completed: boolean;
}

export interface NewPasswordRequest {
  email_code: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewPasswordResponse {}

export interface NewPasswordExtraSecurityKeyRequest extends NewPasswordRequest, webauthnAssertion {}

/* phone is unused and kept for backwards compatibility */
export interface NewPasswordExtraSecurityPhoneRequest {
  email_code: string;
  password: string;
  phone_code: string;
}

export interface RequestPhoneCodeRequest {
  email_code: string;
  phone_index?: number;
}

export interface RequestPhoneCodeResponse {
  message: string;
}
/* phone is unused and kept for backwards compatibility */

export interface VerifyCodeRequest {
  email_code: string;
}

export interface VerifyCodeResponse {
  suggested_password: string;
  email_code: string;
  email_address: string;
  extra_security: ExtraSecurityAlternatives;
  success: boolean;
  zxcvbn_terms: string[];
}

export interface ExtraSecurityAlternatives {
  external_mfa?: boolean;
  phone_numbers?: ExtraSecurityPhoneWithIndex[];
  tokens?: ExtraSecurityTokens;
}

export interface ExtraSecurityPhoneWithIndex {
  number: string;
  index: number;
}

export interface ExtraSecurityTokens {
  webauthn_options?: string;
}

export interface RequestEmailLinkRequest {
  email: string;
}

export interface RequestEmailLinkResponse {
  email: string;
  email_code_timeout: number; // How many seconds the link in the e-mail is valid. Currently unused in frontend.
  throttled_seconds: number;
  throttled_max: number;
}

export const resetPasswordApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    getResetPasswordCaptchaRequest: builder.query<ApiResponse<GetCaptchaResponse>, void>({
      query: () => ({
        url: "get-captcha",
        body: {}
      }),
      extraOptions: { service: "resetPassword" }
    }),
    sendResetPasswordCaptchaResponse: builder.query<ApiResponse<ResetPasswordCaptchaResponse>, CaptchaRequest>({
      query: (body) => ({
        url: "captcha",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    postSetNewPasswordExternalMfa: builder.query<ApiResponse<NewPasswordResponse>, NewPasswordRequest>({
      query: (body) => ({
        url: "new-password-extra-security-external-mfa",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    postSetNewPasswordExtraSecurityToken: builder.query<ApiResponse<NewPasswordResponse>, NewPasswordExtraSecurityKeyRequest>({
      query: (body) => ({
        url: "new-password-extra-security-token",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    postSetNewPasswordExtraSecurityPhone: builder.query<ApiResponse<NewPasswordResponse>, NewPasswordExtraSecurityPhoneRequest>({
      query: (body) => ({
        url: "new-password-extra-security-phone",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    requestPhoneCodeForNewPassword: builder.query<ApiResponse<RequestPhoneCodeResponse>, RequestPhoneCodeRequest>({
      query: (body) => ({
        url: "extra-security-phone",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    postSetNewPassword: builder.query<ApiResponse<NewPasswordResponse>, NewPasswordRequest>({
      query: (body) => ({
        url: "new-password",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    verifyEmailLink: builder.query<ApiResponse<VerifyCodeResponse>, VerifyCodeRequest>({
      query: (body) => ({
        url: "verify-email",
        body
      }),
      extraOptions: { service: "resetPassword" }
    }),
    requestEmailLink: builder.query<ApiResponse<RequestEmailLinkResponse>, RequestEmailLinkRequest>({
      query: (body) => ({
        url: "",
        body
      }),
      extraOptions: { service: "resetPassword" }
    })
  })
})