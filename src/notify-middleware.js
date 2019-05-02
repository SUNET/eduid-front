import * as actions from "actions/Notifications";
import { profileFilled, PROFILE_FILLED } from "actions/Profile";

const calculateProfileFilled = state => {
  let filled = { max: 0, cur: 0, pending: [], pending_confirm: [] };
  ["given_name", "surname", "display_name", "language"].forEach(pdata => {
    filled.max += 1;
    if (state.personal_data.data[pdata]) {
      filled.cur += 1;
    } else {
      filled.pending.push(pdata);
    }
  });
  ["emails", "phones", "nins"].forEach(tab => {
    filled.max += 1;
    if (state[tab][tab] && state[tab][tab].length > 0) {
      if (state[tab][tab].filter(obj => obj.verified).length > 0) {
        filled.cur += 1;
      } else {
        filled.pending_confirm.push(tab);
      }
    } else {
      filled.pending.push(tab);
    }
  });
  return filled;
};

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
    if (!action.error) {
      const state = store.getState();
      if (state.personal_data !== undefined) {
        const filled = calculateProfileFilled(state);
        next(
          profileFilled(
            filled.max,
            filled.cur,
            filled.pending,
            filled.pending_confirm
          )
        );
      }
    }
  }
  return next(action);
};

export default notifyAndDispatch;
