import { ApiResponse, eduIDApi } from "./api";

interface UpdateOfficialUserDataResponse {
    message: string
}

export const securityApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        updateOfficialUserData: builder.query<ApiResponse<UpdateOfficialUserDataResponse>, void>({
            query: () => ({
                url: "refresh-official-user-data",
                body: {}
            }),
            extraOptions: { service: "security" }
        })
    })
})

export default securityApi;