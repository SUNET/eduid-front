import userEvent from "@testing-library/user-event";
import { MultiFactorAuth } from "components/Login/MultiFactorAuth";
import { http, HttpResponse } from "msw";
import React from "react";
import { mswServer } from "setupTests";
import { initialState as configInitialState } from "slices/IndexConfig";
import {
  act,
  loginTestState,
  render,
  screen,
  waitFor,
} from "../helperFunctions/LoginTestApp-rtl";
import { defaultDashboardTestState } from "../helperFunctions/DashboardTestApp-rtl";

test("shows no recovery options when the authentication option is disabled", async () => {
  render(<MultiFactorAuth />, {
    state: {
      config: configInitialState,
      login: {
        ...loginTestState.login,
        authn_options: {
          swedish_eid: false,
          freja_eid: false,
          eidas: false,
          webauthn: false,
        },
      },
    },
  });
  expect(
    screen.queryByText(/Having issues using a security key?/i),
  ).not.toBeInTheDocument();
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
});

test("shows recovery options when auth option is enabled", async () => {
  render(<MultiFactorAuth />, {
    state: {
      config: configInitialState,
      login: {
        ...loginTestState.login,
        authn_options: {
          swedish_eid: true,
          freja_eid: true,
          eidas: true,
          webauthn: false,
        },
      },
    },
  });
  expect(
    screen.getByText(/Having issues using a security key?/i),
  ).toBeInTheDocument();

  const selectElement = screen.getByRole("combobox");
  await userEvent.click(selectElement);

  await waitFor(() => {
    expect(screen.getByText("BankID")).toBeInTheDocument();
    expect(screen.getByText("Freja eID")).toBeInTheDocument();
    expect(screen.getByText("eIDAS")).toBeInTheDocument();
  });
});

test("shows security key options when auth option is enabled", async () => {
  render(<MultiFactorAuth />, {
    state: {
      config: configInitialState,
      login: {
        ...loginTestState.login,
        authn_options: {
          swedish_eid: false,
          freja_eid: false,
          eidas: false,
          webauthn: true,
        },
      },
    },
  });
  const useSecurityKeyButton = screen.getByRole("button", {
    name: /^use security key/i,
  });
  expect(useSecurityKeyButton).toBeEnabled();
});

describe("webauthn /mfa_auth request sequencing", () => {
  const LOGIN_SERVICE_URL = "https://idp.eduid.docker/services/idp";
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

  function mockMfaAuth(finishedOnChallenge = false, withOptions = true) {
    mswServer.use(
      http.post(`${LOGIN_SERVICE_URL}/mfa_auth`, async ({ request }) => {
        const body = (await request.json()) as { webauthn_response?: unknown };
        bodies.push(body);
        return HttpResponse.json({
          type: "test response",
          payload: body.webauthn_response
            ? { finished: true }
            : {
                finished: finishedOnChallenge,
                ...(withOptions && {
                  webauthn_options: { challenge: "c", allowCredentials: [] },
                }),
              },
        });
      }),
    );
  }

  function renderMfa() {
    return render(
      <React.StrictMode>
        <MultiFactorAuth />
      </React.StrictMode>,
      {
        state: {
          config: {
            ...defaultDashboardTestState.config,
            login_service_url: LOGIN_SERVICE_URL,
          },
          login: {
            ...loginTestState.login,
            ref: "abc987",
            authn_options: {
              webauthn: true,
              swedish_eid: false,
              freja_eid: false,
              eidas: false,
            },
          },
        },
      },
    );
  }

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
    credentialsGet.mockImplementation(() => Promise.resolve(fakeCredential));
  });

  afterEach(() => {
    restoreWebAuthnGlobals();
    credentialsGet.mockReset();
  });

  test("StrictMode mount sends a single challenge request", async () => {
    mockMfaAuth();
    renderMfa();
    await waitFor(() => expect(challenges()).toHaveLength(1));
    await flush();
    expect(bodies).toHaveLength(1);
  });

  test("security key click fetches a fresh challenge, submits once, and sends nothing after finished", async () => {
    mockMfaAuth();
    renderMfa();
    await waitFor(() => expect(challenges()).toHaveLength(1));

    await userEvent.click(
      screen.getByRole("button", { name: /^use security key/i }),
    );
    await waitFor(() => expect(submissions()).toHaveLength(1));
    await flush();

    expect(challenges()).toHaveLength(2);
    expect(submissions()).toHaveLength(1);
    expect(bodies).toHaveLength(3);

    // finished:true was reported, so the instance must not POST /mfa_auth again
    await userEvent.click(
      await screen.findByRole("button", { name: /^use security key/i }),
    );
    await flush();
    expect(bodies).toHaveLength(3);
  });

  test("cancelled attempts each get a fresh challenge", async () => {
    mockMfaAuth();
    credentialsGet.mockImplementation(() =>
      Promise.reject(new DOMException("cancelled", "NotAllowedError")),
    );
    renderMfa();
    await waitFor(() => expect(challenges()).toHaveLength(1));

    await userEvent.click(
      screen.getByRole("button", { name: /^use security key/i }),
    );
    await waitFor(() => expect(challenges()).toHaveLength(2));
    await userEvent.click(
      await screen.findByRole("button", { name: /^use security key/i }),
    );
    await waitFor(() => expect(challenges()).toHaveLength(3));
    await flush();

    expect(submissions()).toHaveLength(0);
    expect(bodies).toHaveLength(3);
  });

  test("no requests are sent after the mount response reports finished", async () => {
    mockMfaAuth(true, false);
    renderMfa();
    await waitFor(() => expect(challenges()).toHaveLength(1));
    await flush();

    await userEvent.click(
      await screen.findByRole("button", { name: /^use security key/i }),
    );
    await flush();
    expect(bodies).toHaveLength(1);
  });

  test("finished challenge response that still offers options still submits the assertion", async () => {
    mockMfaAuth(true, true);
    renderMfa();
    await waitFor(() => expect(challenges()).toHaveLength(1));
    await flush();

    await userEvent.click(
      await screen.findByRole("button", { name: /^use security key/i }),
    );
    await waitFor(() => expect(submissions()).toHaveLength(1));
    await flush();
    expect(submissions()).toHaveLength(1);
  });
});
