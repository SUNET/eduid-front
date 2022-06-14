import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIdentities, FetchIdentitiesResponse } from "apis/eduidPersonalData";
import { addNin, removeNin } from "apis/eduidSecurity";

export interface NinInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IdentitiesState extends FetchIdentitiesResponse {}

// export this for use in tests
export const initialState: IdentitiesState = {
  is_verified: false,
};

const identitiesSlice = createSlice({
  name: "identities",
  initialState,
  reducers: {
    setIdentities: (state, action: PayloadAction<FetchIdentitiesResponse>) => {
      // Update identities in state. Called after bulk-fetch of personal data.
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdentities.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addNin.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(removeNin.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export default identitiesSlice;
