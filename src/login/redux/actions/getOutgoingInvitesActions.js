export const GET_GROUP_INVITE_INVITES_OUTGOING_SUCCESS =
  "GET_GROUP_INVITE_INVITES_OUTGOING_SUCCESS";
export const GET_GROUP_INVITE_INVITES_OUTGOING_FAIL =
  "GET_GROUP_INVITE_INVITES_OUTGOING_FAIL";

export function getAllOutgoingInvitesFail(err) {
  return {
    type: GET_GROUP_INVITE_INVITES_OUTGOING_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

