import { resetPasswordApi } from "apis/eduidResetPassword";
import { getTestEduIDStore } from "eduid-init-app";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { loginTestState, RESET_PASSWORD_SERVICE_URL } from "../helperFunctions/LoginTestApp-rtl";

const NEW_PASSWORD_URL = RESET_PASSWORD_SERVICE_URL + "new-password";

function makeStore() {
  return getTestEduIDStore(loginTestState);
}

test("does not store the csrf_token minted into an invalidated session", async () => {
  mswServer.use(
    http.get(RESET_PASSWORD_SERVICE_URL, () =>
      HttpResponse.json({
        type: "test success",
        payload: { csrf_token: "fresh-token", state: { captcha: { completed: false }, email: { completed: false } } },
      }),
    ),
    http.post(NEW_PASSWORD_URL, () =>
      HttpResponse.json({
        type: "test error",
        error: true,
        payload: { message: "resetpw.invalid_session", csrf_token: "token-from-dead-session" },
      }),
    ),
  );

  const store = makeStore();

  await store.dispatch(
    resetPasswordApi.endpoints.postSetNewPassword.initiate({ email_code: "code", password: "password" }),
  );

  expect(store.getState().config.csrf_token).not.toEqual("token-from-dead-session");
});

test("retries with a freshly fetched csrf_token after the session was invalidated", async () => {
  const posted_tokens: (string | undefined)[] = [];

  mswServer.use(
    http.get(RESET_PASSWORD_SERVICE_URL, () =>
      HttpResponse.json({
        type: "test success",
        payload: { csrf_token: "fresh-token", state: { captcha: { completed: false }, email: { completed: false } } },
      }),
    ),
    http.post(NEW_PASSWORD_URL, async ({ request }) => {
      const body = (await request.json()) as { csrf_token?: string };
      posted_tokens.push(body.csrf_token);

      if (posted_tokens.length === 1) {
        return HttpResponse.json({
          type: "test error",
          error: true,
          payload: { message: "resetpw.invalid_session", csrf_token: "token-from-dead-session" },
        });
      }
      return HttpResponse.json({ type: "test success", payload: {} });
    }),
  );

  const store = makeStore();

  const result = await store.dispatch(
    resetPasswordApi.endpoints.postSetNewPassword.initiate({ email_code: "code", password: "password" }),
  );

  expect(posted_tokens).toEqual(["csrf-token", "fresh-token"]);
  expect(result.isSuccess).toBe(true);
});
