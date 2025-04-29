import { eduIDApi } from "./api";

export const authnApi = eduIDApi.injectEndpoints({
    endpoints: (builder) => ({
        authenticate: builder.query({
            query: () => ({
                url: "authenticate",
            }),
            extraOptions: { service: "authn" }
        })
    })
})

export default authnApi;
