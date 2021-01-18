import * as getDataActions from "../actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../actions/createGroupActions";

const groupsData = {
  message: "",
  loading: true,
  data: [],
  payload: "",
};

let groupsReducer = (state = groupsData, action) => {
  switch (action.type) {
    case createGroupActions.POST_GROUP_MANAGEMENT_CREATE_SUCCESS:
      return {
        ...state
      };
    case getDataActions.GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default groupsReducer;
