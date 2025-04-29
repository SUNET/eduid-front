import { AllUserData } from "apis/eduidPersonalData";
import { ApiResponse, eduIDApi } from "./api";

export const personalDataApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        requestAllPersonalData: builder.query<ApiResponse<AllUserData>, void>({
            query: () => ({
                url: "all-user-data",
            }),
            extraOptions: { service: 'personalData' },
        })
    })
})

export default personalDataApi
