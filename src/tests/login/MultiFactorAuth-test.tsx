import userEvent from "@testing-library/user-event";
import { MultiFactorAuth } from "components/Login/MultiFactorAuth";
import { initialState as configInitialState } from "slices/IndexConfig";
import { loginTestState, render, screen, waitFor } from "../helperFunctions/LoginTestApp-rtl";

test("shows no recovery options when the authentication option is disabled", async () => {
  render(<MultiFactorAuth />, {
    state: {
      config: configInitialState,
      login: {
        ...loginTestState.login,
        authn_options: { swedish_eid: false, freja_eid: false, eidas: false, webauthn: false },
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
        authn_options: { swedish_eid: true, freja_eid: true, eidas: true, webauthn: false },
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
        authn_options: { swedish_eid: false, freja_eid: false, eidas: false, webauthn: true },
      },
    },
  });
  const useSecurityKeyButton = screen.getByRole("button", { name: /^use security key/i });
  expect(useSecurityKeyButton).toBeEnabled();
});
