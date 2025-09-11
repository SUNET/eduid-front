import { storeCsrfToken } from "commonConfig";
import { Middleware } from "redux";

/*
 * This middleware is used to save csrf token in redux store.
 */
export const csrfTokenMiddleware: Middleware = (store) => (next) => (action) => {
  if (
    // add big typing guard as action is type unknown
    typeof action === "object" &&
    action !== null &&
    "payload" in action &&
    typeof action.payload === "object" &&
    action.payload !== null &&
    "payload" in action.payload &&
    typeof action.payload.payload === "object" &&
    action.payload.payload !== null &&
    "csrf_token" in action.payload.payload &&
    typeof action.payload.payload.csrf_token === "string"
  ) {
    const state = store.getState();
    if (action.payload.payload.csrf_token !== state.config.csrf_token) {
      store.dispatch(storeCsrfToken(action.payload.payload.csrf_token));
    }
    delete action.payload.payload.csrf_token;
  }

  return next(action);
};

export default csrfTokenMiddleware;
