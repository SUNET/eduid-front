import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EmailsResponse,
  postNewEmail,
  requestMakePrimaryEmail,
  requestRemoveEmail,
  requestResendEmailCode,
  requestVerifyEmail,
} from "apis/eduidEmail";
import { fetchAllPersonalData } from "apis/eduidPersonalData";

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
      .addCase(fetchAllPersonalData.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
        state.emails = action.payload.emails;
      });
  },
});

export default emailsSlice;
