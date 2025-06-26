import { ApiResponse, eduIDApi } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./eduidEidas";

interface FrejaeIDCommonRequest {
  frontend_action?: string;
  method: string;
}

interface FrejaeIDCommonResponse {
  location: string; // where to redirect the user for the authn flow
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityRequest extends FrejaeIDCommonRequest { }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends FrejaeIDCommonResponse { }

export const frejaeIDApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    frejaeIDVerifyIdentity: builder.query<ApiResponse<VerifyIdentityResponse>, VerifyIdentityRequest>({
      query: (args) => ({
        url: "verify-identity",
        body: {
          method: args.method,
          frontend_action: args.frontend_action ?? "verifyIdentity"
        }
      }),
      extraOptions: { service: "frejaeID" }
    }),
    frejaeIDGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (args) => ({
        url: "get-status",
        body: {
          authn_id: args.authn_id
        }
      }),
      extraOptions: { service: "frejaeID" }
    })
  })
})

