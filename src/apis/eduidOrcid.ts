import { eduIDApi } from "./common";
import { GetStatusRequest, GetStatusResponse } from "./eduidEidas";
import type { ApiResponse, AuthCommonResponse } from "./helpers/types";

export interface OrcidInfo {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
}

interface OrcidResponse {
  orcid?: OrcidInfo;
}

export const orcidApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchOrcid: builder.query<ApiResponse<OrcidResponse>, void>({
      query: () => ({
        url: "",
      }),
      extraOptions: { service: "orcid" },
    }),
    removeOrcid: builder.query<ApiResponse<OrcidResponse>, void>({
      query: () => ({
        url: "remove",
        body: {},
      }),
      extraOptions: { service: "orcid" },
    }),
    connectOrcid: builder.query<ApiResponse<AuthCommonResponse>, void>({
      query: () => ({
        url: "connect-orcid",
        body: {
          frontend_action: "connectOrcid",
          frontend_state: "optional-opaque-string",
        },
      }),
      extraOptions: { service: "orcid" },
    }),
    orcidGetStatus: builder.query<ApiResponse<GetStatusResponse>, GetStatusRequest>({
      query: (body) => ({
        url: "get-status",
        body,
      }),
      extraOptions: { service: "orcid" },
    }),
  }),
});
