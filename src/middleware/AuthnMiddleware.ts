import { createListenerMiddleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { StateWithCommonConfig } from "apis/common";
import { ApiResponse, genericApiFail } from "services/api";
import authnApi, { AuthenticateResponse } from "services/authn";


export const authnMiddleware = createListenerMiddleware()

authnMiddleware.startListening({
    matcher: isRejectedWithValue,
    effect: async (action, api) => {
        // re-implement logic from ts_common.ts, common.ts
        const response = action.payload as Response
        if (response.status === 401) {
            const authn = api.dispatch(authnApi.endpoints.authenticate.initiate({ frontend_action: "login" }));
            const { data } = await authn
            if (data && (data as ApiResponse<AuthenticateResponse>).payload.location) {
                window.location.href = (data as ApiResponse<AuthenticateResponse>).payload.location
            }
        } else if (response.status >= 200 && response.status < 300)  {
            // do nothing
        } else if (response.status === 0) {
            // ts_common.ts had handling of 0 status code
            const next = window.location.href
            const state = api.getState() as StateWithCommonConfig;
            const url_base = state.config.authn_service_url
            window.location.href = url_base + "/services/authn/login?next=" + encodeURIComponent(next)
        } else {
            api.dispatch(genericApiFail(`HTTP ${response.status} ${response.statusText}`))
        }
    }
})


export default authnMiddleware;
