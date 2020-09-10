import * as actions from "../actions/getAllGroupsDataActions";

const groupsData = {
  message: "",
  data: {},
};

let groupsDataReducer = (state = groupsData, action) => {
  switch (action.type) {
    case actions.GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS:
      return {
        ...state,
        data: { ...action.payload },
      };
    default:
      return state;
  }
};

export default groupsDataReducer;
