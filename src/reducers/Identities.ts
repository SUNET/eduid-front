import { createSlice } from "@reduxjs/toolkit";
import { fetchIdentities, requestAllPersonalData, UserIdentities } from "apis/eduidPersonalData";
import { addNin, removeNin } from "apis/eduidSecurity";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IdentitiesState extends UserIdentities {}

// export this for use in tests
export const initialState: IdentitiesState = {
  is_verified: false,
};

const identitiesSlice = createSlice({
  name: "identities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIdentities.fulfilled, (state, action) => {
        return action.payload.identities;
      })
      .addCase(addNin.fulfilled, (state, action) => {
        return action.payload.identities;
      })
      .addCase(removeNin.fulfilled, (state, action) => {
        return action.payload.identities;
      })
      .addCase(requestAllPersonalData.fulfilled, (state, action) => {
        return action.payload.identities;
      });
  },
});

export default identitiesSlice;
