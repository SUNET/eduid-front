import { resetPasswordApi } from "apis/eduidResetPassword";
import { getTestEduIDStore } from "eduid-init-app";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { loginTestState, RESET_PASSWORD_SERVICE_URL } from "../helperFunctions/LoginTestApp-rtl";

const NEW_PASSWORD_URL = RESET_PASSWORD_SERVICE_URL + "new-password";
const AUTHN_SERVICE_URL = "https://idp.eduid.docker/services/authn/";
const AUTHENTICATE_URL = AUTHN_SERVICE_URL + "authenticate";

function makeStore() {
  return getTestEduIDStore(loginTestState);
}

// The re-authentication path is only reachable when an authn service url is configured.
function makeStoreWithAuthn() {
  return getTestEduIDStore({
    ...loginTestState,
    config: { ...loginTestState.config, authn_service_url: AUTHN_SERVICE_URL },
  });
}

// A "CSRF failed to validate" response comes from a live session, and carries the token that
// session expects - it is the stored token that is stale.
function csrfFailureResponse(live_csrf_token: string) {
  return HttpResponse.json({
    type: "test error",
    error: true,
    payload: { csrf_token: live_csrf_token, error: { csrf_token: ["CSRF failed to validate"] } },
  });
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

test("recovers a request that failed CSRF validation, without bouncing the user to login", async () => {
  const posted_tokens: (string | undefined)[] = [];
  const authenticate_tokens: (string | undefined)[] = [];

  mswServer.use(
    http.post(NEW_PASSWORD_URL, async ({ request }) => {
      const body = (await request.json()) as { csrf_token?: string };
      posted_tokens.push(body.csrf_token);

      if (body.csrf_token !== "live-token") {
        return csrfFailureResponse("live-token");
      }
      return HttpResponse.json({ type: "test success", payload: {} });
    }),
    http.post(AUTHENTICATE_URL, async ({ request }) => {
      const body = (await request.json()) as { csrf_token?: string };
      authenticate_tokens.push(body.csrf_token);
      return HttpResponse.json({ type: "test success", payload: { location: "https://login.example.org/" } });
    }),
  );

  const store = makeStoreWithAuthn();

  const result = await store.dispatch(
    resetPasswordApi.endpoints.postSetNewPassword.initiate({ email_code: "code", password: "password" }),
  );

  expect(posted_tokens).toEqual(["csrf-token", "live-token"]);
  expect(authenticate_tokens).toEqual([]);
  expect(result.isSuccess).toBe(true);
});

test("settles a request that keeps failing CSRF validation, instead of hanging forever", async () => {
  const authenticate_tokens: (string | undefined)[] = [];

  mswServer.use(
    http.post(NEW_PASSWORD_URL, () => csrfFailureResponse("live-token")),
    http.post(AUTHENTICATE_URL, async ({ request }) => {
      const body = (await request.json()) as { csrf_token?: string };
      authenticate_tokens.push(body.csrf_token);
      // The re-authentication request fails CSRF validation too, which is what makes
      // re_authenticate re-enter itself.
      return csrfFailureResponse("live-token");
    }),
  );

  const store = makeStoreWithAuthn();

  // re_authenticate is re-entrant: the /authenticate request it fires runs through
  // customBaseQuery, so its own CSRF failure calls re_authenticate again from inside the call that
  // is still running. If that nested call waits for the in-flight promise, the promise waits for
  // itself and this await never returns - the test fails on the jest timeout rather than on an
  // assertion, which is exactly the symptom a user gets: a request that never comes back.
  await store.dispatch(
    resetPasswordApi.endpoints.postSetNewPassword.initiate({ email_code: "code", password: "password" }),
  );

  // The re-authentication must not fire a second /authenticate request either.
  expect(authenticate_tokens).toEqual(["live-token"]);
});

test("refreshes the csrf token when a request without a body is rejected as an invalid session", async () => {
  let get_count = 0;

  mswServer.use(
    http.get(RESET_PASSWORD_SERVICE_URL, () => {
      get_count += 1;
      if (get_count === 1) {
        return HttpResponse.json({
          type: "test error",
          error: true,
          payload: { message: "resetpw.invalid_session", csrf_token: "token-from-dead-session" },
        });
      }
      // The invalidated session is replaced, and the new session hands out its own token.
      return HttpResponse.json({
        type: "test success",
        payload: { csrf_token: "fresh-token", state: { captcha: { completed: false }, email: { completed: false } } },
      });
    }),
  );

  const store = makeStore();

  await store.dispatch(resetPasswordApi.endpoints.getResetPasswordState.initiate());

  expect(store.getState().config.csrf_token).toEqual("fresh-token");
});
