export const CREATE_GROUP = "CREATE_GROUP";

//returned from API in response
export const POST_GROUP_MANAGEMENT_CREATE_SUCCESS =
  "POST_GROUP_MANAGEMENT_CREATE_SUCCESS";
export const POST_GROUP_MANAGEMENT_CREATE_FAIL = "POST_GROUP_MANAGEMENT_CREATE_FAIL";

export const createGroup = (groupName) => ({
  type: CREATE_GROUP,
  payload: {
    display_name: groupName,
  },
});

export const createGroupFail = (err) => {
  return {
    type: POST_GROUP_MANAGEMENT_CREATE_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
};
