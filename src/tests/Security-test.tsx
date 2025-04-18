import {
  registerWebauthn,
  RegisterWebauthnResponse,
  RemoveWebauthnTokensRequest,
  RemoveWebauthnTokensResponse,
  requestCredentials,
  RequestCredentialsResponse,
} from "apis/eduidSecurity";
import { IndexMain } from "components/IndexMain";
import { act } from "react";
import { mswServer, rest } from "setupTests";
import securitySlice, { initialState } from "slices/Security";
import { defaultDashboardTestState, render, screen, waitFor, within } from "./helperFunctions/DashboardTestApp-rtl";

async function linkToAdvancedSettings() {
  // Navigate to Advanced settings
  const nav = screen.getByRole("link", { name: "Security" });
  act(() => {
    nav.click();
  });
  expect(screen.getByRole("button", { name: "security key icon security key" })).toBeEnabled();
  expect(screen.getByRole("heading", { level: 2, name: "Two-factor Authentication (2FA)" })).toBeInTheDocument();
}

beforeEach(() => {
  // mock window.scroll for the notification middleware that scrolls to the top of the screen
  window.scroll = jest.fn();
});

test("renders security key as expected, not security key added", async () => {
  render(<IndexMain />);
  await linkToAdvancedSettings();
});

test("renders security key as expected, with added security key", async () => {
  render(<IndexMain />, {
    state: {
      ...defaultDashboardTestState,
      security: {
        credentials: [
          {
            created_ts: "2021-12-02",
            credential_type: "security.webauthn_credential_type",
            description: "touchID",
            key: "dummy dummy",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
          {
            created_ts: "2022-10-14",
            credential_type: "security.password_credential_type",
            description: null,
            key: "dummy key1",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
        ],
      },
    },
  });

  await linkToAdvancedSettings();

  expect(screen.getByRole("figure")).toBeInTheDocument();
  expect(screen.getByText("touchID")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "BankID" })).toBeEnabled();
  expect(screen.getByRole("button", { name: "Freja+" })).toBeEnabled();
});

// test("renders modals onclick security key button", async () => {
//   render(<IndexMain />);
//   await linkToAdvancedSettings();
//   const securityKeyButton = screen.getByRole("button", { name: "security key" });
//   // Click the 'security key' button
//   act(() => {
//     securityKeyButton.click();
//   });
//   expect(screen.getByRole("heading", { name: /Add a name/i })).toBeInTheDocument();
//   const input = screen.getAllByRole("textbox")[1];
//   fireEvent.change(input, { target: { value: "security key" } });
//   expect(input).toHaveValue("security key");

//   const addSecurityKeyButton = screen.getByRole("button", { name: /ok/i });
//   expect(addSecurityKeyButton).toBeEnabled();
// });

test("can remove a security key", async () => {
  render(<IndexMain />, {
    state: {
      ...defaultDashboardTestState,
      security: {
        credentials: [
          {
            created_ts: "2021-12-02",
            credential_type: "security.webauthn_credential_type",
            description: "touchID",
            key: "dummy dummy",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
          {
            created_ts: "2021-12-02",
            credential_type: "security.webauthn_credential_type",
            description: "extra touchID",
            key: "dummy dummy2",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
          {
            created_ts: "2022-10-14",
            credential_type: "security.password_credential_type",
            description: null,
            key: "dummy key1",
            success_ts: "2022-10-17",
            used_for_login: false,
            verified: false,
          },
        ],
      },
    },
  });
  await linkToAdvancedSettings();

  const RemoveButton = screen.getAllByLabelText("Remove")[1];
  expect(RemoveButton).toBeEnabled();
});

test("api call webauthn/remove", async () => {
  const credential_key = "dummy_dummy";
  const response: RemoveWebauthnTokensResponse = {
    credentials: [
      {
        created_ts: "2022-10-14",
        credential_type: "security.password_credential_type",
        description: null,
        key: "dummy key1",
        success_ts: "2022-10-17",
        used_for_login: false,
        verified: false,
      },
      {
        created_ts: "2021-12-02",
        credential_type: "security.webauthn_credential_type",
        description: "touchID",
        key: "dummy_dummy3",
        success_ts: "2022-10-17",
        used_for_login: false,
        verified: false,
      },
    ],
  };

  mswServer.use(
    rest.post("webauthn/remove", async (req, res, ctx) => {
      const body = (await req.json()) as RemoveWebauthnTokensRequest;
      if (body.credential_key != credential_key) {
        return res(ctx.status(400));
      }

      return res(ctx.json({ type: "test response", payload: response.credentials }));
    })
  );

  render(<IndexMain />, {
    state: { ...defaultDashboardTestState, security: { credentials: response.credentials } },
  });
  await linkToAdvancedSettings();
  await waitFor(() => {
    expect(screen.getByRole("figure")).toBeInTheDocument();
  });
});

test("security reducer, request credentials", async () => {
  const payload: RequestCredentialsResponse = {
    credentials: [
      {
        created_ts: "2022-10-14",
        credential_type: "security.password_credential_type",
        description: null,
        key: "dummy key1",
        success_ts: "2022-10-17",
        used_for_login: false,
        verified: false,
      },
      {
        created_ts: "2021-12-02",
        credential_type: "security.webauthn_credential_type",
        description: "touchID",
        key: "dummy_dummy3",
        success_ts: "2022-10-17",
        used_for_login: false,
        verified: false,
      },
    ],
  };
  const action = { type: requestCredentials.fulfilled.type, payload: payload };
  const state = securitySlice.reducer(initialState, action);
  expect(state).toEqual({
    ...initialState,
    credentials: action.payload.credentials,
  });
});

test("security reducer, registerWebauthn", async () => {
  const payload: RegisterWebauthnResponse = {
    webauthn_attestation: {
      attestationObject: "dummy",
      clientDataJSON: "dummy",
      credentialId: "dummy",
    },
    credentials: [
      {
        created_ts: "2021-12-02",
        credential_type: "security.webauthn_credential_type",
        description: "touchID",
        key: "dummy_dummy3",
        success_ts: "2022-10-17",
        used_for_login: false,
        verified: false,
      },
    ],
  };
  const action = { type: registerWebauthn.fulfilled.type, payload: payload };
  const state = securitySlice.reducer(initialState, action);
  expect(state).toEqual({
    ...initialState,
    credentials: action.payload.credentials,
    webauthn_attestation: action.payload.webauthn_attestation,
  });
});

test("render the security key table without any security keys", async () => {
  render(<IndexMain />);
  await linkToAdvancedSettings();

  expect(screen.getByRole("heading", { level: 2, name: "Manage your security keys" })).toBeInTheDocument();
  const figure = screen.getByRole("figure");
  expect(within(figure).getByText("No security key has been added")).toBeInTheDocument();
});
