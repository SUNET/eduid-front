import * as createInviteActions from "../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../actions/getOutgoingInvitesActions";

const invitesData = {
  message: "",
  invitesFromMe: [],
  updatedInvite: {},
};

let invitesDataReducer = (state = invitesData, action) => {
  switch (action.type) {
    case createInviteActions.POST_GROUP_INVITE_INVITES_CREATE_SUCCESS:
      return {
        ...state,
        invitesFromMe: [...action.payload.outgoing],
      };
    case getOutgoingInvitesActions.GET_GROUP_INVITE_INVITES_OUTGOING_SUCCESS:
      return {
        ...state,
        invitesFromMe: [...action.payload.outgoing],
      };
    case "@@redux-form/CHANGE": {
      let checkboxName = action.meta.field;
      let trimmedEmail = checkboxName.split("-")[0];
      let role = checkboxName.split("-")[1];
      if (role === "member") {
        state.updatedInvite.member = action.payload;
      } else if (role === "owner") {
        state.updatedInvite.owner = action.payload;
      }
      return {
        ...state,
        updatedInvite: {
          ...state.updatedInvite,
          email: trimmedEmail,
        },
      };
    }
    default:
      return state;
  }
};

export default invitesDataReducer;
