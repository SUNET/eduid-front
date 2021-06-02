export const POST_LOGIN_REF_TO_NEXT = "POST_LOGIN_REF_TO_NEXT";

export function useLoginRef() {
  return {
    type: POST_LOGIN_REF_TO_NEXT,
  };
}
