import * as actions from "../actions/getAllGroupMgmtDataActions";

const groupsData = {
  message: "",
  loading: true,
  data: [],
  payload: ""
};

let groupsReducer = (state = groupsData, action) => {
  switch (action.type) {
    case actions.GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS:
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
