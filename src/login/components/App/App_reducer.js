import * as actions from "./App_actions";
import * as loadingDataActions from "../../redux/actions/loadingDataActions";
import {createReducer} from "@reduxjs/toolkit";

const initialState = {
  is_loaded: false,
  loading_data: false,
  request_in_progress: false,
};

const appReducer = createReducer(initialState, {
  [actions.appLoaded]: (state, action) => { state.is_loaded = true },
  [loadingDataActions.loadingData]: (state, action) => { state.loading_data = true },
  [loadingDataActions.loadingDataComplete]: (state, action) => { state.loading_data = false },
  [loadingDataActions.requestInProgress]: (state, action) => { state.request_in_progress = true },
  [loadingDataActions.requestCompleted]: (state, action) => { state.request_in_progress = false },
})

export default appReducer;
