import * as actions from "../actions/createInviteActions";

const invitesData = {
  message: "",
  invitesFromMe: [],
};

let invitesDataReducer = (state = invitesData, action) => {
  switch (action.type) {
    case actions.POST_GROUP_INVITE_INVITES_CREATE_SUCCESS:
      return {
        ...state,
        invitesFromMe: action.payload.outgoing,
        // member_of: action.payload.member_of,
        // owner_of: action.payload.owner_of,
      };
    default:
      return state;
  }
};

export default invitesDataReducer;
