export const ACCEPT_INVITE_MEMBER = "ACCEPT_INVITE_MEMBER";
export const ACCEPT_INVITE_OWNER = "ACCEPT_INVITE_OWNER";

//returned from API in response
export const POST_GROUP_INVITE_INVITES_ACCEPT_SUCCESS = "POST_GROUP_INVITE_INVITES_ACCEPT_SUCCESS";
export const POST_GROUP_INVITE_INVITES_ACCEPT_FAIL = "POST_GROUP_INVITE_INVITES_ACCEPT_FAIL";

// Accept invite as member
export const acceptInviteMember = (groupId, inviteEmail) => ({
  type: ACCEPT_INVITE_MEMBER,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "member",
  },
});

// Accept invite as owner
export const acceptInviteOwner = (groupId, inviteEmail) => ({
  type: ACCEPT_INVITE_OWNER,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "owner",
  },
});

export function acceptInviteFail(err) {
  // console.log("This is create invite error:", err);
  return {
    type: POST_GROUP_INVITE_INVITES_ACCEPT_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
