import { ApiResponse, eduIDApi } from "./api";

export interface JsConfigGetConfigResponse {
    [key: string]: unknown;
  }
  
export const jsConfigApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchJsConfig: builder.query<ApiResponse<JsConfigGetConfigResponse>,void>({
            query: () => ({
                url: ''
            }),
            extraOptions: { service: 'jsConfig'}
        })
    })
})