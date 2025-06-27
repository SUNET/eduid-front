import { ApiResponse, eduIDApi } from "./common";

export interface LadokUniversityData {
  [key: string]: LadokUniversity;
}

export interface LadokUniversity {
  ladok_name: string;
  name: { [locale: string]: string; }; // mapping from locale name to name of university
}

// Data about a user in Ladok
export interface LadokData {
  external_id: string; // Ladok's unique and stable identifier for a user
  university: LadokUniversity; // The source of the information
}

export interface LadokUniversitiesResponse {
  universities: LadokUniversityData;
}

export interface LadokLinkUserRequest {
  ladok_name: string;
}

export interface LadokLinkUserResponse {
  ladok: LadokData;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LadokUnlinkUserResponse {}

export const ladokApi = eduIDApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchLadokUniversities: builder.query<ApiResponse<LadokUniversitiesResponse>, void>({
      query: () => ({
        url: "universities"
      }),
      extraOptions: { service: "ladok" }
    }),
    linkUser: builder.query<ApiResponse<LadokLinkUserResponse>, LadokLinkUserRequest>({
      query: (args) => ({
        url: "link-user",
        body: {
          ladok_name: args.ladok_name
        }
      }),
      extraOptions: { service: "ladok" }
    }),
    unlinkUser: builder.query<ApiResponse<LadokUnlinkUserResponse>, void>({
      query: () => ({
        url: "unlink-user",
        body: {}
      }),
      extraOptions: { service: "ladok" }
    })
  })
})

