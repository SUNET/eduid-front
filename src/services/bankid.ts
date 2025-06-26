import { ApiResponse, eduIDApi } from "./api";
import { GetStatusRequest, GetStatusResponse, WebauthnMethods } from "./eidas";

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
    query: (args) => ({
        url: "verify-identity",
        body: {
          method: args.method,
          frontend_action: args.frontend_action ?? "verifyIdentity"
        }
      }),
      extraOptions: { service: "bankid" }
    }),
    bankIDMfaAuthenticate: builder.query<ApiResponse<MfaAuthenticateResponse>, MfaAuthenticateRequest>({
      query: (args) => ({
        url: "mfa-authenticate",
        body: {
          method: args.method,
          frontend_state: args.frontend_state,
          frontend_action: args.frontend_action ?? "loginMfaAuthn"
        }
      }),
      extraOptions: { service: "bankid" }
    }),
    bankIDVerifyCredential: builder.query<ApiResponse<VerifyCredentialResponse>,VerifyCredentialRequest>({
      query: (args) => ({
        url: "verify-credential",
        body: {
          method: args.method,
          credential_id: args.credential_id,
          frontend_action: args.frontend_action ?? "verifyCredential"
        }
      }),
      extraOptions: { service: "bankid" }
    }),
    bankIDGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (args) => ({
        url: "get-status",
        body: {
          authn_id: args.authn_id
        }
      }),
      extraOptions: { service: "bankid" }
    })
  })
})
