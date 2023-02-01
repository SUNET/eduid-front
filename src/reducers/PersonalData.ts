import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllPersonalData, PersonalDataRequest, postPersonalData } from "apis/eduidPersonalData";

// export for use in tests
export const initialState: PersonalDataRequest = {};

const personalDataSlice = createSlice({
  name: "pdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPersonalData.fulfilled, (state, action: PayloadAction<PersonalDataRequest>) => {
        state.eppn = action.payload.eppn;
        state.given_name = action.payload.given_name;
        state.surname = action.payload.surname;
        state.display_name = action.payload.display_name;
        state.language = action.payload.language;
      })
      .addCase(postPersonalData.fulfilled, (state, action: PayloadAction<PersonalDataRequest>) => {
        state.eppn = action.payload.eppn;
        state.given_name = action.payload.given_name;
        state.surname = action.payload.surname;
        state.display_name = action.payload.display_name;
        state.language = action.payload.language;
      });
  },
});

export default personalDataSlice;
