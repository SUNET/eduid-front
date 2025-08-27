import { createSlice } from "@reduxjs/toolkit";
import { letterProofingApi } from "apis/eduidLetterProofing";

export interface LetterProofingState {
  code?: string;
  letter_sent?: string;
  letter_expires?: string;
  letter_expired?: boolean;
  letter_expires_in_days?: number;
  letter_sent_days_ago?: number;
}

// export for use in tests
export const initialState: LetterProofingState = {};

const letterProofingSlice = createSlice({
  name: "letterProofing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(letterProofingApi.endpoints.letterProfingState.matchFulfilled, (state, action) => {
      state.letter_expires_in_days = action.payload.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.payload.letter_sent_days_ago;
      state.letter_sent = action.payload.payload.letter_sent;
      state.letter_expires = action.payload.payload.letter_expires;
      state.letter_expired = action.payload.payload.letter_expired;
    });
    builder.addMatcher(letterProofingApi.endpoints.requestLetter.matchFulfilled, (state, action) => {
      state.letter_sent = action.payload.payload.letter_sent;
      state.letter_expires = action.payload.payload.letter_expires;
      state.letter_expired = action.payload.payload.letter_expired;
      state.letter_expires_in_days = action.payload.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.payload.letter_sent_days_ago;
    });
    builder.addMatcher(letterProofingApi.endpoints.confirmLetterCode.matchFulfilled, (state) => {
      state.letter_sent = undefined;
      state.letter_expires = undefined;
      state.letter_expired = undefined;
      state.letter_expires_in_days = undefined;
      state.letter_sent_days_ago = undefined;
    });
  },
});

export default letterProofingSlice;
