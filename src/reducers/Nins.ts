import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
export const POST_NIN_REMOVE_SUCCESS =
  createAction<{ success: boolean; message: string; nins: NinInfo[] }>("POST_NIN_REMOVE_SUCCESS");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const changeNindata = createAction<{ data: any }>("CHANGE_NINDATA");

const ninsSlice = createSlice({
  name: "nins",
  initialState,
  reducers: {
    startRemove: (state, action: PayloadAction<string>) => {
      // TODO: What's this? Investigate why we need to remember the payload here
      state.rmNin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_NINS_SUCCESS, (state, action) => {
        const nins = action.payload.nins;
        state.nins = nins;
        if (nins.length) {
          // TODO: this state.nin, wouldn't it be reasonable to put the primary (verified) NIN there?
          state.nin = nins[0].number;
        }
      })
      .addCase(GET_NINS_FAIL, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(POST_NIN_REMOVE_SUCCESS, (state, action) => {
        // TODO: old code chucked action.payload.success into state as well, was it ever used?
        state.message = action.payload.message;
        state.nins = action.payload.nins;
        // TODO: old code didn't update state.nin here, but it is probably a bug to not do that?
        //       ... but, sigh, it looks like we have a saga that triggers on this action too,
        //           and refreshes the nins with another GET request to the backend ¯\_(ツ)_/¯
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
