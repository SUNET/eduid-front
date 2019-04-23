
import * as actions from "actions/LetterProofing";


const letterData = {
    confirmingLetter: false,
    verifyingLetter: false,
    code: '',
    letter_sent: '',
    letter_expires: '',
    letter_expired: false,
    failed: false,
    error: "",
    message: ''
};


let letterProofingReducer = (state=letterData, action) => {
  switch (action.type) {
    case actions.STOP_LETTER_CONFIRMATION:
      return {
        ...state,
        confirmingLetter: false,
        verifyingLetter: false
      };
    case actions.STOP_LETTER_VERIFICATION:
      return {
        ...state,
        confirmingLetter: false,
        verifyingLetter: false
      };
    case actions.GET_LETTER_PROOFING_PROOFING:
      return {
        ...state,
        failed: false
      };
    case actions.GET_LETTER_PROOFING_PROOFING_SUCCESS:
      let verifying = false,
          confirming = false;
      if (action.payload.letter_sent === undefined) {
        confirming = true;
      } else {
        verifying = true;
      }
      return {
        ...state,
        ...action.payload,
        failed: false,
        verifyingLetter: verifying,
        confirmingLetter: confirming
      };
    case actions.GET_LETTER_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        failed: true,
        verifyingLetter: false,
        confirmingLetter: false
      };
    case actions.POST_LETTER_PROOFING_PROOFING:
      return {
        ...state,
        failed: false
      };
    case actions.POST_LETTER_PROOFING_PROOFING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        failed: false,
        confirmingLetter: false,
        verifyingLetter: false
      };
    case actions.POST_LETTER_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        failed: true,
        confirmingLetter: false,
        verifyingLetter: false
      };
    case actions.POST_LETTER_PROOFING_CODE:
      return {
        ...state,
        ...action.payload,
        failed: false
      };
    case actions.POST_LETTER_PROOFING_CODE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        failed: false,
        confirmingLetter: false,
        verifyingLetter: false
      };
    case actions.POST_LETTER_PROOFING_CODE_FAIL:
      return {
        ...state,
        failed: true,
        confirmingLetter: false,
        verifyingLetter: false
      };
    default:
      return state;
  }
};

export default letterProofingReducer;
