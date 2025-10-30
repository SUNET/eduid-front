import { eduIDApi } from "./common";
import type { ApiResponse } from "./helpers/types";

export type WebauthnMethods = "eidas" | "freja" | "bankid";

interface EidasCommonRequest {
  frontend_state?: string; // frontend can pass something here (like a ref) and get it back after the authn flow
  frontend_action?: string; // this maps to config in the backend telling it where to return to after completion
  method: WebauthnMethods;
}

export interface EidasCommonResponse {
  location: string; // where to redirect the user for the authn flow
  credential_description: string;
}

export type VerifyIdentityRequest = EidasCommonRequest;

export type VerifyIdentityResponse = EidasCommonResponse;

export interface VerifyCredentialRequest extends EidasCommonRequest {
  credential_id: string;
}

export type VerifyCredentialResponse = EidasCommonResponse;

export type MfaAuthenticateRequest = EidasCommonRequest;

export type MfaAuthenticateResponse = EidasCommonResponse;

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
      query: (body) => ({
        url: "verify-identity",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyIdentity",
        },
      }),
      extraOptions: { service: "eidas" },
    }),
    eidasVerifyCredential: builder.query<ApiResponse<VerifyCredentialResponse>, VerifyCredentialRequest>({
      query: (body) => ({
        url: "verify-credential",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyCredential",
        },
      }),
      extraOptions: { service: "eidas" },
    }),
    eidasMfaAuthenticate: builder.query<ApiResponse<MfaAuthenticateResponse>, MfaAuthenticateRequest>({
      query: (body) => ({
        url: "mfa-authenticate",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "loginMfaAuthn",
        },
      }),
      extraOptions: { service: "eidas" },
    }),
    eidasGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body,
      }),
      extraOptions: { service: "eidas" },
    }),
  }),
});
