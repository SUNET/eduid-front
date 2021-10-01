import {createAction} from "@reduxjs/toolkit";

export const loadingData = createAction("LOAD_DATA_REQUEST");
export const loadingDataComplete = createAction("LOAD_DATA_COMPLETE");
export const requestInProgress = createAction("REQUEST_IN_PROGRESS");
export const requestCompleted = createAction("REQUEST_COMPLETED");
