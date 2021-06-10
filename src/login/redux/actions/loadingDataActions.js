export const LOAD_DATA_REQUEST = "LOAD_DATA_REQUEST";
export const LOAD_DATA_COMPLETE = "LOAD_DATA_COMPLETE";

export const loadingData = () => ({
  type: LOAD_DATA_REQUEST,
});

export const loadingDataComplete = () => ({
  type: LOAD_DATA_COMPLETE,
});

