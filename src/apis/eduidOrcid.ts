import { ApiResponse, eduIDApi } from "./common";

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
                url: ""
            }),
            extraOptions: { service: "orcid" }
        }),
        removeOrcid: builder.query<ApiResponse<OrcidResponse>, void>({
            query: () => ({
                url: "remove",
                body: {}
            }),
            extraOptions: { service: "orcid" }
        })
    })
})
