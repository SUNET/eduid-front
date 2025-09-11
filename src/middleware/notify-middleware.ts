/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware } from "redux";
import { clearNotifications, showNotification } from "slices/Notifications";

const notifyAndDispatch: Middleware = () => (next: any) => (action: any) => {
  if (action.type.endsWith("FAIL")) {
    if (
      action.payload.message === "authn_status.must-authenticate" ||
      action.payload.message === "resetpw.captcha-already-completed"
    ) {
      next(clearNotifications());
    } else if (action.error && action.payload) {
      if (action.payload.error && action.payload.error.csrf_token !== undefined) {
        const msg = "csrf.try-again";
        next(showNotification({ message: msg, level: "error" }));
      } else if (action.payload.error && action.payload.error.nin) {
        const msg = action.payload.error.nin[0];
        next(showNotification({ message: msg, level: "error" }));
      } else {
        const msg = action.payload.errorMsg || action.payload.message || "error_in_form";
        next(showNotification({ message: msg, level: "error" }));
      }
      setTimeout(() => {
        try {
          window.scroll(0, 0);
        } catch (error) {
          // window.scroll isn't available in the tests jsdom environment
        }
      }, 100);
    } else if (action.payload && action.payload.message) {
      next(showNotification({ message: action.payload.message, level: "info" }));
      setTimeout(() => {
        try {
          window.scroll(0, 0);
        } catch (error) {
          // window.scroll isn't available in the tests jsdom environment
        }
      }, 100);
    }
    if (action.payload !== undefined) {
      delete action.payload.message;
      delete action.payload.errorMsg;
    }
  }
  // If the user cancels or times out, perform authentication
  else if (
    (action.type.endsWith("performAuthentication/rejected") || action.type.endsWith("createCredential/rejected")) &&
    action.error.name === "NotAllowedError"
  ) {
    next(showNotification({ message: action.error.message, level: "error" }));
    setTimeout(() => {
      try {
        window.scroll(0, 0);
      } catch (error) {}
    }, 100);
  }
  return next(action);
};
export default notifyAndDispatch;
