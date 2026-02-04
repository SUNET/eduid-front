import { eduIDApi } from "./common";
import type {
  ApiResponse,
  AuthCommonRequest,
  AuthCommonResponse,
  AuthMethod,
  VerifyCredentialRequest,
} from "./helpers/types";

export interface GetStatusRequest {
  authn_id: string;
}

export interface GetStatusResponse {
  frontend_action: string;
  frontend_state?: string;
  method: AuthMethod;
  error?: boolean;
  status?: string;
}

export const eidasApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    eidasVerifyIdentity: builder.query<ApiResponse<AuthCommonResponse>, AuthCommonRequest>({
      query: (body) => ({
        url: "verify-identity",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyIdentity",
        },
      }),
      extraOptions: { service: "eidas" },
    }),
    eidasVerifyCredential: builder.query<ApiResponse<AuthCommonResponse>, VerifyCredentialRequest>({
      query: (body) => ({
        url: "verify-credential",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyCredential",
        },
      }),
      extraOptions: { service: "eidas" },
    }),
    eidasMfaAuthenticate: builder.query<ApiResponse<AuthCommonResponse>, AuthCommonRequest>({
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
