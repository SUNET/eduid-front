import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPersonalData } from "apis/eduidPersonalData";
import { fetchLadokUniversities, LadokData, LadokUniversityData, linkUser, unlinkUser } from "../apis/eduidLadok";

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
      .addCase(fetchLadokUniversities.fulfilled, (state, action) => {
        state.unis = action.payload;
        state.unisFetchFailed = false;
      })
      .addCase(fetchLadokUniversities.rejected, (state) => {
        state.unisFetchFailed = true;
      })
      .addCase(linkUser.fulfilled, (state, action) => {
        state.data = action.payload.ladok;
        state.ladokName = state.data.university.ladok_name;
        state.isLinked =
          action.payload.ladok.external_id !== undefined && action.payload.ladok.university !== undefined;
      })
      .addCase(unlinkUser.fulfilled, (state) => {
        state.data = undefined;
        state.ladokName = undefined;
        state.isLinked = false;
      })
      .addCase(fetchAllPersonalData.fulfilled, (state, action) => {
        if (action.payload.ladok !== undefined) {
          state.data = action.payload.ladok;
          state.ladokName = state.data.university.ladok_name;
          state.isLinked =
            action.payload.ladok.external_id !== undefined && action.payload.ladok.university !== undefined;
        }
      });
  },
});

export default ladokSlice;
