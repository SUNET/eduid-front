
export const STOP_LETTER_CONFIRMATION = 'STOP_LETTER_CONFIRMATION';
export const STOP_LETTER_VERIFICATION = 'STOP_LETTER_VERIFICATION';
export const GET_LETTER_PROOFING_PROOFING = 'GET_LETTER_PROOFING_PROOFING';
export const GET_LETTER_PROOFING_PROOFING_FAIL = 'GET_LETTER_PROOFING_PROOFING_FAIL';
export const GET_LETTER_PROOFING_PROOFING_SUCCESS = 'GET_LETTER_PROOFING_PROOFING_SUCCESS';
export const POST_LETTER_PROOFING_PROOFING = 'POST_LETTER_PROOFING_PROOFING';
export const POST_LETTER_PROOFING_PROOFING_FAIL = 'POST_LETTER_PROOFING_PROOFING_FAIL';
export const POST_LETTER_PROOFING_PROOFING_SUCCESS = 'POST_LETTER_PROOFING_PROOFING_SUCCESS';
export const POST_LETTER_PROOFING_CODE = 'POST_LETTER_PROOFING_VERIFY_CODE';
export const POST_LETTER_PROOFING_CODE_FAIL = 'POST_LETTER_PROOFING_VERIFY_CODE_FAIL';
export const POST_LETTER_PROOFING_CODE_SUCCESS = 'POST_LETTER_PROOFING_VERIFY_CODE_SUCCESS';


export function stopLetterConfirmation () {
  return {
    type: STOP_LETTER_CONFIRMATION
  };
}

export function stopLetterVerification () {
  return {
    type: STOP_LETTER_VERIFICATION
  };
}

export function getLetterProofingState () {
  return {
    type: GET_LETTER_PROOFING_PROOFING
  };
}

export function getLetterProofingStateFail (err) {
  return {
    type: GET_LETTER_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}

export function postLetterProofingSendLetter () {
  return {
    type: POST_LETTER_PROOFING_PROOFING
  };
}

export function postLetterProofingSendLetterFail (err) {
  return {
    type: POST_LETTER_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}

export function postLetterProofingVerificationCode (data) {
  return {
    type: POST_LETTER_PROOFING_CODE,
    payload: {
        code: data.code
    }
  };
}

export function postLetterProofingVerificationCodeFail (err) {
  return {
    type: POST_LETTER_PROOFING_CODE_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}
