import * as actions from "actions/Notifications";

const notifications = {
  messages: [],
  warnings: [],
  errors: []
};

const notificationsReducer = (state = notifications, action) => {
  switch (action.type) {
    case actions.NEW_NOTIFICATION:
      switch (action.payload.level) {
        case "errors":
          return {
            messages: [],
            warnings: [],
            errors: [
              { msg: action.payload.message, vals: action.payload.values }
            ]
          };
        case "warnings":
          const warnings = state.warnings.slice();
          warnings.push({
            msg: action.payload.message,
            vals: action.payload.values
          });
          return {
            ...state,
            warnings: warnings
          };
        case "messages":
          return {
            messages: [
              { msg: action.payload.message, vals: action.payload.values }
            ],
            warnings: [],
            errors: []
          };
        default:
          return state;
      }
    case actions.RM_NOTIFICATION:
      const msgs = state[action.payload.level].slice();
      msgs.splice(action.payload.index, 1);
      let newState = { ...state };
      newState[action.payload.level] = msgs;
      return newState;
    case actions.RM_ALL_NOTIFICATION:
      return {
        messages: [],
        warnings: [],
        errors: []
      };
    case "@@router/LOCATION_CHANGE":
      return {
        messages: [],
        warnings: [],
        errors: []
      };
    default:
      return state;
  }
};
export default notificationsReducer;
