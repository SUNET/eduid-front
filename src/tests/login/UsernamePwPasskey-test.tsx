import userEvent from "@testing-library/user-event";
import { IndexMain } from "components/IndexMain";
import { ThemeProvider } from "components/Common/ThemeContext";
import { UsernamePw } from "components/Login/UsernamePw";
import { LOGIN_BASE_PATH } from "helperFunctions/paths";
import { http, HttpResponse } from "msw";
import React from "react";
import { mswServer } from "setupTests";
import { defaultDashboardTestState } from "../helperFunctions/DashboardTestApp-rtl";
import {
  act,
  loginTestState,
  render,
  screen,
  waitFor,
} from "../helperFunctions/LoginTestApp-rtl";

const LOGIN_SERVICE_URL = "https://idp.eduid.docker/services/idp";
const TEST_REF = "abc987";

const credentialsGet = jest.fn();

const originalCredentials = Object.getOwnPropertyDescriptor(
  navigator,
  "credentials",
);
const originalPublicKeyCredential = Object.getOwnPropertyDescriptor(
  globalThis,
  "PublicKeyCredential",
);

function restoreWebAuthnGlobals() {
  if (originalCredentials) {
    Object.defineProperty(navigator, "credentials", originalCredentials);
  } else {
    delete (navigator as { credentials?: unknown }).credentials;
  }
  if (originalPublicKeyCredential) {
    Object.defineProperty(
      globalThis,
      "PublicKeyCredential",
      originalPublicKeyCredential,
    );
  } else {
    delete (globalThis as { PublicKeyCredential?: unknown })
      .PublicKeyCredential;
  }
}
const fakeCredential = {
  toJSON: () => ({
    id: "cred-id",
    rawId: "cred-id",
    type: "public-key",
    response: { clientDataJSON: "x", authenticatorData: "x", signature: "x" },
    clientExtensionResults: {},
  }),
};

let bodies: { webauthn_response?: unknown }[] = [];
const challenges = () => bodies.filter((b) => !b.webauthn_response);
const submissions = () => bodies.filter((b) => b.webauthn_response);
const flush = () => act(() => new Promise<void>((r) => setTimeout(r, 100)));

const state = {
  config: {
    ...defaultDashboardTestState.config,
    login_service_url: LOGIN_SERVICE_URL,
  },
  login: {
    ...loginTestState.login,
    ref: TEST_REF,
    authn_options: {
      webauthn: true,
      swedish_eid: false,
      freja_eid: false,
      eidas: false,
    },
  },
};

beforeEach(() => {
  bodies = [];
  Object.defineProperty(globalThis, "PublicKeyCredential", {
    configurable: true,
    writable: true,
    value: { parseRequestOptionsFromJSON: (o: unknown) => o },
  });
  Object.defineProperty(navigator, "credentials", {
    configurable: true,
    value: { get: credentialsGet },
  });
  credentialsGet.mockImplementation((opts: CredentialRequestOptions) =>
    opts.mediation === "conditional"
      ? new Promise((_, reject) =>
          opts.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError")),
          ),
        )
      : Promise.resolve(fakeCredential),
  );
  mswServer.use(
    http.post(`${LOGIN_SERVICE_URL}/mfa_auth`, async ({ request }) => {
      const body = (await request.json()) as { webauthn_response?: unknown };
      bodies.push(body);
      return HttpResponse.json({
        type: "test response",
        payload: body.webauthn_response
          ? { finished: true }
          : {
              finished: false,
              webauthn_options: { challenge: "c", allowCredentials: [] },
            },
      });
    }),
  );
});

afterEach(() => {
  restoreWebAuthnGlobals();
  credentialsGet.mockReset();
});

test("passkey login does not POST a new challenge after a finished credential submission", async () => {
  render(
    <React.StrictMode>
      <ThemeProvider>
        <UsernamePw />
      </ThemeProvider>
    </React.StrictMode>,
    { state },
  );
  await waitFor(() => expect(challenges()).toHaveLength(1));

  await userEvent.click(
    screen.getByRole("button", { name: /log in with passkey/i }),
  );
  await waitFor(() => expect(submissions()).toHaveLength(1));
  await flush();

  // initial conditional challenge + fresh challenge for the button click
  expect(challenges()).toHaveLength(2);
  expect(submissions()).toHaveLength(1);
  expect(bodies).toHaveLength(3);
});

