import * as actions from "actions/Nins";

const ninState = {
  message: "",
  nin: "",
  rmNin: "",
  nins: [],
  showNinProfile: false,
  showNinIdentity: false
};

let ninsReducer = (state = ninState, action) => {
  switch (action.type) {
    case actions.SHOW_NIN_PROFILE:
      return {
        ...state,
        showNinProfile: !state.showNinProfile
      };
      case actions.SHOW_NIN_IDENTITY:
        return {
          ...state,
          showNinIdentity: !state.showNinIdentity
        };
    case actions.GET_NINS_SUCCESS:{
      const nins = action.payload.nins,
        nin = nins.length ? nins[0].number : state.nin;
      return {
        ...state,
        ...action.payload,
        nin: nin
      };
    }
    case actions.GET_NINS_FAIL:
      return {
        ...state,
        message: action.payload.message
      };
    case actions.POST_NIN_REMOVE:
      return {
        ...state,
        rmNin: action.payload.nin
      };
    case actions.POST_NIN_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.CHANGE_NINDATA:
      return {
        ...state,
        data: { ...action.payload }
      };
    case "@@redux-form/CHANGE": {
      const form = {};
      if (
        action.meta.form === "nins" &&
        action.meta.field === "nin"
      ) {
        form.nin = action.payload;
      }
      return {
        ...state,
        ...form
      };
    }
    default:
      return state;
  }
};
export default ninsReducer;
