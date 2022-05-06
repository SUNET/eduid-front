import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  requestRemoveEmail,
  postNewEmail,
  requestResendEmailCode,
  requestVerifyEmail,
  requestMakePrimaryEmail,
  EmailsResponse,
  EmailInfo,
} from "apis/eduidEmail";

export const initialState: EmailsResponse = {
  emails: [],
};

export const getEmails = createAction<{ emails: EmailInfo[] }>("GET_EMAIL_ALL_SUCCESS");

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmails, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      })
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
      });
  },
});

export default emailsSlice;
