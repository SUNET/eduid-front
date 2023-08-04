import { showNotification } from "slices/Notifications";

showNotification;
const notifyAndDispatch = () => (next: any) => (action: any) => {
  if (action.type.endsWith("FAIL")) {
    if (action.error && action.payload) {
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
  return next(action);
};
export default notifyAndDispatch;
