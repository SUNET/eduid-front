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
export interface VerifyIdentityRequest extends FrejaeIDCommonRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface VerifyIdentityResponse extends FrejaeIDCommonResponse {}

export const frejaeIDApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    frejaeIDVerifyIdentity: builder.query<ApiResponse<VerifyIdentityResponse>, VerifyIdentityRequest>({
      query: (body) => ({
        url: "verify-identity",
        body: {
          ...body,
          frontend_action: body.frontend_action ?? "verifyIdentity"
        }
      }),
      extraOptions: { service: "frejaeID" }
    }),
    frejaeIDGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body
      }),
      extraOptions: { service: "frejaeID" }
    })
  })
})

