import { createSlice } from "@reduxjs/toolkit";
import { fetchOrcid, OrcidInfo, removeOrcid } from "apis/eduidOrcid";
import personalDataApi from "services/personalData";

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
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {
        state.orcid = action.payload.payload.orcid;
      })
  },
});

export default accountLinkingSlice;
