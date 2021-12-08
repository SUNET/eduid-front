import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PDLadok } from "apis/personalData";
import { fetchLadokUniversities, linkUser, LadokUniversityData } from "../apis/eduidLadok";

interface LadokState {
  linked: boolean;
  external_id?: string;
  uni_ladok_name?: string;
  unis?: LadokUniversityData;
  unis_fetch_failed?: boolean;
}

const initialState: LadokState = { linked: false };

const ladokSlice = createSlice({
  name: "ladok",
  initialState,
  reducers: {
    updateLadok: (state, action: PayloadAction<PDLadok>) => {
      /* Update user state from a personal-data all-user-data backend response */
      state.external_id = action.payload.external_id;
      state.uni_ladok_name = action.payload.university.ladok_name;
      state.linked = action.payload.external_id !== undefined && action.payload.university !== undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLadokUniversities.fulfilled, (state, action) => {
        state.unis = action.payload;
        state.unis_fetch_failed = false;
      })
      .addCase(fetchLadokUniversities.rejected, (state) => {
        state.unis_fetch_failed = true;
      })
      .addCase(linkUser.fulfilled, (state, action) => {
        // TODO: Duplicated in updateLadok reducer above
        state.external_id = action.payload.external_id;
        state.uni_ladok_name = action.payload.university.ladok_name;
        state.linked = action.payload.external_id !== undefined && action.payload.university !== undefined;
      });
  },
});

export default ladokSlice;
