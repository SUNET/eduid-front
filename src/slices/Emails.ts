import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EmailsResponse,
  postNewEmail,
  requestMakePrimaryEmail,
  requestRemoveEmail,
  requestResendEmailCode,
  requestVerifyEmail,
} from "apis/eduidEmail";
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
      .addCase(requestRemoveEmail.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      })
      .addCase(postNewEmail.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestResendEmailCode.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestVerifyEmail.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestMakePrimaryEmail.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      })
      .addMatcher(personalDataApi.endpoints.requestAllPersonalData.matchFulfilled, (state, action) => {
        state.emails = action.payload.payload.emails;
      });
  },
});

export default emailsSlice;
