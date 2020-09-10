export const GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS =
         "GET_GROUP_MANAGEMENT_ALL_DATA_SUCCESS";
export const GET_GROUP_MANAGEMENT_ALL_DATA_FAIL =
  "GET_GROUP_MANAGEMENT_ALL_DATA_FAIL";

export function getAllGroupsDataFail(err) {
  return {
    type: GET_GROUP_MANAGEMENT_ALL_DATA_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
