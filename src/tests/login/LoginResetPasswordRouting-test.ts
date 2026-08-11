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
