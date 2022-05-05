import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNins } from "apis/eduidPersonalData";
import { addNin, removeNin } from "apis/eduidSecurity";

export interface NinInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

export interface NinState {
  nins: NinInfo[];
  first_nin?: NinInfo; // the primary nin, or if there are no primary nins the first one from the list
  is_confirmed_identity: boolean; // True if the user has a confirmed identity, not necessarily a NIN
}

// export this for use in tests
export const initialState: NinState = {
  nins: [],
  is_confirmed_identity: false,
};

// export this for use in tests
export function ninStateFromNinList(nins: NinInfo[]): NinState {
  // Deduce some information about the nins given as input, and return a full state
  const _primary = nins.filter((nin) => nin.primary);
  const primary = _primary.length ? _primary[0] : nins[0];
  return { nins: nins, is_confirmed_identity: !!primary?.verified, first_nin: primary };
}

const ninsSlice = createSlice({
  name: "nins",
  initialState,
  reducers: {
    setNins: (state, action: PayloadAction<NinInfo[]>) => {
      // Update nins in state. Called after bulk-fetch of personal data.
      return ninStateFromNinList(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNins.fulfilled, (state, action) => {
        return ninStateFromNinList(action.payload.nins);
      })
      .addCase(addNin.fulfilled, (state, action) => {
        return ninStateFromNinList(action.payload.nins);
      })
      .addCase(removeNin.fulfilled, (state, action) => {
        return ninStateFromNinList(action.payload.nins);
      });
  },
});

export default ninsSlice;
