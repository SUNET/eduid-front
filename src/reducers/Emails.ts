import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  requestRemoveEmail,
  postNewEmail,
  requestResendEmailCode,
  requestVerifyEmail,
  requestMakePrimaryEmail,
} from "apis/addEmails";

export interface EmailInfo {
  email: string;
  verified: boolean;
  primary: boolean;
}

export interface EmailDataState {
  message?: string;
  confirming?: string;
  emails?: EmailInfo[];
  email?: string;
}

const initialState: EmailDataState = {
  message: "",
  confirming: "",
  emails: [],
  email: "",
};

export const GET_EMAIL_ALL_SUCCESS = createAction<{ emails: EmailInfo[] }>("GET_EMAIL_ALL_SUCCESS");

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    startConfirmationEmail: (state, action: PayloadAction<EmailDataState>) => {
      state.confirming = action.payload.email;
    },
    stopConfirmation: (state) => {
      state.confirming = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_EMAIL_ALL_SUCCESS, (state, action: PayloadAction<EmailDataState>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestRemoveEmail.fulfilled, (state, action: PayloadAction<EmailDataState>) => {
        state.emails = action.payload.emails;
      })
      .addCase(postNewEmail.fulfilled, (state, action: PayloadAction<EmailDataState>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestResendEmailCode.fulfilled, (state, action: PayloadAction<EmailDataState>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestVerifyEmail.fulfilled, (state, action: PayloadAction<EmailDataState>) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestMakePrimaryEmail.fulfilled, (state, action: PayloadAction<EmailDataState>) => {
        state.emails = action.payload.emails;
      });
  },
});

export default emailsSlice;
