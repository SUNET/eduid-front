import * as actions from "./login/components/Notifications/Notifications_actions";

const notifyAndDispatch = () => next => action => {
  if (action.type.endsWith("SUCCESS") || action.type.endsWith("FAIL")) {
    if (action.error && action.payload) {
      console.log("this is action.payload", action.payload);
      console.log("this is action.error", action.error);
      if (
        action.payload.error &&
        action.payload.error.csrf_token !== undefined
      ) {
        const msg = "csrf.try-again";
        next(actions.eduidNotify(msg, "errors"));
      } 
      else if(action.payload.error.nin){
        const msg =
          action.payload.error.nin[0];
        next(actions.eduidNotify(msg, "errors"));
      }
      else {
        const msg =
          action.payload.errorMsg || action.payload.message || "error_in_form" ;
        next(actions.eduidNotify(msg, "errors"));
      }
      setTimeout(() => {
        window.scroll(0, 0);
      }, 100);
    } else if (action.payload && action.payload.message && !action.payload.message.includes("letter")) {
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
