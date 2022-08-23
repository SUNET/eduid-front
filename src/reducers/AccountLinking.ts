import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrcid, OrcidInfo, removeOrcid } from "apis/eduidOrcid";

export interface AccountLinkingState {
  orcid?: OrcidInfo;
}

// export for use in tests
export const initialState: AccountLinkingState = {};

const accountLinkingSlice = createSlice({
  name: "account_linking",
  initialState,
  reducers: {
    setAccountLinking: (state, action: PayloadAction<AccountLinkingState>) => {
      // Update account linking in state. Called after bulk-fetch of personal data.
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrcid.fulfilled, (state, action) => {
        state.orcid = action.payload.orcid;
      })
      .addCase(removeOrcid.fulfilled, (state) => {
        state.orcid = undefined;
      });
  },
});

export default accountLinkingSlice;
