import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PersonalDataRequest,
  postPersonalData,
  postSecurityKeyPreference,
  PreferencesData,
  requestAllPersonalData,
} from "apis/eduidPersonalData";

interface PersonalDataState {
  eppn?: string;
  response?: PersonalDataResponse;
}
// export for use in tests
export const initialState: PersonalDataState = {};

interface PersonalDataResponse extends PersonalDataRequest {
  eppn: string;
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
      });
  },
});

export default personalDataSlice;
