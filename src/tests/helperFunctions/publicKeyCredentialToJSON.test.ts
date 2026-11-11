import { credentialToJSON } from "helperFunctions/publicKeyCredentialToJSON";

const buf = (...b: number[]) => new Uint8Array(b).buffer;

function makeCredential(response: object, extra: object = {}) {
  return {
    id: "AQID",
    rawId: buf(1, 2, 3),
    type: "public-key",
    authenticatorAttachment: "cross-platform",
    getClientExtensionResults: () => ({ prf: { results: { first: buf(251, 255) } }, credProps: { rk: true } }),
    response,
    ...extra,
  } as unknown as PublicKeyCredential;
}

describe("credentialToJSON", () => {
  test("uses native toJSON when present", () => {
    const native = { id: "native" };
    expect(credentialToJSON(makeCredential({}, { toJSON: () => native }))).toBe(native);
  });

  test("assertion without toJSON is serialized to base64url JSON", () => {
    const cred = makeCredential({
      clientDataJSON: buf(1),
      authenticatorData: buf(2),
      signature: buf(251, 255),
      userHandle: null,
    });
    const json = JSON.parse(JSON.stringify(credentialToJSON(cred)));
    expect(json).toEqual({
      id: "AQID",
      rawId: "AQID",
      type: "public-key",
      authenticatorAttachment: "cross-platform",
      clientExtensionResults: { prf: { results: { first: "-_8" } }, credProps: { rk: true } },
      response: { clientDataJSON: "AQ", authenticatorData: "Ag", signature: "-_8" },
    });
  });

  test("attestation without toJSON includes attachment and transports", () => {
    const cred = makeCredential({
      clientDataJSON: buf(1),
      attestationObject: buf(3),
      getTransports: () => ["usb"],
    });
    const json = JSON.parse(JSON.stringify(credentialToJSON(cred)));
    expect(json.response).toEqual({ clientDataJSON: "AQ", attestationObject: "Aw", transports: ["usb"] });
    expect(json.authenticatorAttachment).toBe("cross-platform");
  });

  test("missing or throwing getTransports is tolerated", () => {
    const throwing = makeCredential({
      clientDataJSON: buf(1),
      attestationObject: buf(3),
      getTransports: () => {
        throw new TypeError("nope");
      },
    });
    expect(JSON.parse(JSON.stringify(credentialToJSON(throwing))).response.transports).toBeUndefined();
    const missing = makeCredential({ clientDataJSON: buf(1), attestationObject: buf(3) });
    expect(JSON.parse(JSON.stringify(credentialToJSON(missing))).response.transports).toBeUndefined();
  });

  test("falls back when native toJSON throws TypeError, rethrows other errors", () => {
    const resp = { clientDataJSON: buf(1), attestationObject: buf(3) };
    const broken = makeCredential(resp, { toJSON: () => { throw new TypeError("x"); } });
    expect(credentialToJSON(broken)).toHaveProperty("response.attestationObject", "Aw");
    const other = makeCredential(resp, { toJSON: () => { throw new Error("boom"); } });
    expect(() => credentialToJSON(other)).toThrow("boom");
  });

  test("unrecognized response throws TypeError", () => {
    expect(() => credentialToJSON(makeCredential({}))).toThrow(TypeError);
  });
});
