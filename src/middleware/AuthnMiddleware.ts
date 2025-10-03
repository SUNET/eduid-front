import {
  createListenerMiddleware,
  isRejectedWithValue,
  ListenerEffectAPI,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ApiResponse, StateWithCommonConfig } from "apis/common";
import authnApi, { AuthenticateResponse } from "apis/eduidAuthn";
import { showNotification } from "slices/Notifications";

interface ErrorPayload {
  error: boolean;
  payload?: {
    error: {
      csrf_token: [string];
    };
  };
}

async function re_authenticate(
  api: ListenerEffectAPI<unknown, ThunkDispatch<unknown, unknown, UnknownAction>, unknown>
) {
  const authn = api.dispatch(authnApi.endpoints.authenticate.initiate({ frontend_action: "login" }));
  const { data } = await authn;
  if (data && (data as ApiResponse<AuthenticateResponse>).payload.location) {
    window.location.href = (data as ApiResponse<AuthenticateResponse>).payload.location;
  }
}

export const authnMiddleware = createListenerMiddleware();

authnMiddleware.startListening({
  matcher: isRejectedWithValue,
  effect: async (action, api) => {
    // re-implement logic from ts_common.ts, common.ts
    const response = action.payload as FetchBaseQueryError | ErrorPayload;
    if ("status" in response && response.status) {
      // handle HTTP responses
      if (response.status === 401) {
        await re_authenticate(api);
      } else if (typeof response.status === "number" && response.status >= 200 && response.status < 300) {
        // do nothing
      } else if (response.status === 0) {
        // ts_common.ts had handling of 0 status code
        const next = window.location.href;
        const state = api.getState() as StateWithCommonConfig;
        const url_base = state.config.authn_service_url;
        window.location.href = url_base + "/services/authn/login?next=" + encodeURIComponent(next);
      } else {
        api.dispatch(showNotification({ 
          message: `HTTP ${response.status} ${"error" in response ? response.error : ""}`, 
          level: "error" 
        }));
        setTimeout(() => {
          try {
            window.scroll(0, 0);
          } catch (error) {
            // window.scroll isn't available in the tests jsdom environment
          }
        }, 100);
      }
    } else if (
      "error" in response &&
      response.error &&
      response.payload?.error?.csrf_token &&
      response.payload?.error.csrf_token[0] === "CSRF failed to validate"
    ) {
      // re-authenticate
      await re_authenticate(api);
    }
  },
});

export default authnMiddleware;
