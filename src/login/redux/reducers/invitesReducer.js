import * as actions from "../actions/inviteActions";

const invitesData = {
  message: "",
  payload: "",
};

let invitesDataReducer = (state = invitesData, action) => {
  switch (action.type) {
    case actions.POST_GROUP_INVITE_INVITES_CREATE_SUCCESS:
      return {
        ...state,
        payload: "update the invites list",
      };
    default:
      return state;
  }
};

export default invitesDataReducer;
