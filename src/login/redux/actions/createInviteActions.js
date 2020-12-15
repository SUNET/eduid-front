export const CREATE_INVITE = "CREATE_INVITE";
export const GET_ALL_OUTGOING_INVITES = "GET_ALL_OUTGOING_INVITES";

//returned from API in response
export const POST_GROUP_INVITE_INVITES_CREATE_SUCCESS =
  "POST_GROUP_INVITE_INVITES_CREATE_SUCCESS";
export const POST_GROUP_INVITE_INVITES_CREATE_FAIL =
  "POST_GROUP_INVITE_INVITES_CREATE_FAIL";

// Get all outgoing invites
export const getAllOutgoingInvites = () => ({
  type: GET_ALL_OUTGOING_INVITES,
});

// Create new invites
export const createInvite = (inviteEmail, groupId) => ({
  type: CREATE_INVITE,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "member",
  },
});

export function createInviteFail(err) {
  console.log("This is create invite error:", err);
  return {
    type: POST_GROUP_INVITE_INVITES_CREATE_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
