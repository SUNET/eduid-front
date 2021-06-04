export const LOAD_DATA_REQUEST = "LOAD_DATA_REQUEST";
export const LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS";
export const LOAD_DATA_FAIL = "LOAD_DATA_FAIL";

export const loadingData = () => ({
  type: LOAD_DATA_REQUEST,
});

export const loadingDataSuccess = () => ({
  type: LOAD_DATA_SUCCESS,
});

export const loadingDataFail = () => ({
  type: LOAD_DATA_FAIL,
  error: true,
});
