import * as actions from "./Notifications_actions";

const notifications = {
  messages: [],
  errors: []
};

const notificationsReducer = (state = notifications, action) => {
  switch (action.type) {
    case actions.NEW_NOTIFICATION:
      switch (action.payload.level) {
        case "errors":
          return {
            messages: [],
            errors: [
              { msg: action.payload.message, vals: action.payload.values }
            ]
          };
        case "messages":
          return {
            messages: [
              { msg: action.payload.message, vals: action.payload.values }
            ],
            errors: []
          };
        default:
          return state;
      }
    case actions.RM_ALL_NOTIFICATION:
      return {
        messages: [],
        errors: []
      };
    case "@@router/LOCATION_CHANGE":
      return {
        messages: [],
        errors: []
      };
    default:
      return state;
  }
};
export default notificationsReducer;
