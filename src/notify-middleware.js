import * as actions from "login/components/Notifications/Notifications_actions";

const notifyAndDispatch = store => next => action => {
  if (action.type.endsWith("SUCCESS") || action.type.endsWith("FAIL")) {
    if (action.error && action.payload) {
      if (
        action.payload.error &&
        action.payload.error.csrf_token !== undefined
      ) {
        const msg = "csrf.try-again";
        next(actions.eduidNotify(msg, "errors"));
      } else {
        const msg =
          action.payload.errorMsg || action.payload.message || "error_in_form";
        next(actions.eduidNotify(msg, "errors"));
      }
      setTimeout(() => {
        window.scroll(0, 0);
      }, 100);
    } else if (action.payload && action.payload.message) {
      next(actions.eduidNotify(action.payload.message, "messages"));
      setTimeout(() => {
        window.scroll(0, 0);
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
