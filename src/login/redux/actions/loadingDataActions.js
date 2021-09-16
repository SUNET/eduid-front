export const LOAD_DATA_REQUEST = "LOAD_DATA_REQUEST";
export const LOAD_DATA_COMPLETE = "LOAD_DATA_COMPLETE";
export const REQUEST_IN_PROGRESS = "REQUEST_IN_PROGRESS";
export const REQUEST_COMPLETED = "REQUEST_COMPLETED";

export const loadingData = () => ({
  type: LOAD_DATA_REQUEST,
});

export const loadingDataComplete = () => ({
  type: LOAD_DATA_COMPLETE,
});

export const requestInProgress = () => ({
  type: REQUEST_IN_PROGRESS,
});

export const requestCompleted = () => ({
  type: REQUEST_COMPLETED,
});