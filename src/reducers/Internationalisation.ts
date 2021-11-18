/**
 * Basically a re-implementation of react-intl-redux that isn't being updated and
 * was holding back our react-intl version.
 *
 * The description for that project was "Building idiomatic React Redux Application
 * by having translations in store and dispatching action to update it."
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface intlState {
  locale: string;
  formats: string;
  messages: string;
}

const initialState: intlState = {
  locale: "en",
  formats: "",
  messages: "",
};

export const intlSlice = createSlice({
  name: "intl",
  initialState,
  reducers: {
    updateIntl: (state, action: PayloadAction<intlState>) => {
      state = action.payload;
    },
  },
});

// since all old code used these names
export const updateIntl = intlSlice.actions.updateIntl;
export const intlReducer = intlSlice.reducer;

export default intlSlice;
