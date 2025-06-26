import { createSlice } from "@reduxjs/toolkit";
import { orcidApi, OrcidInfo } from "apis/orcid";
import personalDataApi from "apis/personalData";

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
      .addMatcher(orcidApi.endpoints.fetchOrcid.matchFulfilled, (state, action) => {
        state.orcid = action.payload.payload.orcid;
      })
      .addMatcher(orcidApi.endpoints.removeOrcid.matchFulfilled, (state) => {
        state.orcid = undefined;
      })
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {
        state.orcid = action.payload.payload.orcid;
      })
  },
});

export default accountLinkingSlice;
