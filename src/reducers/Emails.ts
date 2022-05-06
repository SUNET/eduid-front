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

export function emailsStateFromEmailList(emails: EmailInfo[]): EmailsResponse {
  return { emails: emails };
}

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setEmails: (state, action: PayloadAction<EmailInfo[]>) => {
      // Update emails in state. Called after bulk-fetch of personal data.
      return emailsStateFromEmailList(action.payload);
    },
  },
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
      });
  },
});

export default emailsSlice;
