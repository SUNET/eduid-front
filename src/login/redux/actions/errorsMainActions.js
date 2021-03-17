export const APP_LOADED = "APP_LOADED";
export const UPDATE_CONFIG_DATA = "UPDATE_CONFIG_DATA";
export const UPDATE_CONFIG_DATA_FAIL = "UPDATE_CONFIG_DATA_FAIL";

export function appLoaded() {
  return {
    type: APP_LOADED
  };
}

export function updateErrorsConfigData() {
  return {
    type: UPDATE_CONFIG_DATA
  };
}

export function updateErrorsConfigDataFail(err) {
  return {
    type: UPDATE_CONFIG_DATA_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

