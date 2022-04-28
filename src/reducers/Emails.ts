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
  message: string;
  confirming: string;
  emails: EmailInfo[];
  email: string;
}

export const initialState: EmailDataState = {
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
    startConfirmationEmail: (state, action) => {
      state.confirming = action.payload.email;
    },
    stopConfirmation: (state) => {
      state.confirming = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_EMAIL_ALL_SUCCESS, (state, action) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestRemoveEmail.fulfilled, (state, action) => {
        state.emails = action.payload.emails;
      })
      .addCase(postNewEmail.fulfilled, (state, action) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestResendEmailCode.fulfilled, (state, action) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestVerifyEmail.fulfilled, (state, action) => {
        state.emails = action.payload.emails;
      })
      .addCase(requestMakePrimaryEmail.fulfilled, (state, action) => {
        state.emails = action.payload.emails;
      });
  },
});

export default emailsSlice;
