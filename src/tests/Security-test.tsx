import {
  RemoveWebauthnTokensRequest,
  RemoveWebauthnTokensResponse,
  requestCredentials,
  RequestCredentialsResponse,
} from "apis/eduidSecurity";
import Security from "components/Security";
import { act } from "react-dom/test-utils";
import securitySlice, { initialState } from "reducers/Security";
import { mswServer, rest } from "setupTests";
import { render, screen, waitFor, fireEvent } from "./helperFunctions/DashboardTestApp-rtl";

test("renders security key as expected", async () => {
  render(<Security />);
  expect(screen.getByRole("heading")).toHaveTextContent("Make your eduID more secure");
});

test("renders security key tables with credentials state", async () => {
  render(<Security />, {
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
  await waitFor(() => {
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});

test("renders modals onclick security key", async () => {
  render(<Security />);
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

test("can remove a security key", async () => {
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

  render(<Security />, {
    state: { security: { credentials: response.credentials } },
  });
  await waitFor(() => {
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});

test("request credentials", async () => {
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
