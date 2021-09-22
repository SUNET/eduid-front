export const GET_GROUP_INVITE_INVITES_INCOMING_SUCCESS =
  "GET_GROUP_INVITE_INVITES_INCOMING_SUCCESS";
export const GET_GROUP_INVITE_INVITES_INCOMING_FAIL =
  "GET_GROUP_INVITE_INVITES_INCOMING_FAIL";

export function getIncomingInvitesFail(err) {
  return {
    type: GET_GROUP_INVITE_INVITES_INCOMING_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
