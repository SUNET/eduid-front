import * as actions from "actions/LetterProofing";

const letterData = {
  confirmingLetter: false,
  verifyingLetter: false,
  code: "",
  letter_sent: "",
  letter_expires: "",
  letter_expired: false,
  message: "",
  showConfirmModal: false,
  showNotificationModal: false,
};

let letterProofingReducer = (state = letterData, action) => {
  switch (action.type) {
    case actions.STOP_LETTER_CONFIRMATION:
      return {
        ...state,
        confirmingLetter: false,
        verifyingLetter: false,
      };
    case actions.STOP_LETTER_VERIFICATION:
      return {
        ...state,
        confirmingLetter: false,
        verifyingLetter: false,
      };
    case actions.GET_LETTER_PROOFING_PROOFING_SUCCESS: {
      let verifying = false,
        confirming = false,
        showConfirm = false,
        showNotification = false;
      if (action.payload.letter_sent === undefined) {
        confirming = true;
        showNotification = true;
      } else if (action.payload.letter_expired) {
        showNotification = true;
        showConfirm = false;
      } else {
        verifying = true;
        showConfirm = true;
        showNotification = false;
      }
      return {
        ...state,
        ...action.payload,
        verifyingLetter: verifying,
        confirmingLetter: confirming,
        showConfirmModal: showConfirm,
        showNotificationModal: showNotification,
      };
    }
    case actions.GET_LETTER_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        verifyingLetter: false,
        confirmingLetter: false,
        showNotificationModal: true,
      };
    case actions.POST_LETTER_PROOFING_PROOFING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        showConfirmModal: true,
        confirmingLetter: false,
        verifyingLetter: false,
      };
    case actions.POST_LETTER_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        showConfirmModal: false,
        confirmingLetter: false,
        verifyingLetter: false,
      };
    case actions.POST_LETTER_PROOFING_CODE:
      return {
        ...state,
        ...action.payload,
      };
    case actions.POST_LETTER_PROOFING_CODE_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        confirmingLetter: false,
        verifyingLetter: false,
      };
    case actions.POST_LETTER_PROOFING_CODE_FAIL:
      return {
        ...state,
        confirmingLetter: false,
        verifyingLetter: false,
      };
    default:
      return state;
  }
};

export default letterProofingReducer;