test("passkey button fetches a fresh challenge instead of reusing the consumed one", async () => {
  let n = 0;
  mswServer.use(
    http.post(`${LOGIN_SERVICE_URL}/mfa_auth`, async ({ request }) => {
      const body = (await request.json()) as { webauthn_response?: unknown };
      bodies.push(body);
      if (body.webauthn_response) {
        return HttpResponse.json({
          type: "test response",
          payload: { finished: true },
        });
      }
      n += 1;
      return HttpResponse.json({
        type: "test response",
        payload: {
          finished: false,
          webauthn_options: { challenge: `c${n}`, allowCredentials: [] },
        },
      });
    }),
  );
  render(
    <ThemeProvider>
      <UsernamePw />
    </ThemeProvider>,
    { state },
  );
  await waitFor(() => expect(challenges()).toHaveLength(1));
  await waitFor(() =>
    expect(credentialsGet).toHaveBeenCalledWith(
      expect.objectContaining({
        mediation: "conditional",
        publicKey: expect.objectContaining({ challenge: "c1" }),
      }),
    ),
  );

  await userEvent.click(
    screen.getByRole("button", { name: /log in with passkey/i }),
  );
  await waitFor(() => expect(submissions()).toHaveLength(1));

  expect(challenges()).toHaveLength(2);
  const staged = credentialsGet.mock.calls
    .map(([o]) => o as CredentialRequestOptions)
    .filter((o) => o.mediation !== "conditional");
  expect(staged).toHaveLength(1);
  expect(staged[0].publicKey).toEqual(
    expect.objectContaining({ challenge: "c2" }),
  );
});

test("passkey login via IndexMain calls /next after the submission without extra /mfa_auth requests", async () => {
  let nextCalls = 0;
  mswServer.use(
    http.post(`${LOGIN_SERVICE_URL}/next`, () => {
      nextCalls += 1;
      return HttpResponse.json({
        type: "test response",
        payload:
          nextCalls === 1
            ? { action: "USERNAMEPASSWORD", target: "/foo" }
            : { action: "FINISHED", target: "/foo" },
      });
    }),
  );

  render(<IndexMain />, {
    routes: [`${LOGIN_BASE_PATH}/password/${TEST_REF}`],
    state,
  });

  const button = await screen.findByRole("button", {
    name: /log in with passkey/i,
  });
  await waitFor(() => expect(challenges()).toHaveLength(1));
  await userEvent.click(button);

  await waitFor(() => expect(nextCalls).toBe(2));
  await flush();
  // initial challenge + fresh challenge for the button click + 1 submission
  expect(challenges()).toHaveLength(2);
  expect(bodies).toHaveLength(3);
  expect(submissions()).toHaveLength(1);
});

test("passkey button waits for an in-flight conditional credential submission", async () => {
  let inFlight = 0;
  let maxInFlight = 0;
  let releaseGate!: () => void;
  const gate = new Promise<void>((r) => (releaseGate = r));
  let resolveConditional!: (c: unknown) => void;

  credentialsGet.mockImplementation((opts: CredentialRequestOptions) =>
    opts.mediation === "conditional"
      ? new Promise((resolve) => (resolveConditional = resolve))
      : // distinct payload, otherwise RTK Query dedupes identical in-flight args
        Promise.resolve({
          toJSON: () => ({ ...fakeCredential.toJSON(), id: "button-cred" }),
        }),
  );
  mswServer.use(
    http.post(`${LOGIN_SERVICE_URL}/mfa_auth`, async ({ request }) => {
      const body = (await request.json()) as { webauthn_response?: unknown };
      bodies.push(body);
      if (!body.webauthn_response) {
        return HttpResponse.json({
          type: "test response",
          payload: {
            finished: false,
            webauthn_options: { challenge: "c", allowCredentials: [] },
          },
        });
      }
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await gate;
      inFlight -= 1;
      return HttpResponse.json({
        type: "test response",
        payload: { finished: true },
      });
    }),
  );

  render(
    <ThemeProvider>
      <UsernamePw />
    </ThemeProvider>,
    { state },
  );
  await waitFor(() => expect(resolveConditional).toBeDefined());
  // conditional UI yields a credential -> gated submission starts
  await act(async () => resolveConditional(fakeCredential));
  await waitFor(() => expect(inFlight).toBe(1));

  await userEvent.click(
    screen.getByRole("button", { name: /log in with passkey/i }),
  );
  await flush();
  expect(maxInFlight).toBe(1);

  await act(async () => releaseGate());
  await flush();
  expect(maxInFlight).toBe(1);
  expect(submissions()).toHaveLength(1);
});
