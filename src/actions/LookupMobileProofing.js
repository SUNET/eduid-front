// following pattern from letter verification:

// Clicking button triggers (a get request to see what has been stored in db - here it could change confirmingMobile from true to false to generate the modal) GET_MOBILE_PROOFING_PROOFING
export const SHOW_MOBILE_MODAL = "SHOW_MOBILE_MODAL";
export const CLOSE_MOBILE_MODAL = "CLOSE_MOBILE_MODAL";

export const POST_LOOKUP_MOBILE_PROOFING_PROOFING =
  "POST_LOOKUP_MOBILE_PROOFING_PROOFING";
export const POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS =
  "POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS";
export const POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL =
  "POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL";


export function showModal() {
  return {
    type: SHOW_MOBILE_MODAL
  };
}

export function closeModal() {
  return {
    type: CLOSE_MOBILE_MODAL
  };
}

export function postLookupMobile() {
  console.log("this is lookupmobile actions");
  return {
    type: POST_LOOKUP_MOBILE_PROOFING_PROOFING
  };
}

export function postLookupMobileFail(err) {
  return {
    type: POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
