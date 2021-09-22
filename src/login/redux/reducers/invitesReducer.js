import * as createInviteActions from "../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../actions/getOutgoingInvitesActions";
import * as getIncomingInvitesActions from "../actions/getIncomingActions";

const invitesData = {
  message: "",
  invitesFromMe: [],
  invitesToMe: [],
};

let invitesDataReducer = (state = invitesData, action) => {
  switch (action.type) {
    case createInviteActions.POST_GROUP_INVITE_INVITES_CREATE_SUCCESS:
      return {
        ...state,
        invitesFromMe: [...action.payload.outgoing],
      };
    case getIncomingInvitesActions.GET_GROUP_INVITE_INVITES_INCOMING_SUCCESS:
      return {
        ...state,
        invitesToMe: [...action.payload.incoming],
      };
    case getOutgoingInvitesActions.GET_GROUP_INVITE_INVITES_OUTGOING_SUCCESS:
      return {
        ...state,
        invitesFromMe: [...action.payload.outgoing],
      };
    default:
      return state;
  }
};

export default invitesDataReducer;
