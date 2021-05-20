import * as getDataActions from "../actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../actions/createGroupActions";
import * as addDataToStore from "../actions/addDataToStoreActions";
import * as deleteGroupActions from "../actions/deleteGroupActions";

const groupsData = {
  hasCookie: null,
  message: "",
  loading: true,
  data: [],
  createGroup: null,
  navId: "create-invite",
  payload: "",
};

let groupsReducer = (state = groupsData, action) => {
  switch (action.type) {
    case addDataToStore.ADD_COOKIE_STATUS_TO_STORE:
      return {
        ...state,
        hasCookie: action.payload.hasCookie,
      };
    case addDataToStore.ADD_NAVID_TO_STORE:
      return {
        ...state,
        navId: action.payload.navId,
      };
    case createGroupActions.POST_GROUP_MANAGEMENT_CREATE_SUCCESS:
      return {
        ...state,
        data: [...action.payload.groups],
      };
    case createGroupActions.OPEN_CREATE_GROUP_PANEL:
      return {
        ...state,
        createGroup: true,
      };
    case createGroupActions.CLOSE_CREATE_GROUP_PANEL:
      return {
        ...state,
        createGroup: false,
      };
    case getDataActions.GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...action.payload.groups],
      };
    case deleteGroupActions.POST_GROUP_MANAGEMENT_DELETE_SUCCESS:
      return {
        ...state,
        data: [...action.payload.groups],
      };
    default:
      return state;
  }
};

export default groupsReducer;
