import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addNin, removeNin } from "apis/eduidSecurity";
import { fetchNins } from "apis/personalData";

export interface NinInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

interface NinState {
  message: string;
  nin: string;
  rmNin: string;
  nins: NinInfo[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any; // this rabbit-hole leads to lookup-mobile-proofing and looks unused??? oh my.
}

const initialState: NinState = {
  message: "", // an error(?) message returned from the backend
  nin: "", // the nin-number from the first entry in nins (wut?)
  rmNin: "", // the nin-number we've most recently asked the backend to remove (wut?)
  nins: [],
};

export const GET_NINS_SUCCESS = createAction<{ nins: NinInfo[] }>("GET_PERSONAL_DATA_NINS_SUCCESS");
export const GET_NINS_FAIL = createAction<{ message: string }>("GET_PERSONAL_DATA_NINS_FAIL");
export const POST_NIN_REMOVE_SUCCESS = createAction<{ success: boolean; message: string; nins: NinInfo[] }>(
  "POST_NIN_REMOVE_SUCCESS"
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeNindata = createAction<{ data: any }>("CHANGE_NINDATA");

const ninsSlice = createSlice({
  name: "nins",
  initialState,
  reducers: {
    setNins: (state, action: PayloadAction<NinInfo[]>) => {
      // Update nins in state. Called after bulk-fetch of personal data.
      state.nins = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNins.fulfilled, (state, action) => {
        state.nins = action.payload.nins;
      })
      .addCase(addNin.fulfilled, (state, action) => {
        state.nins = action.payload.nins;
      })
      .addCase(removeNin.fulfilled, (state, action) => {
        state.nins = action.payload.nins;
      })
      .addCase(changeNindata, (state, action) => {
        // What is this? A rabbit-hole that leads to lookup-mobile-proofing. I'm not sure it
        // is even used... there is talk about "fixing the lookup mobile button" in commit 7831834,
        // but is there actually anything that can dispatch "POST_LOOKUP_MOBILE_PROOFING_PROOFING"?
        state.data = action.payload;
      });
  },
});

export default ninsSlice;
