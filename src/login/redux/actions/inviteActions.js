export const CREATE_INVITE = "CREATE_INVITE";

//returned from API in response
export const CREATE_INVITE_SUCCESS = "POST_GROUP_INVITE_INVITES_CREATE_SUCCESS";
export const CREATE_INVITE_FAIL = "POST_GROUP_INVITE_INVITES_CREATE_FAIL";

// Create new invites
export const createGroup = (groupName) => ({
  type: CREATE_GROUP,
  payload: {
    display_name: groupName,
  },
});

export function createGroupFail(err) {
  console.log("This is create invite error:", err);
  return {
    type: CREATE_GROUP_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
