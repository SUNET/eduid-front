import {
  hintsForAttachment,
  PASSKEY_HINTS,
  SECURITY_KEY_HINTS,
  withRegistrationHints,
} from "helperFunctions/webauthnHints";

const options: PublicKeyCredentialCreationOptionsJSON = {
  rp: { id: "eduid.docker", name: "eduID" },
  user: { id: "AAAA", name: "abcd-efgh", displayName: "Jane Doe" },
  challenge: "AAAA",
  pubKeyCredParams: [{ type: "public-key", alg: -7 }],
  authenticatorSelection: { authenticatorAttachment: "cross-platform" },
};

describe("hintsForAttachment", () => {
  test("the security key button prefers a security key", () => {
    expect(hintsForAttachment("cross-platform")).toEqual(["security-key"]);
  });

  test("the this-device button prefers this device, then a phone or tablet, like the login passkey button", () => {
    expect(hintsForAttachment("platform")).toEqual(["client-device", "hybrid"]);
    expect(hintsForAttachment("platform")).toEqual(PASSKEY_HINTS);
  });

  test("an unknown or missing authenticator gives no hints", () => {
    expect(hintsForAttachment(undefined)).toBeUndefined();
    expect(hintsForAttachment("something-else")).toBeUndefined();
    expect(SECURITY_KEY_HINTS).toEqual(["security-key"]);
  });
});

describe("withRegistrationHints", () => {
  test("adds the hints of the button and keeps the attachment the backend asked for", () => {
    const result = withRegistrationHints(options, "platform");
    expect(result.hints).toEqual(["client-device", "hybrid"]);
    expect(result.authenticatorSelection).toEqual(options.authenticatorSelection);
    expect(result.challenge).toBe(options.challenge);
  });

  test("does not change the options it was given, nor share the constant", () => {
    const result = withRegistrationHints(options, "cross-platform");
    expect(options.hints).toBeUndefined();
    result.hints?.push("hybrid");
    expect(SECURITY_KEY_HINTS).toEqual(["security-key"]);
  });

  test("keeps hints that the backend has set", () => {
    const withBackendHints = { ...options, hints: ["hybrid"] };
    expect(withRegistrationHints(withBackendHints, "platform").hints).toEqual(["hybrid"]);
  });

  test("leaves the options as they are for an unknown authenticator", () => {
    expect(withRegistrationHints(options, undefined)).toBe(options);
  });
});
