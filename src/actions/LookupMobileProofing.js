export const POST_LOOKUP_MOBILE_PROOFING_PROOFING =
  "POST_LOOKUP_MOBILE_PROOFING_PROOFING";
export const POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS =
  "POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS";
export const POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL =
  "POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL";

export function postLookupMobile() {
  return {
    type: POST_LOOKUP_MOBILE_PROOFING_PROOFING
  };
}

export function postLookupMobileFail(err) {
  return {
    type: POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}
