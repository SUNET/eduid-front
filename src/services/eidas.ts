import { ApiResponse, eduIDApi } from "./api";

export type WebauthnMethods = "eidas" | "freja" | "bankid";

interface EidasCommonRequest {
  frontend_state?: string; // frontend can pass something here (like a ref) and get it back after the authn flow
  frontend_action?: string; // this maps to config in the backend telling it where to return to after completion
  method: WebauthnMethods;
}

interface EidasCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends EidasCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends EidasCommonResponse {}

export interface VerifyCredentialRequest extends EidasCommonRequest {
  credential_id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyCredentialResponse extends EidasCommonResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MfaAuthenticateRequest extends EidasCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MfaAuthenticateResponse extends EidasCommonResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetStatusRequest {
  authn_id: string;
}

export interface GetStatusResponse {
  frontend_action: string;
  frontend_state?: string;
  method: WebauthnMethods;
  error?: boolean;
  status?: string;
}

export const eidasApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    eidasVerifyIdentity: builder.query<ApiResponse<VerifyIdentityResponse>, VerifyIdentityRequest>({
      query: (args) => ({
        url: "verify-identity",
        body: {
          method: args.method,
          frontend_action: args.frontend_action ?? "verifyIdentity"
        }
      }),
      extraOptions: { service: "eidas" }
  }),
    eidasVerifyCredential: builder.query<ApiResponse<VerifyCredentialResponse>, VerifyCredentialRequest>({
      query: (args) => ({
        url: "verify-credential",
        body: {
          method: args.method,
          credential_id: args.credential_id,
          frontend_action: args.frontend_action ?? "verifyCredential"
        }
      }),
      extraOptions: { service: "eidas" }
    }),
    eidasMfaAuthenticate: builder.query<ApiResponse<MfaAuthenticateResponse>, MfaAuthenticateRequest>({
      query: (args) => ({
        url: "mfa-authenticate",
        body: {
          method: args.method,
          frontend_action: args.frontend_action ?? "loginMfaAuthn"
        }
      }),
      extraOptions: { service: "eidas" }
    }),
    eidasGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (args) => ({
        url: "get-status",
        body: {
          authn_id: args.authn_id
        }
      }),
      extraOptions: { service: "eidas" }
    })
  })
})