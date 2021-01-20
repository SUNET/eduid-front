export const POST_CREATE_GROUP = "POST_CREATE_GROUP";
//opens and closes create group panel
export const OPEN_CREATE_GROUP_PANEL = "OPEN_CREATE_GROUP_PANEL";
export const CLOSE_CREATE_GROUP_PANEL = "CLOSE_CREATE_GROUP_PANEL";
//returned from API in response
export const POST_GROUP_MANAGEMENT_CREATE_SUCCESS =
  "POST_GROUP_MANAGEMENT_CREATE_SUCCESS";
export const POST_GROUP_MANAGEMENT_CREATE_FAIL =
  "POST_GROUP_MANAGEMENT_CREATE_FAIL";

export const createGroup = (groupName) => ({
  type: POST_CREATE_GROUP,
  payload: {
    display_name: groupName,
  },
});

export const openCreateGroup = () => ({
  type: OPEN_CREATE_GROUP_PANEL,
});

export const closeCreateGroup = () => ({
  type: CLOSE_CREATE_GROUP_PANEL,
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
