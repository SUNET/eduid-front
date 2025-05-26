import { RemoveWebauthnTokensRequest, RemoveWebauthnTokensResponse, RequestCredentialsResponse } from "apis/eduidSecurity";
import { ApiResponse, eduIDApi } from "./api";

interface UpdateOfficialUserDataResponse {
    message: string
}

interface PostDeleteAccountResponse {
  location: string;
}

export const securityApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        updateOfficialUserData: builder.query<ApiResponse<UpdateOfficialUserDataResponse>, void>({
            query: () => ({
                url: "refresh-official-user-data",
                body: {}
            }),
            extraOptions: { service: "security" }
        }),
        postDeleteAccount: builder.query<ApiResponse<PostDeleteAccountResponse>, void>({
            query: () => ({
                url: "terminate-account",
                body: {}
            }),
            extraOptions: { service: "security" }
        }),
        removeWebauthnToken: builder.query<ApiResponse<RemoveWebauthnTokensResponse>, RemoveWebauthnTokensRequest>({
            query: (args) => ({
                url: "webauthn/remove",
                body: {
                    credential_key: args.credential_key
                }
            }),
            extraOptions: { service: "security" }
        }),
        requestCredentials: builder.query<ApiResponse<RequestCredentialsResponse>, void>({
            query: () => ({
                url: "credentials"
            }),
            extraOptions: { service: "security" }
        })
    })
})

export default securityApi;