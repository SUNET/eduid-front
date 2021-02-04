export const CREATE_INVITE_MEMBER = "CREATE_INVITE_MEMBER";
export const CREATE_INVITE_OWNER = "CREATE_INVITE_OWNER";

//returned from API in response
export const POST_GROUP_INVITE_INVITES_CREATE_SUCCESS =
  "POST_GROUP_INVITE_INVITES_CREATE_SUCCESS";
export const POST_GROUP_INVITE_INVITES_CREATE_FAIL =
  "POST_GROUP_INVITE_INVITES_CREATE_FAIL";

//Create new invite for member
export const createInviteMember = (groupId, inviteEmail) => ({
  type: CREATE_INVITE_MEMBER,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "member",
  },
});

// Create new invite for owner
export const createInviteOwner = (groupId, inviteEmail) => ({
  type: CREATE_INVITE_OWNER,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "owner",
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
