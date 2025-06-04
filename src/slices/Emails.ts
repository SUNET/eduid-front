import { createSlice } from "@reduxjs/toolkit";
import { emailApi, EmailsResponse } from "services/email";
import personalDataApi from "services/personalData";

export const initialState: EmailsResponse = {
  emails: [],
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(emailApi.endpoints.makePrimaryEmail.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      })
      .addMatcher(emailApi.endpoints.verifyEmail.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      })
      .addMatcher(emailApi.endpoints.resendEmailCode.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      })
      .addMatcher(emailApi.endpoints.newEmail.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      })
      .addMatcher(emailApi.endpoints.removeEmail.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      })
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      });
  },
});

export default emailsSlice;
