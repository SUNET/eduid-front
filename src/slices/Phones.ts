import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestAllPersonalData } from "apis/eduidPersonalData";
import {
  getCaptchaRequest,
  PhoneInfo,
  PhonesResponse,
  postNewPhone,
  requestMakePrimaryPhone,
  requestRemovePhone,
  requestSendPhoneCode,
  requestVerifyPhone,
} from "apis/eduidPhone";
import { GetCaptchaResponse } from "apis/eduidSignup";

// export for use in tests
export const initialState: PhonesResponse = {
  phones: [],
  captcha: {},
};

export function phonesStateFromPhoneList(phones: PhoneInfo[]): PhonesResponse {
  return { phones: phones };
}

const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestRemovePhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(postNewPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestSendPhoneCode.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestVerifyPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestMakePrimaryPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestAllPersonalData.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(getCaptchaRequest.fulfilled, (state, action: PayloadAction<GetCaptchaResponse>) => {
        state.captcha = action.payload;
      });
  },
});

export default phonesSlice;
