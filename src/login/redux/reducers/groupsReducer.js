import * as getDataActions from "../actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../actions/createGroupActions";

const groupsData = {
  message: "",
  loading: true,
  data: [],
  createGroup: null,
  payload: "",
};

let groupsReducer = (state = groupsData, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default groupsReducer;
