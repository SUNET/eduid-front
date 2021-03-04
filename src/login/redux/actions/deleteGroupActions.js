export const POST_DELETE_GROUP = "POST_DELETE_GROUP";
//returned from API in response
export const POST_GROUP_MANAGEMENT_DELETE_SUCCESS =
  "POST_GROUP_MANAGEMENT_DELETE_SUCCESS";
export const POST_GROUP_MANAGEMENT_DELETE_FAIL =
  "POST_GROUP_MANAGEMENT_DELETE_FAIL";

export const deleteGroup = (groupId) => ({
  type: POST_DELETE_GROUP,
  payload: {
    group_identifier: groupId,
  },
});

export const deleteGroupFail = (err) => {
  return {
    type: POST_GROUP_MANAGEMENT_DELETE_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
};
