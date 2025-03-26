import { storeCsrfToken } from "commonConfig";

/*
 * This middleware is used to save csrf token in redux store.
 */
export const csrfTokenMiddleware = (store:any) => (next:any) => (action: any) => {
    if (action?.payload?.payload?.csrf_token !== undefined) {
        const state = store.getState();
        if (action.payload.payload.csrf_token !== state.config.csrf_token) {
            store.dispatch(storeCsrfToken(action.payload.payload.csrf_token));
        }
        delete action.payload.payload.csrf_token;
    }
    
    return next(action);
}

export default csrfTokenMiddleware;