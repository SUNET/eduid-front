export const NEW_NOTIFICATION = "NEW_NOTIFICATION";
export const RM_ALL_NOTIFICATION = "RM_ALL_NOTIFICATION";

export function eduidNotify(msg, level, values = null) {
  return {
    type: NEW_NOTIFICATION,
    payload: {
      message: msg,
      level: level,
      values: values
    }
  };
}

export function eduidRMAllNotify() {
  return {
    type: RM_ALL_NOTIFICATION
  };
}
