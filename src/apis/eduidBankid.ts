import { eduIDApi } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./eduidEidas";
import type { ApiResponse, AuthCommonRequest, AuthCommonResponse, VerifyCredentialRequest } from "./helpers/types";

export const bankIDApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    bankIDVerifyIdentity: builder.query<ApiResponse<AuthCommonResponse>, AuthCommonRequest>({
      query: (body) => ({
        url: "verify-identity",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyIdentity",
        },
      }),
      extraOptions: { service: "bankid" },
    }),
    bankIDMfaAuthenticate: builder.query<ApiResponse<AuthCommonResponse>, AuthCommonRequest>({
      query: (body) => ({
        url: "mfa-authenticate",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "loginMfaAuthn",
        },
      }),
      extraOptions: { service: "bankid" },
    }),
    bankIDVerifyCredential: builder.query<ApiResponse<AuthCommonResponse>, VerifyCredentialRequest>({
      query: (body) => ({
        url: "verify-credential",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyCredential",
        },
      }),
      extraOptions: { service: "bankid" },
    }),
    bankIDGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body,
      }),
      extraOptions: { service: "bankid" },
    }),
  }),
});
