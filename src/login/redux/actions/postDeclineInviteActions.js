export const DECLINE_INVITE_MEMBER = "DECLINE_INVITE_MEMBER";
export const DECLINE_INVITE_OWNER = "DECLINE_INVITE_OWNER";

// returned from API in response
export const POST_GROUP_INVITE_INVITES_DECLINE_SUCCESS = "POST_GROUP_INVITE_INVITES_DECLINE_SUCCESS";
export const POST_GROUP_INVITE_INVITES_DECLINE_FAIL = "POST_GROUP_INVITE_INVITES_DECLINE_FAIL";

// Decline invite as member
export const declineInviteMember = (groupId, inviteEmail) => ({
  type: DECLINE_INVITE_MEMBER,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "member",
  },
});

// Decline invite as owner
export const declineInviteOwner = (groupId, inviteEmail) => ({
  type: DECLINE_INVITE_OWNER,
  payload: {
    group_identifier: groupId,
    email_address: inviteEmail,
    role: "owner",
  },
});

export function declineInviteFail(err) {
  return {
    type: POST_GROUP_INVITE_INVITES_DECLINE_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
