import { AllUserData } from "apis/eduidPersonalData";
import { ApiResponse, eduIDApi } from "./api";


interface UserPreferences {
    always_use_security_key: boolean;
}

export interface UserNameSchema {
    given_name: string;
    chosen_given_name?: string;
    surname: string;
    legal_name?: string;
}

export const personalDataApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        postUserName: builder.mutation<ApiResponse<UserNameSchema>, UserNameSchema>({
            query: (args) => ({
                url: "user/name",
                body: {
                    given_name: args.given_name,
                    chosen_given_name: args.chosen_given_name,
                    surname: args.surname,
                    legal_name: args.legal_name,
                }
            }),
            extraOptions: { service: 'personalData' },
        }),
        requestAllPersonalData: builder.query<ApiResponse<AllUserData>, void>({
            query: () => ({
                url: "all-user-data",
            }),
            extraOptions: { service: 'personalData' },
        }),
        postSecurityKeyPreference: builder.mutation<ApiResponse<UserPreferences>, UserPreferences>({
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
