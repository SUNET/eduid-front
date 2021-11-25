import expect from "expect";
import { decodeChallenge } from "../login/app_utils/helperFunctions/navigatorCredential";
import { safeDecode, safeEncode } from "../login/app_utils/helperFunctions/base64Utils";

describe("decodeChallenge returns an object", () => {
  const webauthn_options =
    "oWlwdWJsaWNLZXmjZHJwSWRsZWR1aWQuZG9ja2VyaWNoYWxsZW5nZVggaRbMkVCjtshWaiasyXeKP" +
    "-z7wWEbVv5CAIWcKgB8ff1wYWxsb3dDcmVkZW50aWFsc4GiYmlkWEBHsIeXZVqNH1X_SgmHU1ELQE" +
    "fFqPnaVOW06YSy5B64UPC1WPijawhZ45PsmX5no14hkRrDf6Oo3LttEKRffMKhZHR5cGVqcHVibGl" +
    "jLWtleQ";

  it("with input", () => {
    const decoded = decodeChallenge(webauthn_options);
    expect(decoded).toBeDefined();
    if (decoded) {
      expect(typeof decoded).toEqual("object");
      expect(decoded.publicKey).toBeDefined();
      expect(decoded.publicKey.rpId).toEqual("eduid.docker");
    }
  });
});

describe("safeEncode can b64encode and safeDecode can decode it again", () => {
  it("with basic input", () => {
    const buf = Uint8Array.from("foobar", (c) => c.charCodeAt(0));
    const encoded = safeEncode(buf);
    expect(encoded).toEqual("Zm9vYmFy");

    const decoded = safeDecode(encoded);
    expect(decoded).toEqual(buf);
  });
});
