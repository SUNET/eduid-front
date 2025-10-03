/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware } from "redux";
import { showNotification } from "slices/Notifications";

const notifyAndDispatch: Middleware = () => (next: any) => (action: any) => {
  // Handle WebAuthn-specific errors (performAuthentication/createCredential rejections)
  // These are not API errors but client-side WebAuthn API errors
  if (
    (action.type.endsWith("performAuthentication/rejected") || action.type.endsWith("createCredential/rejected")) &&
    action.error?.name === "NotAllowedError"
  ) {
    next(showNotification({ message: action.error.message, level: "error" }));
    setTimeout(() => {
      try {
        window.scroll(0, 0);
      } catch (error) {
        // window.scroll isn't available in the tests jsdom environment
      }
    }, 100);
  }
  return next(action);
};
export default notifyAndDispatch;
