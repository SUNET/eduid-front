import { createListenerMiddleware } from "@reduxjs/toolkit";
import authnSlice from "slices/Authn";

export const reAuthnMiddleware = createListenerMiddleware();

interface ReAuthnError {
    error: boolean;
    payload: {
        message: string;
    },
    meta: {
        frontend_action: string
    }
}

reAuthnMiddleware.startListening({
    predicate: (action) => {
        // api answers with an error and payload.message === "authn_status.must-authenticate"
        if ((action.payload as ReAuthnError)?.error &&
            (action.payload as ReAuthnError)?.payload?.message === "authn_status.must-authenticate")
                return true;
        return false;
    },
    effect: (action, api) => {
        // trigger reauthetication
        api.dispatch(authnSlice.actions.setFrontendActionAndState({ frontend_action: (action.payload as ReAuthnError).meta.frontend_action}));
        api.dispatch(authnSlice.actions.setReAuthenticate(true));
    }
})