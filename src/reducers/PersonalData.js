import * as actions from "actions/PersonalData";

const personalData = {
  message: "",
  data: {
    eppn: null,
    given_name: null,
    surname: null,
    display_name: null,
    language: null,
  },
};

let personalDataReducer = (state = personalData, action) => {
  switch (action.type) {
    case actions.GET_USERDATA_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case actions.GET_ALL_USERDATA_FAIL:
      return {
        ...state,
        message: action.payload.message,
      };
    case actions.CHANGE_USERDATA:
      if (!action.payload.eppn) {
        action.payload.eppn = state.data.eppn;
      }
      return {
        ...state,
        data: { ...action.payload },
      };
    case actions.POST_USERDATA_SUCCESS:
      if (!action.payload.eppn) {
        action.payload.eppn = state.data.eppn;
      }
      return {
        ...state,
        data: { ...action.payload },
      };
    case actions.POST_USERDATA_FAIL:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default personalDataReducer;
