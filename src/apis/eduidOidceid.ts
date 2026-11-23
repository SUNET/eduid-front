import { eduIDApi } from "./common";
import type { GetStatusRequest, GetStatusResponse } from "./eduidEidas";
import type { ApiResponse, AuthCommonRequest, AuthCommonResponse, VerifyCredentialRequest } from "./helpers/types";

export const oidceidApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    oidceidVerifyIdentity: builder.query<ApiResponse<AuthCommonResponse>, AuthCommonRequest>({
      query: (body) => ({
        url: "verify-identity",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyIdentity",
        },
      }),
      extraOptions: { service: "oidceid" },
    }),
    oidceidVerifyCredential: builder.query<ApiResponse<AuthCommonResponse>, VerifyCredentialRequest>({
      query: (body) => ({
        url: "verify-credential",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyCredential",
        },
      }),
      extraOptions: { service: "oidceid" },
    }),
    oidceidMfaAuthenticate: builder.query<ApiResponse<AuthCommonResponse>, AuthCommonRequest>({
      query: (body) => ({
        url: "mfa-authenticate",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "loginMfaAuthn",
        },
      }),
      extraOptions: { service: "oidceid" },
    }),
    oidceidGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body,
      }),
      extraOptions: { service: "oidceid" },
    }),
    oidceidMfaRegister: builder.query<ApiResponse<AuthCommonResponse>, void>({
      query: () => ({
        url: "mfa-register",
        body: {
          method: "sverigeid",
          frontend_action: "signupExternalMfa",
        },
      }),
      extraOptions: { service: "oidceid" },
    }),
  }),
});
