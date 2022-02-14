import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLetterProofingState, postRequestLetter, confirmLetterCode } from "apis/letterProofing";

export interface LetterProofingState {
  confirmingLetter?: boolean;
  verifyingLetter?: boolean;
  code?: string;
  letter_sent?: string;
  letter_expires?: string;
  letter_expired?: boolean;
  letter_expires_in_days?: number;
  letter_sent_days_ago?: number;
}

const initialState: LetterProofingState = {};

const letterProofingSlice = createSlice({
  name: "letterProofing",
  initialState,
  reducers: {
    // postRequestLetter: () => {},
    // Trigger action on click ACCEPT button in Notification Modal
    stopLetterConfirmation: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    stopLetterVerification: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    postLetterProofingCodeSuccess: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    // Common action to signal a caught exception in one of the letter Proofing sagas.
    letterProofingSagaFail: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    postLetterProofingSuccess: (state, action: PayloadAction<LetterProofingState>) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
      state.letter_expires_in_days = action.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.letter_sent_days_ago;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLetterProofingState.fulfilled, (state, action: PayloadAction<LetterProofingState>) => {
      if (action.payload.letter_sent === undefined) {
        state.confirmingLetter = true;
      } else {
        state.verifyingLetter = true;
      }
      state.letter_expires_in_days = action.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.letter_sent_days_ago;
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
    });
    builder.addCase(postRequestLetter.fulfilled, (state, action: PayloadAction<LetterProofingState>) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
      state.letter_expires_in_days = action.payload.letter_expires_in_days;
      state.letter_sent_days_ago = action.payload.letter_sent_days_ago;
    });
    builder.addCase(confirmLetterCode.fulfilled, (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    });
  },
});

export default letterProofingSlice;
