import { createSlice } from "@reduxjs/toolkit";
import { ladokApi, LadokData, LadokUniversityData } from "apis/eduidLadok";
import personalDataApi from "apis/eduidPersonalData";

interface LadokState {
  isLinked: boolean;
  ladokName?: string; // copied from data.university.ladok_name for convenience
  data?: LadokData; // data about a user's link to ladok, as loaded from backend
  unis?: LadokUniversityData; // data about all available universities, as loaded from backend
  unisFetchFailed?: boolean;
}

// export for use in tests
export const initialState: LadokState = { isLinked: false };

const ladokSlice = createSlice({
  name: "ladok",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(ladokApi.endpoints.fetchLadokUniversities.matchFulfilled, (state, action) => {
        state.unis = action.payload.payload.universities;
        state.unisFetchFailed = false;
      })
      .addMatcher(ladokApi.endpoints.fetchLadokUniversities.matchRejected, (state) => {
        state.unisFetchFailed = true;
      })
      .addMatcher(ladokApi.endpoints.linkUser.matchFulfilled, (state, action) => {
        state.data = action.payload.payload.ladok;
        state.ladokName = state.data.university.ladok_name;
        state.isLinked =
          action.payload.payload.ladok.external_id !== undefined && action.payload.payload.ladok.university !== undefined;
      })
      .addMatcher(ladokApi.endpoints.unlinkUser.matchFulfilled, (state) => {
        state.data = undefined;
        state.ladokName = undefined;
        state.isLinked = false;
      })
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {
        const data = action.payload.payload
        if (data.ladok !== undefined) {
          state.data = data.ladok;
          state.ladokName = state.data.university.ladok_name;
          state.isLinked =
            data.ladok.external_id !== undefined && data.ladok.university !== undefined;
        }
      });
  },
});

export default ladokSlice;
