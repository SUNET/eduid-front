import { eduIDApi } from "./common";
import type { ApiResponse } from "./helpers/types";

export interface JsConfigGetConfigResponse {
  [key: string]: unknown;
}

export const jsConfigApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchJsConfig: builder.query<ApiResponse<JsConfigGetConfigResponse>, void>({
      query: () => ({
        url: "",
      }),
      extraOptions: { service: "jsConfig" },
    }),
  }),
});
