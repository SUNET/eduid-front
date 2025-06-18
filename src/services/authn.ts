import { GetStatusRequest, GetStatusResponse } from "services/eidas";
import { ApiResponse, eduIDApi } from "./api";

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
            query: (args) => ({
                url: "authenticate",
                body: {
                    frontend_action: args.frontend_action,
                    frontend_state: args.frontend_state
                }
            }),
            extraOptions: { service: "authn" }
        }),
        authnGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
            query: (args) => ({
                url: "get-status",
                body: {
                    authn_id: args.authn_id
                }
            }),
            extraOptions: { service: "authn" }
        })
    })
})

export default authnApi;
