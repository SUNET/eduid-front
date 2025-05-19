import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchIdentities,
  PersonalDataRequest,
  postUserLanguage,
  postUserName,
  UserIdentities
} from "apis/eduidPersonalData";
import { addNin, removeIdentity, removeNin } from "apis/eduidSecurity";
import personalDataApi from "services/personalData";

interface PersonalDataState {
  eppn?: string;
  response?: PersonalDataResponse;
}
// export for use in tests
export const initialState: PersonalDataState = {};

interface PersonalDataResponse extends PersonalDataRequest {
  eppn: string;
  identities?: UserIdentities;
  legal_name?: string;
}

const personalDataSlice = createSlice({
  name: "pdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUserName.fulfilled, (state, action: PayloadAction<PersonalDataResponse>) => {
        if (state.response) {
          state.response.chosen_given_name = action.payload.chosen_given_name;
          state.response.given_name = action.payload.given_name;
          state.response.legal_name = action.payload.legal_name;
          state.response.surname = action.payload.surname;
        }
      })
      .addCase(postUserLanguage.fulfilled, (state, action: PayloadAction<PersonalDataResponse>) => {
        if (state.response) {
          state.response.language = action.payload.language;
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
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {        
        state.eppn = action.payload.payload.eppn,
        state.response= action.payload.payload;
      })
      .addMatcher(personalDataApi.endpoints.postSecurityKeyPreference.matchFulfilled, (state, action) => {
        if (state.response) {
          state.response.preferences = action.payload.payload
        }
      });
  },
});

export default personalDataSlice;
