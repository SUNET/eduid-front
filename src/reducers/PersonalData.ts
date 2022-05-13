import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "actions/PersonalData";

export interface PersonalDataData {
  eppn?: string;
  given_name?: string;
  surname?: string;
  display_name?: string;
  language?: string;
  message?: string;
}

// export for use in tests
export const initialState: PersonalDataData = {};

const personalDataSlice = createSlice({
  name: "pdata",
  initialState,
  reducers: {
    updatePersonalData: (state, action: PayloadAction<PersonalDataData>) => {
      return {
        eppn: state.eppn,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.GET_ALL_USERDATA_FAIL, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(actions.postUserdataFail, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

export default personalDataSlice;
