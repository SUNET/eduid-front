import { storeCsrfToken } from "commonConfig";
import { Middleware } from "redux";

/*
 * This middleware is used to save csrf token in redux store.
 */
export const csrfTokenMiddleware: Middleware = (store) => (next) => (action: any) => {
  if (action?.payload?.payload?.csrf_token !== undefined) {
    const state = store.getState();
    if (action.payload.payload.csrf_token !== state.config.csrf_token) {
      store.dispatch(storeCsrfToken(action.payload.payload.csrf_token));
    }
    const newAction = {
      ...action,
      payload: { ...action.payload, payload: { ...action.payload.payload, csrf_token: undefined } },
    };
    return next(newAction);
  }

  return next(action);
};

export default csrfTokenMiddleware;
