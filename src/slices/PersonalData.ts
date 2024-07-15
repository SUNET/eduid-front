import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchIdentities,
  PersonalDataRequest,
  postPersonalData,
  postSecurityKeyPreference,
  PreferencesData,
  requestAllPersonalData,
  UserIdentities,
} from "apis/eduidPersonalData";
import { addNin, removeIdentity, removeNin } from "apis/eduidSecurity";

interface PersonalDataState {
  eppn?: string;
  response?: PersonalDataResponse;
}
// export for use in tests
export const initialState: PersonalDataState = {};

interface PersonalDataResponse extends PersonalDataRequest {
  eppn: string;
  identities?: UserIdentities;
}

const personalDataSlice = createSlice({
  name: "pdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestAllPersonalData.fulfilled, (state, action: PayloadAction<PersonalDataResponse>) => {
        state.eppn = action.payload.eppn;
        state.response = action.payload;
      })
      .addCase(postPersonalData.fulfilled, (state, action: PayloadAction<PersonalDataResponse>) => {
        state.response = action.payload;
      })
      .addCase(postSecurityKeyPreference.fulfilled, (state, action: PayloadAction<PreferencesData>) => {
        if (state.response) {
          state.response.preferences = action.payload;
        }
      })
      .addCase(removeIdentity.fulfilled, (state, action: PayloadAction<PersonalDataResponse>) => {
        state.response = action.payload;
      })
      .addCase(fetchIdentities.fulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.identities;
        }
      })
      .addCase(addNin.fulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.identities;
        }
      })
      .addCase(removeNin.fulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.identities;
        }
      })
      .addCase(requestAllPersonalData.fulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.identities;
        }
      })
      .addCase(removeIdentity.fulfilled, (state, action) => {
        return action.payload.identities;
      });
  },
});

export default personalDataSlice;
