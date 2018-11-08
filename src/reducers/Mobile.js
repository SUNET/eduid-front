import * as actions from "actions/Mobile";

const mobileData = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
    confirming: '',
    phones: [],
    phone: '',
    code: '',
}

let mobileReducer = (state=mobileData, action) => {
    switch (action.type) {
    case actions.GET_MOBILES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.POST_MOBILE:
      return {
        ...state,
        is_fetching: true
      };
    case actions.POST_MOBILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.POST_MOBILE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    case actions.START_CONFIRMATION:
      return {
        ...state,
        confirming: action.payload.phone,
        is_fetching: true
      };

    case actions.STOP_CONFIRMATION:
      return {
        ...state,
        confirming: '',
        is_fetching: false,
        failed: false,
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
      };
    case actions.START_RESEND_MOBILE_CODE:
      return {
        ...state,
        resending: {
          is_fetching: true,
          failed: false,
          error: {},
          message: ''
        }
      };
    case actions.START_RESEND_MOBILE_CODE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: 'mobile.resend_success'
        }
      };
    case actions.START_RESEND_MOBILE_CODE_FAIL:
      return {
        ...state,
        resending: {
          is_fetching: false,
          failed: true,
          error: action.payload.error,
          message: ''
        }
      };
    case actions.START_VERIFY:
        return {
          ...state,
          code: action.payload.code,
          is_fetching: true,
        };

    case actions.POST_PHONE_VERIFY_SUCCESS:
        return {
            ...state,
            ...state.payload,
            is_fetching: false,
            phones: action.payload.phones
        };

    case actions.POST_PHONE_VERIFY_FAIL:
      return {
          ...state,
          ...state.payload,
          is_fetching: false,
          resending: {
              is_fetching: false,
              failed: true
            },
      };

    case actions.START_VERIFY_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,

      };

    case actions.POST_MOBILE_REMOVE:
      return {
        ...state,
        phone: action.payload.phone,
        is_fetching: true
      };
    case actions.POST_PHONE_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.POST_MOBILE_REMOVE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    case actions.POST_MOBILE_PRIMARY:
      return {
        ...state,
        phone: action.payload.phone,
        is_fetching: true
      }
    case actions.POST_MOBILE_PRIMARY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.POST_MOBILE_PRIMARY_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    case "@@redux-form/CHANGE":
      const form = {};
      if (action.meta.form === 'phones' && action.meta.field === 'number') {
          form.phone = action.payload;
      }
      return {
        ...state,
        ...form
      };
    default:
      return state;
  }
};
export default mobileReducer;
