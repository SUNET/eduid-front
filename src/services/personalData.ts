import { AllUserData, PreferencesData } from "apis/eduidPersonalData";
import { ApiResponse, eduIDApi } from "./api";

export const personalDataApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        requestAllPersonalData: builder.query<ApiResponse<AllUserData>, void>({
            query: () => ({
                url: "all-user-data",
            }),
            extraOptions: { service: 'personalData' },
        }),
        postSecurityKeyPreference: builder.mutation<ApiResponse<PreferencesData>, PreferencesData>({
            query: (args) => ({
                url: "preferences",
                body: {
                    always_use_security_key: args.always_use_security_key
                }
            }),
            extraOptions: { service: 'personalData' },
        })
    })
})

export default personalDataApi
