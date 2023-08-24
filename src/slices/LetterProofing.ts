import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLetterProofingState, postRequestLetter, confirmLetterCode } from "apis/eduidLetterProofing";

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
    builder.addCase(fetchLetterProofingState.fulfilled, (state, action: PayloadAction<LetterProofingState>) => {
      state.letter_expires_in_days = action.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.letter_sent_days_ago;
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
    });
    builder.addCase(postRequestLetter.fulfilled, (state, action: PayloadAction<LetterProofingState>) => {
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
      state.letter_expires_in_days = action.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.letter_sent_days_ago;
    });
    builder.addCase(confirmLetterCode.fulfilled, (state) => {
      state.letter_sent = undefined;
      state.letter_expires = undefined;
      state.letter_expired = undefined;
      state.letter_expires_in_days = undefined;
      state.letter_sent_days_ago = undefined;
    });
  },
});

export default letterProofingSlice;
