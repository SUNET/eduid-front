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

export function phonesStateFromPhoneList(phones: PhoneInfo[]): PhonesResponse {
  return { phones: phones };
}

const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    setPhones: (state, action: PayloadAction<PhoneInfo[]>) => {
      // Update phones in state. Called after bulk-fetch of personal data.
      return phonesStateFromPhoneList(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
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
