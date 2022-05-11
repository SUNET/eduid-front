import { createSlice } from "@reduxjs/toolkit";
import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";

interface LookupMobileProofingState {
  message?: string; // should be unused, whole reducer and this left more as a placeholder
}

const initialState: LookupMobileProofingState = {};

const lookupMobileProofingSlice = createSlice({
  name: "lookupMobileProofing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(lookupMobileProofing.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
  },
});

export default lookupMobileProofingSlice;
