import * as actions from "../actions/getAllDataGroupActions";

const groupsData = {
  message: "",
  loading: true,
  data: [],
  member_of: [],
  owner_of: [],
  payload: ""
};

let groupsReducer = (state = groupsData, action) => {
  switch (action.type) {
    case actions.GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        member_of: action.payload.member_of,
        owner_of: action.payload.owner_of,
      };
    default:
      return state;
  }
};

export default groupsReducer;
