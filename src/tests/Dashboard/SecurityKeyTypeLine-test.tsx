import { CredentialType } from "apis/eduidSecurity";
import { IndexMain } from "components/IndexMain";
import { act } from "react";
import { defaultDashboardTestState, render, screen, within } from "../helperFunctions/DashboardTestApp-rtl";

function credential(overrides: Partial<CredentialType>): CredentialType {
  return {
    authenticator: "cross-platform",
    created_ts: "2026-01-01",
    credential_type: "security.webauthn_credential_type",
    description: "my key",
    key: "key",
    success_ts: "2026-01-02",
    used_for_login: false,
    verified: false,
    mfa_approved: false,
    ...overrides,
  };
}

function showSecuritySettings(credentials: CredentialType[]) {
  render(<IndexMain />, { state: { ...defaultDashboardTestState, security: { credentials } } });
  const nav = screen.getByRole("link", { name: "Security" });
  act(() => {
    nav.click();
  });
}

test("shows the type of a security key and what is known about it", () => {
  showSecuritySettings([
    credential({
      key: "a",
      description: "work key",
      kind: "security_key",
      discoverable: "no",
      authenticator_name: "YubiKey 5 NFC",
    }),
  ]);

  const figure = screen.getByRole("figure");
  expect(within(figure).getByText("work key")).toBeInTheDocument();
  expect(within(figure).getByLabelText("key type")).toHaveTextContent(
    "Type: Security key · YubiKey 5 NFC · second factor only",
  );
  // the icon has the type as its text and not the path of the file
  expect(within(figure).getByRole("img", { hidden: true })).toHaveAttribute("alt", "Security key");
});

test("shows a passkey with the name of its provider", () => {
  showSecuritySettings([
    credential({
      key: "b",
      description: "laptop",
      authenticator: "platform",
      kind: "passkey",
      discoverable: "unknown",
      authenticator_id: "fbfc3007-154e-4ecc-8c0b-6e020557d7bd",
    }),
  ]);

  const figure = screen.getByRole("figure");
  expect(within(figure).getByLabelText("key type")).toHaveTextContent("Type: Passkey · Apple Passwords");
  expect(within(figure).getByRole("img", { hidden: true })).toHaveAttribute("alt", "Passkey");
});

function iconSource() {
  return within(screen.getByRole("figure")).getByRole("img", { hidden: true }).getAttribute("src");
}

describe("the icon", () => {
  test("a passkey gets the passkey icon, also when a security key was requested", () => {
    showSecuritySettings([
      credential({ key: "c", authenticator: "cross-platform", kind: "passkey", discoverable: "unknown" }),
    ]);
    expect(iconSource()).toBe("pass-key-gray.svg");
  });

  test("a security key gets the security key icon, also when this device was requested", () => {
    showSecuritySettings([credential({ key: "e", authenticator: "platform", kind: "security_key" })]);
    expect(iconSource()).toBe("security-key-gray.svg");
  });

  test("a credential of unknown type gets the icon of the attachment that was requested", () => {
    showSecuritySettings([credential({ key: "f", authenticator: "platform", kind: "unknown" })]);
    expect(iconSource()).toBe("pass-key-gray.svg");
  });

  test("without a type from the backend the icon follows the attachment, as before", () => {
    showSecuritySettings([credential({ key: "g", authenticator: "cross-platform" })]);
    expect(iconSource()).toBe("security-key-gray.svg");
  });
});

test("looks as before when the backend sends no type", () => {
  showSecuritySettings([credential({ key: "d", description: "old key", authenticator: "cross-platform" })]);

  const figure = screen.getByRole("figure");
  expect(within(figure).getByText("old key")).toBeInTheDocument();
  expect(within(figure).queryByLabelText("key type")).not.toBeInTheDocument();
  // the icon is chosen from the attachment, and has a text
  expect(within(figure).getByRole("img", { hidden: true })).toHaveAttribute("alt", "Security key");
});
