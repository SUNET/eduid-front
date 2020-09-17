export const CREATE_GROUP = "CREATE_GROUP";

//returned from API in response
export const CREATE_GROUP_SUCCESS = "POST_GROUP_MANAGEMENT_CREATE_SUCCESS";
export const CREATE_GROUP_FAIL = "POST_GROUP_MANAGEMENT_CREATE_FAIL";

export const createGroup = (groupName) => ({
  type: CREATE_GROUP,
  payload: {
    display_name: groupName,
  },
});

export function createGroupFail(err) {
  console.log("This is create group error:", err);
  return {
    type: CREATE_GROUP_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
