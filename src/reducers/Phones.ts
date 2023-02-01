import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllPersonalData } from "apis/eduidPersonalData";
import {
  PhoneInfo,
  PhonesResponse,
  postNewPhone,
  requestMakePrimaryPhone,
  requestRemovePhone,
  requestResendPhoneCode,
  requestVerifyPhone,
} from "apis/eduidPhone";

// export for use in tests
export const initialState: PhonesResponse = {
  phones: [],
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
      .addCase(requestResendPhoneCode.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestVerifyPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(requestMakePrimaryPhone.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      })
      .addCase(fetchAllPersonalData.fulfilled, (state, action: PayloadAction<PhonesResponse>) => {
        state.phones = action.payload.phones;
      });
  },
});

export default phonesSlice;
