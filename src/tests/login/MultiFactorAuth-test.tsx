import userEvent from "@testing-library/user-event";
import { MultiFactorAuth } from "components/Login/MultiFactorAuth";
import { http, HttpResponse } from "msw";
import { mswServer } from "setupTests";
import { initialState as configInitialState } from "slices/IndexConfig";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

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
  expect(screen.queryByText(/Having issues using a security key?/i)).not.toBeInTheDocument();
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
  expect(screen.getByText(/Having issues using a security key?/i)).toBeInTheDocument();

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

test("shows SverigeID recovery option only when oidceid_service_url is configured", async () => {
  render(<MultiFactorAuth />, {
    state: {
      config: {
        ...configInitialState,
        oidceid_service_url: "https://oidceid.eduid.docker/services/oidceid",
      },
      login: {
        ...loginTestState.login,
        authn_options: {
          swedish_eid: true,
          freja_eid: false,
          eidas: false,
          webauthn: false,
        },
      },
    },
  });
  await userEvent.click(screen.getByRole("combobox"));
  await waitFor(() => {
    expect(screen.getByText("SverigeID")).toBeInTheDocument();
  });
});

test("does not show SverigeID recovery option without oidceid_service_url", async () => {
  render(<MultiFactorAuth />, {
    state: {
      config: configInitialState,
      login: {
        ...loginTestState.login,
        authn_options: {
          swedish_eid: true,
          freja_eid: false,
          eidas: false,
          webauthn: false,
        },
      },
    },
  });
  await userEvent.click(screen.getByRole("combobox"));
  await waitFor(() => {
    expect(screen.getByText("BankID")).toBeInTheDocument();
  });
  expect(screen.queryByText("SverigeID")).not.toBeInTheDocument();
});

const OIDCEID_URL = "https://oidceid.eduid.docker/services/oidceid";

function captureMfaAuthenticate() {
  const captured: { body?: Record<string, unknown> } = {};
  mswServer.use(
    http.post(`${OIDCEID_URL}/mfa-authenticate`, async ({ request }) => {
      captured.body = (await request.json()) as Record<string, unknown>;
      // no location, so the test does not try to navigate
      return HttpResponse.json({ type: "test response", payload: {} });
    }),
  );
  return captured;
}

async function selectSverigeID() {
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByText("SverigeID"));
}

test("selecting SverigeID at login posts mfa-authenticate with loginMfaAuthn and the login ref", async () => {
  globalThis.history.pushState({}, "", "/login/abc-ref");
  const captured = captureMfaAuthenticate();
  render(<MultiFactorAuth />, {
    state: {
      config: { ...configInitialState, oidceid_service_url: OIDCEID_URL },
      login: {
        ...loginTestState.login,
        ref: "abc-ref",
        authn_options: { swedish_eid: true, freja_eid: false, eidas: false, webauthn: false },
      },
    },
  });
  await selectSverigeID();
  await waitFor(() => expect(captured.body).toBeDefined());
  expect(captured.body).toEqual({
    method: "sverigeid",
    frontend_action: "loginMfaAuthn",
    frontend_state: "abc-ref",
  });
  globalThis.history.pushState({}, "", "/");
});
