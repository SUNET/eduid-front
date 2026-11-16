import { describeCredential } from "helperFunctions/credentialDescriptor";
import { PASSKEY_PROVIDERS } from "helperFunctions/passkeyProviders";

describe("passkey provider table", () => {
  test("keys are lower case AAGUIDs and names are not empty", () => {
    for (const [aaguid, name] of Object.entries(PASSKEY_PROVIDERS)) {
      expect(aaguid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      expect(name.trim()).not.toBe("");
    }
  });

  test("the zero AAGUID is not an entry", () => {
    expect(PASSKEY_PROVIDERS["00000000-0000-0000-0000-000000000000"]).toBeUndefined();
  });
});

describe("describeCredential", () => {
  test("a credential without the new fields is unknown", () => {
    expect(describeCredential({})).toEqual({
      name: null,
      nameSource: null,
      kind: "unknown",
      discoverable: "unknown",
    });
  });

  test("nulls from the backend are unknown", () => {
    const d = describeCredential({
      authenticator_id: null,
      authenticator_name: null,
      attestation_format: null,
      kind: null,
      discoverable: null,
    });
    expect(d).toEqual({
      name: null,
      nameSource: null,
      kind: "unknown",
      discoverable: "unknown",
    });
  });

  test("the name MDS publishes wins over the provider table", () => {
    const d = describeCredential({
      authenticator_id: "d548826e-79b4-db40-a3d8-11116f7e8349",
      authenticator_name: "Name from MDS",
      kind: "security_key",
      discoverable: "no",
    });
    expect(d).toEqual({
      name: "Name from MDS",
      nameSource: "mds",
      kind: "security_key",
      discoverable: "no",
    });
  });

  test("the provider table names a passkey MDS does not know, and makes it a passkey", () => {
    const d = describeCredential({
      authenticator_id: "D548826E-79B4-DB40-A3D8-11116F7E8349",
      kind: "unknown",
    });
    expect(d).toEqual({
      name: "Bitwarden",
      nameSource: "provider_table",
      kind: "passkey",
      discoverable: "unknown",
    });
  });

  test("the provider table does not override a kind the backend knows", () => {
    const d = describeCredential({
      authenticator_id: "ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4",
      kind: "security_key",
    });
    expect(d.kind).toBe("security_key");
  });

  test("apple attestation names an authenticator that is in no list", () => {
    const d = describeCredential({
      authenticator_id: "f24a8e70-d0d3-f82c-2937-32523cc4de5a",
      attestation_format: "apple",
      kind: "passkey",
    });
    expect(d).toEqual({
      name: "Apple",
      nameSource: "attestation_format",
      kind: "passkey",
      discoverable: "unknown",
    });
  });

  test("an unnamed authenticator stays unnamed", () => {
    const d = describeCredential({
      authenticator_id: "84039877-a54b-dfbb-04a8-2df2fa2a116e",
      attestation_format: "none",
      kind: "passkey",
      discoverable: "unknown",
    });
    expect(d).toEqual({
      name: null,
      nameSource: null,
      kind: "passkey",
      discoverable: "unknown",
    });
  });

  test("a certificate key identifier is not looked up as an AAGUID", () => {
    const d = describeCredential({
      authenticator_id: "d002f4c0a88a7c27d5201c6a51a0e0546b6d8f75",
    });
    expect(d.name).toBeNull();
  });
});
