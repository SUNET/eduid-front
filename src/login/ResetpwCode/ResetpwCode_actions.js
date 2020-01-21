export const CODE_FOR_CONFIG = "CODE_FOR_CONFIG";
export const POST_CODE_FAIL = "POST_CODE_FAIL";


export function configCode(code) {
  return {
    type: CODE_FOR_CONFIG,
    payload: {
      code: code
    }
  };
}


export function postCodeFail(err) {
  return {
    type: POST_CODE_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
