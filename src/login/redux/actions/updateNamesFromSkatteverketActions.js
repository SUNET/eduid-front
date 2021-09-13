export const UPDATE_NAMES_FROM_SKATTEVERKET = "UPDATE_NAMES_FROM_SKATTEVERKET";
export const POST_SECURITY_REFRESH_OFFICIAL_USER_DATA_SUCCESS =
  "POST_SECURITY_REFRESH_OFFICIAL_USER_DATA_SUCCESS";
export const POST_SECURITY_REFRESH_OFFICIAL_USER_DATA_FAIL =
  "POST_SECURITY_REFRESH_OFFICIAL_USER_DATA_FAIL";

export function updateNamesFromSkatteverket() {
  return {
    type: UPDATE_NAMES_FROM_SKATTEVERKET,
  };
}

export function updateNamesFromSkatteverketFail(err) {
  console.log("err", err);
  return {
    type: POST_SECURITY_REFRESH_OFFICIAL_USER_DATA_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
