export const POST_RESET_PASSWORD_VERIFY_EMAIL = "POST_RESET_PASSWORD_VERIFY_EMAIL";

export function useLinkCode(code) {
    return {
      type: POST_RESET_PASSWORD_VERIFY_EMAIL,
      payload: {
        code: code
      }
    };
  }