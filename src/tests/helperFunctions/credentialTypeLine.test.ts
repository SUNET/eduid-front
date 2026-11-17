import { CredentialType } from "apis/eduidSecurity";
import { describeKeyType, fallbackKeyTypeLabel } from "helperFunctions/credentialTypeLine";
import { createIntl } from "react-intl";
import extractedMessages from "translation/extractedMessages.json";

// no translations loaded: the English default messages are used
const intl = createIntl({ locale: "en", defaultLocale: "en", onError: () => undefined });

function credential(overrides: Partial<CredentialType>): CredentialType {
  return {
    authenticator: "cross-platform",
    created_ts: "2026-01-01",
    credential_type: "security.webauthn_credential_type",
    description: "my key",
    key: "key",
    success_ts: "2026-01-01",
    used_for_login: false,
    verified: false,
    mfa_approved: false,
    ...overrides,
  };
}

describe("describeKeyType", () => {
  test("says nothing when the backend did not send the type (an older backend)", () => {
    expect(describeKeyType(intl, credential({}))).toBeUndefined();
    expect(describeKeyType(intl, credential({ kind: null }))).toBeUndefined();
  });

  test("a security key that cannot work alone is a second factor only", () => {
    const info = describeKeyType(
      intl,
      credential({ kind: "security_key", discoverable: "no", authenticator_name: "YubiKey 5 NFC" }),
    );
    expect(info?.kind).toBe("security_key");
    expect(info?.label).toBe("Security key");
    expect(info?.line).toBe("Security key · YubiKey 5 NFC · second factor only");
  });

  test("a security key that probably holds a passkey is hedged, not stated", () => {
    const info = describeKeyType(intl, credential({ kind: "security_key", discoverable: "likely" }));
    expect(info?.line).toBe("Security key · may work without a username");
    expect(info?.line).not.toMatch(/passkey on/i);
  });

  test("a security key that is known to hold a passkey says so", () => {
    const info = describeKeyType(intl, credential({ kind: "security_key", discoverable: "yes" }));
    expect(info?.label).toBe("Passkey on a security key");
    expect(info?.kind).toBe("security_key");
  });

  test("an unknown discoverability adds nothing", () => {
    const info = describeKeyType(intl, credential({ kind: "security_key", discoverable: "unknown" }));
    expect(info?.line).toBe("Security key");
  });

  test("a passkey is named by the provider table", () => {
    const info = describeKeyType(
      intl,
      credential({
        kind: "passkey",
        discoverable: "unknown",
        authenticator_id: "ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4",
      }),
    );
    expect(info?.kind).toBe("passkey");
    expect(info?.line).toBe("Passkey · Google Password Manager");
  });

  test("an Apple attestation names a passkey that is in no list", () => {
    const info = describeKeyType(
      intl,
      credential({
        kind: "passkey",
        authenticator_id: "f24a8e70-d0d3-f82c-2937-32523cc4de5a",
        attestation_format: "apple",
      }),
    );
    expect(info?.line).toBe("Passkey · Apple");
  });

  test("an unnamed passkey stays unnamed", () => {
    const info = describeKeyType(
      intl,
      credential({
        kind: "passkey",
        authenticator_id: "84039877-a54b-dfbb-04a8-2df2fa2a116e",
        attestation_format: "none",
      }),
    );
    expect(info?.line).toBe("Passkey");
  });

  test("a credential that cannot be told apart gets a neutral type", () => {
    const info = describeKeyType(intl, credential({ kind: "unknown" }));
    expect(info?.kind).toBe("unknown");
    expect(info?.line).toBe("Security key or passkey");
  });

  test("a provider in the table makes an unknown kind a passkey", () => {
    const info = describeKeyType(
      intl,
      credential({ kind: "unknown", authenticator_id: "d548826e-79b4-db40-a3d8-11116f7e8349" }),
    );
    expect(info?.kind).toBe("passkey");
    expect(info?.line).toBe("Passkey · Bitwarden");
  });
});

describe("fallbackKeyTypeLabel", () => {
  test("uses the requested attachment when the backend sent no type", () => {
    expect(fallbackKeyTypeLabel(intl, credential({ authenticator: "cross-platform" }))).toBe("Security key");
    expect(fallbackKeyTypeLabel(intl, credential({ authenticator: "platform" }))).toBe("Passkey");
  });
});

// This asserts on the extracted messages: languages/*.json are maintained in Transifex and not updated here
test.each([
  "securityKeyTable.type",
  "common.securityKey",
  "securityKeyTable.type.passkey",
  "securityKeyTable.type.passkeyOnSecurityKey",
  "securityKeyTable.type.unknown",
  "securityKeyTable.discoverable.no",
  "securityKeyTable.discoverable.likely",
])("%s has an extracted message", (id) => {
  const messages = extractedMessages as { [key: string]: { string: string } };
  expect(messages[id]?.string).toEqual(expect.any(String));
});
