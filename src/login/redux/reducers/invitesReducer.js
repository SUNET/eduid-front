import * as createInviteActions from "../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../actions/getOutgoingInvitesActions";

const invitesData = {
  message: "",
  invitesFromMe: [],
};

let invitesDataReducer = (state = invitesData, action) => {
  switch (action.type) {
    case createInviteActions.POST_GROUP_INVITE_INVITES_CREATE_SUCCESS:
      return {
        ...state,
        // invitesFromMe: action.payload.outgoing,
        // member_of: action.payload.member_of,
        // owner_of: action.payload.owner_of,
      };
    case getOutgoingInvitesActions.GET_GROUP_INVITE_INVITES_OUTGOING_SUCCESS:
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
