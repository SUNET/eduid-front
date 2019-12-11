import * as actions from "actions/Emails";

const emailsData = {
  message: "",
  confirming: "",
  emails: [],
  email: "",
  code: ""
};

let emailsReducer = (state = emailsData, action) => {
  switch (action.type) {
    case actions.GET_EMAILS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.CHANGE_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_EMAIL:
      return {
        ...state
      };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.START_CONFIRMATION:
      return {
        ...state,
        confirming: action.payload.email
      };
    case actions.STOP_CONFIRMATION:
      return {
        ...state,
        confirming: "",
      };
    case actions.START_RESEND_EMAIL_CODE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.START_VERIFY:
      return {
        ...state,
        code: action.payload.code
      };
    case actions.POST_EMAIL_VERIFY_SUCCESS:
      return {
        ...state,
        emails: action.payload.emails
      };
    case actions.POST_EMAIL_VERIFY_FAIL:
      return {
        ...state,
        ...state.payload,
      };
    case actions.POST_EMAIL_REMOVE:
      return {
        ...state,
        email: action.payload.email
      };
    case actions.POST_EMAIL_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_EMAIL_PRIMARY:
      return {
        ...state,
        email: action.payload.email
      };
    case actions.POST_EMAIL_PRIMARY_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case "@@redux-form/CHANGE":
      const form = {};
      if (action.meta.form === "emails" && action.meta.field === "email") {
        form.email = action.payload;
      }
      return {
        ...state,
        ...form
      };
    default:
      return state;
  }
};
export default emailsReducer;
