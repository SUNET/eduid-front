import { ApiResponse, eduIDApi } from "./common";
import { GetStatusRequest, GetStatusResponse, WebauthnMethods } from "./eduidEidas";

interface BankIDCommonRequest {
  frontend_state?: string;
  frontend_action?: string;
  method: WebauthnMethods;
}
interface BankIDCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends BankIDCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends BankIDCommonResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MfaAuthenticateRequest extends BankIDCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MfaAuthenticateResponse extends BankIDCommonResponse {}

export interface VerifyCredentialRequest extends BankIDCommonRequest {
  credential_id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyCredentialResponse extends MfaAuthenticateResponse {}

export const bankIDApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    bankIDVerifyIdentity: builder.query<ApiResponse<VerifyIdentityResponse>, VerifyIdentityRequest>({
    query: (body) => ({
        url: "verify-identity",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyIdentity"
        }
      }),
      extraOptions: { service: "bankid" }
    }),
    bankIDMfaAuthenticate: builder.query<ApiResponse<MfaAuthenticateResponse>, MfaAuthenticateRequest>({
      query: (body) => ({
        url: "mfa-authenticate",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "loginMfaAuthn"
        }
      }),
      extraOptions: { service: "bankid" }
    }),
    bankIDVerifyCredential: builder.query<ApiResponse<VerifyCredentialResponse>,VerifyCredentialRequest>({
      query: (body) => ({
        url: "verify-credential",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyCredential"
        }
      }),
      extraOptions: { service: "bankid" }
    }),
    bankIDGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body
      }),
      extraOptions: { service: "bankid" }
    })
  })
})
