import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PhoneInfo,
  postNewPhone,
  PhonesResponse,
  requestRemovePhone,
  requestVerifyPhone,
  requestMakePrimaryPhone,
  requestResendPhoneCode,
} from "apis/eduidPhone";

export const initialState: PhonesResponse = {
  phones: [],
};

export const GET_PHONE_ALL_SUCCESS = createAction<{ phones: PhoneInfo[] }>("GET_PHONE_ALL_SUCCESS");

const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GET_PHONE_ALL_SUCCESS, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestRemovePhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(postNewPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestResendPhoneCode.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestVerifyPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestMakePrimaryPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      });
  },
});

export default phonesSlice;
