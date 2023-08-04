import {
  registerWebauthn,
  RegisterWebauthnResponse,
  RemoveWebauthnTokensRequest,
  RemoveWebauthnTokensResponse,
  requestCredentials,
  RequestCredentialsResponse,
} from "apis/eduidSecurity";
import { DashboardMain } from "components/Dashboard/DashboardMain";
import { act } from "react-dom/test-utils";
import { mswServer, rest } from "setupTests";
import securitySlice, { initialState } from "slices/Security";
import { fireEvent, render, screen, waitFor } from "./helperFunctions/DashboardTestApp-rtl";

async function linkToAdvancedSettings() {
  // Navigate to Advanced settings
  const nav = screen.getByRole("link", { name: "Advanced settings" });
  act(() => {
    nav.click();
  });

  expect(screen.getByRole("heading", { name: /Make your eduID more secure/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "security key" })).toBeEnabled();
}

test("renders security key as expected, not security key added", async () => {
  render(<DashboardMain />);
  await linkToAdvancedSettings();
});

test("renders security key as expected, with added security key", async () => {
  render(<DashboardMain />, {
    state: {
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

  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByRole("cell", { name: "touchID" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Verify" })).toBeEnabled();
});

test("renders modals onclick security key button", async () => {
  render(<DashboardMain />);
  await linkToAdvancedSettings();
  const securityKeyButton = screen.getByRole("button", { name: "security key" });
  // Click the 'security key' button
  act(() => {
    securityKeyButton.click();
  });
  expect(screen.getByRole("heading", { name: /Add a name/i })).toBeInTheDocument();
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "security key" } });
  expect(input).toHaveValue("security key");

  const addSecurityKeyButton = screen.getByRole("button", { name: /ok/i });
  expect(addSecurityKeyButton).toBeEnabled();
});

test("should not display close button when only one security key is added", async () => {
  render(<DashboardMain />, {
    state: {
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
        ],
      },
    },
  });
  await linkToAdvancedSettings();

  const CloseButton = screen.getAllByLabelText("Close")[1];
  expect(CloseButton).toBeUndefined();
});

test("can remove a security key", async () => {
  render(<DashboardMain />, {
    state: {
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

  const CloseButton = screen.getAllByLabelText("Close")[1];
  expect(CloseButton).toBeEnabled();
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
    rest.post("webauthn/remove", (req, res, ctx) => {
      const body = req.body as RemoveWebauthnTokensRequest;
      if (body.credential_key != credential_key) {
        return res(ctx.status(400));
      }

      return res(ctx.json({ type: "test response", payload: response.credentials }));
    })
  );

  render(<DashboardMain />, {
    state: { security: { credentials: response.credentials } },
  });
  await linkToAdvancedSettings();
  await waitFor(() => {
    expect(screen.getByRole("table")).toBeInTheDocument();
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
