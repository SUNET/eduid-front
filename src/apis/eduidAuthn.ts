import { GetStatusRequest, GetStatusResponse } from "apis/eduidEidas";
import { eduIDApi } from "./common";
import type { ApiResponse } from "./helpers/types";

export interface AuthenticateResponse {
  location: string;
}

export interface AuthenticateRequest {
  frontend_action?: string;
  frontend_state?: string;
}

export const authnApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.query<ApiResponse<AuthenticateResponse>, AuthenticateRequest>({
      query: (body) => ({
        url: "authenticate",
        body,
      }),
      extraOptions: { service: "authn" },
    }),
    authnGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body,
      }),
      extraOptions: { service: "authn" },
    }),
  }),
});

export default authnApi;
