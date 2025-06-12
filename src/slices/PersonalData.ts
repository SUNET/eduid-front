import { createSlice } from "@reduxjs/toolkit";
import { personalDataApi, PersonalDataRequest, UserIdentities } from "services/personalData";
import securityApi from "services/security";

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
      .addMatcher(securityApi.endpoints.removeIdentity.matchFulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.payload.identities;
        }
      })
      .addMatcher(securityApi.endpoints.addNin.matchFulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.payload.identities;
        }
      })
      .addMatcher(securityApi.endpoints.removeNin.matchFulfilled, (state, action) => {
        if (state.response) {
          state.response.identities = action.payload.payload.identities;
        }
      })
      .addMatcher(personalDataApi.endpoints.postUserName.matchFulfilled, (state, action) => {
        if (state.response) {
          state.response.given_name = action.payload.payload.given_name;
          state.response.chosen_given_name = action.payload.payload.chosen_given_name;
          state.response.surname = action.payload.payload.surname;
          state.response.legal_name = action.payload.payload.legal_name;
        }
      })
      .addMatcher(personalDataApi.endpoints.postUserLanguage.matchFulfilled, (state, action) => {
        if (state.response) {
          state.response.language = action.payload.payload.language;
        }
      })
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {        
        state.eppn = action.payload.payload.eppn;
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
