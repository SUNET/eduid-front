import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    getLetterProofingState: () => {},
    // Trigger action on click ACCEPT button in Notification Modal
    postLetterProofingSendLetter: () => {},
    stopLetterConfirmation: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    stopLetterVerification: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    getLetterProofingSuccess: (state, action: PayloadAction<LetterProofingState>) => {
      if (action.payload.letter_sent === undefined) {
        state.confirmingLetter = true;
      } else {
        state.verifyingLetter = true;
      }
      state.letter_expires_in_days = action.payload.letter_expires_in_days;
      state.letter_sent = action.payload.letter_sent;
      state.letter_sent_days_ago = action.payload.letter_sent_days_ago;
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
    },
    postLetterProofingSuccess: (state, action: PayloadAction<LetterProofingState>) => {
      state.letter_sent = action.payload.letter_sent;
      state.letter_expires = action.payload.letter_expires;
      state.letter_expired = action.payload.letter_expired;
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    postLetterProofingFail: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    postLetterProofingVerificationCode: (state, action) => {
      state.code = action.payload.code;
    },
    postLetterProofingCodeSuccess: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    postLetterProofingCodeFail: (state) => {
      state.confirmingLetter = false;
      state.verifyingLetter = false;
    },
    // Common action to signal a caught exception in one of the reset password sagas.
    letterProofingSagaFail: () => {},
  },
});

export default letterProofingSlice;
