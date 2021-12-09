import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PDLadok } from "apis/personalData";
import { fetchLadokUniversities, linkUser, LadokUniversityData, unlinkUser } from "../apis/eduidLadok";

interface LadokState {
  isLinked: boolean;
  ladokName?: string; // copied from data.university.ladok_name for convenience
  data?: PDLadok; // data as loaded from backend
  unis?: LadokUniversityData; // data as loaded from backend
  unisFetchFailed?: boolean;
}

const initialState: LadokState = { isLinked: false };

const ladokSlice = createSlice({
  name: "ladok",
  initialState,
  reducers: {
    updateLadok: (state, action: PayloadAction<PDLadok>) => {
      /* Update user state from a personal-data all-user-data backend response */
      state.data = action.payload;
      state.ladokName = state.data.university.ladok_name;
      state.isLinked = action.payload.external_id !== undefined && action.payload.university !== undefined;
    },
  },
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
      });
  },
});

export default ladokSlice;
