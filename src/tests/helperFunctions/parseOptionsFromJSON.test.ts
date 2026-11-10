import { base64urlToBuffer, parseCreationOptions, parseRequestOptions } from "helperFunctions/parseOptionsFromJSON";

const bytes = (b: ArrayBuffer) => Array.from(new Uint8Array(b));

describe("parseOptionsFromJSON fallback (no native PublicKeyCredential methods)", () => {
  beforeAll(() => {
    (globalThis as unknown as { PublicKeyCredential: unknown }).PublicKeyCredential = {};
  });

  test("base64url decoding handles -, _ and missing padding", () => {
    expect(bytes(base64urlToBuffer("-_8"))).toEqual([0xfb, 0xff]);
    expect(bytes(base64urlToBuffer("AQID"))).toEqual([1, 2, 3]);
  });

  test("request options: challenge, allowCredentials and prf are decoded, the rest passes through", () => {
    const out = parseRequestOptions({
      challenge: "AQID",
      rpId: "eduid.se",
      timeout: 1000,
      userVerification: "preferred",
      allowCredentials: [{ type: "public-key", id: "BAUG", transports: ["usb"] }],
      extensions: { prf: { eval: { first: "AQ" }, evalByCredential: { BAUG: { first: "Ag", second: "Aw" } } } },
    });
    expect(bytes(out.challenge as ArrayBuffer)).toEqual([1, 2, 3]);
    expect(out.rpId).toBe("eduid.se");
    expect(out.timeout).toBe(1000);
    expect(out.allowCredentials?.[0].transports).toEqual(["usb"]);
    expect(bytes(out.allowCredentials?.[0].id as ArrayBuffer)).toEqual([4, 5, 6]);
    const prf = out.extensions?.prf as { eval: { first: ArrayBuffer }; evalByCredential: Record<string, { first: ArrayBuffer; second: ArrayBuffer }> };
    expect(bytes(prf.eval.first)).toEqual([1]);
    expect(bytes(prf.evalByCredential.BAUG.second)).toEqual([3]);
  });

  test("largeBlob write is decoded, including an empty (zero-length) write", () => {
    const decode = (write: string) =>
      parseRequestOptions({ challenge: "AQID", extensions: { largeBlob: { write } } } as PublicKeyCredentialRequestOptionsJSON)
        .extensions as unknown as { largeBlob: { write: ArrayBuffer } };
    expect(bytes(decode("AQID").largeBlob.write)).toEqual([1, 2, 3]);
    const empty = decode("").largeBlob.write;
    expect(empty).toBeInstanceOf(ArrayBuffer);
    expect(empty.byteLength).toBe(0);
  });

  test("creation options: user.id and excludeCredentials are decoded", () => {
    const out = parseCreationOptions({
      challenge: "AQID",
      rp: { name: "eduID", id: "eduid.se" },
      user: { id: "BAUG", name: "a", displayName: "A" },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      excludeCredentials: [{ type: "public-key", id: "Bw" }],
    });
    expect(bytes(out.user.id as ArrayBuffer)).toEqual([4, 5, 6]);
    expect(out.user.name).toBe("a");
    expect(bytes(out.excludeCredentials?.[0].id as ArrayBuffer)).toEqual([7]);
    expect(out.pubKeyCredParams).toEqual([{ type: "public-key", alg: -7 }]);
  });

  test("native method is preferred when present", () => {
    const native = jest.fn().mockReturnValue({ challenge: "native" });
    (globalThis as unknown as { PublicKeyCredential: unknown }).PublicKeyCredential = { parseRequestOptionsFromJSON: native };
    expect(parseRequestOptions({ challenge: "AQID" })).toEqual({ challenge: "native" });
    expect(native).toHaveBeenCalled();
  });
});
