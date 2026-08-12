import { resetPasswordApi } from "apis/eduidResetPassword";
import { getTestEduIDStore } from "eduid-init-app";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { loginTestState, RESET_PASSWORD_SERVICE_URL } from "../helperFunctions/LoginTestApp-rtl";

const VERIFY_EMAIL_URL = RESET_PASSWORD_SERVICE_URL + "verify-email";

function respondWithMessage(message: string) {
  return HttpResponse.json({ type: "test error", error: true, payload: { message } });
}

test("locks the flow when too many codes have been tried", async () => {
  mswServer.use(http.post(VERIFY_EMAIL_URL, () => respondWithMessage("resetpw.email-code-too-many-tries")));

  const store = getTestEduIDStore(loginTestState);

  await store.dispatch(resetPasswordApi.endpoints.verifyEmailLink.initiate({ email_code: "123456" }));

  expect(store.getState().resetPassword.next_page).toEqual("RESET_PW_LOCKED");
});

test("locks the flow when a new code is requested while locked", async () => {
  mswServer.use(http.post(RESET_PASSWORD_SERVICE_URL, () => respondWithMessage("resetpw.email-code-too-many-tries")));

  const store = getTestEduIDStore(loginTestState);

  await store.dispatch(resetPasswordApi.endpoints.requestEmailLink.initiate({ email: "test@example.org" }));

  expect(store.getState().resetPassword.next_page).toEqual("RESET_PW_LOCKED");
});

const NEW_PASSWORD_URL = RESET_PASSWORD_SERVICE_URL + "new-password";

test("asks for the email address when the browser has no identity hint", async () => {
  mswServer.use(http.post(VERIFY_EMAIL_URL, () => respondWithMessage("resetpw.email-address-required")));

  const store = getTestEduIDStore(loginTestState);

  await store.dispatch(resetPasswordApi.endpoints.verifyEmailLink.initiate({ email_code: "123456" }));

  expect(store.getState().resetPassword.next_page).toEqual("RESET_PW_ENTER_CODE");
});

test.each(["resetpw.email-not-validated", "resetpw.invalid_session"])(
  "sends the user back to code entry on %s when setting a new password",
  async (message) => {
    mswServer.use(
      // the invalid_session retry in apis/common.ts fetches a fresh CSRF token first
      http.get(RESET_PASSWORD_SERVICE_URL, () =>
        HttpResponse.json({
          type: "test success",
          payload: { csrf_token: "fresh-token", state: { captcha: { completed: false }, email: { completed: false } } },
        }),
      ),
      http.post(NEW_PASSWORD_URL, () => respondWithMessage(message)),
    );

    const store = getTestEduIDStore(loginTestState);

    await store.dispatch(
      resetPasswordApi.endpoints.postSetNewPassword.initiate({ email_code: "123456", password: "password" }),
    );

    expect(store.getState().resetPassword.next_page).toEqual("RESET_PW_ENTER_CODE");
  },
);
