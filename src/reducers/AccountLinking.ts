import { createSlice } from "@reduxjs/toolkit";
import { fetchOrcid, OrcidInfo, removeOrcid } from "apis/eduidOrcid";
import { fetchAllPersonalData } from "apis/eduidPersonalData";

export interface AccountLinkingState {
  orcid?: OrcidInfo;
}

// export for use in tests
export const initialState: AccountLinkingState = {};

const accountLinkingSlice = createSlice({
  name: "account_linking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrcid.fulfilled, (state, action) => {
        state.orcid = action.payload.orcid;
      })
      .addCase(removeOrcid.fulfilled, (state) => {
        state.orcid = undefined;
      })
      .addCase(fetchAllPersonalData.fulfilled, (state, action) => {
        state.orcid = action.payload.orcid;
      });
  },
});

export default accountLinkingSlice;
