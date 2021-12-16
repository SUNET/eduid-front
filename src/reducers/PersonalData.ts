import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actions from "actions/PersonalData";

export interface PersonalDataData {
  eppn?: string;
  given_name?: string;
  surname?: string;
  display_name?: string;
  language?: string;
}

interface PersonalDataState {
  message?: string;
  data: PersonalDataData;
}

const initialState: PersonalDataState = {
  data: {},
};

const personalDataSlice = createSlice({
  name: "pdata",
  initialState,
  reducers: {
    updatePersonalData: (state, action: PayloadAction<PersonalDataData>) => {
      return {
        // TODO: move eppn outside of state.personal_data.data
        // and remove "eppn: state.data.eppn"
        data: {
          // to prevent the disappearance of eppn when the user is updating personal-data
          eppn: state.data.eppn,
          ...action.payload,
        },
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
