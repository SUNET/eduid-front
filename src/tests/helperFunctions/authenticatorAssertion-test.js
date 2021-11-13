import expect from "expect";
import { safeEncode, mfaDecodeMiddleware } from "../../login/app_utils/helperFunctions/authenticatorAssertion";

describe("mfaDecodeMiddleware returns an object", () => {
  const webauthn_options =
    "oWlwdWJsaWNLZXmjZHJwSWRsZWR1aWQuZG9ja2VyaWNoYWxsZW5nZVggaRbMkVCjtshWaiasyXeKP" +
    "-z7wWEbVv5CAIWcKgB8ff1wYWxsb3dDcmVkZW50aWFsc4GiYmlkWEBHsIeXZVqNH1X_SgmHU1ELQE" +
    "fFqPnaVOW06YSy5B64UPC1WPijawhZ45PsmX5no14hkRrDf6Oo3LttEKRffMKhZHR5cGVqcHVibGl" +
    "jLWtleQ";

  it("with input", () => {
    let decodedChallenge = mfaDecodeMiddleware(webauthn_options);
    expect(typeof decodedChallenge).toEqual("object");
    expect(Array.isArray(decodedChallenge)).toEqual(false);
    expect(decodedChallenge.publicKey.rpId).toEqual("eduid.docker");
  });
  it("with empty input", () => {
    let emptyObj = {};
    let decodedChallenge = mfaDecodeMiddleware(emptyObj);
    expect(decodedChallenge).toBeUndefined();
  });
  it("initial webauthn_options not same type as returned webauthn_options", () => {
    let decodedChallenge = mfaDecodeMiddleware(webauthn_options);
    expect(typeof encodedWebauthnOptions).not.toEqual(typeof decodedChallenge);
  });
});

describe("safeEncode returns a string", () => {
  let obj = new ArrayBuffer(64);
  let emptyObj = new ArrayBuffer(0);
  it("with input", () => {
    let safeEncodeObj = safeEncode(obj);
    expect(typeof safeEncodeObj).toEqual("string");
  });
  it("with empty input", () => {
    let safeEncodeObj = safeEncode(emptyObj);
    expect(safeEncodeObj.length).toEqual(0);
    expect(typeof safeEncodeObj).toEqual("string");
  });
  it("inital object is not of same type as result", () => {
    let safeEncodeObj = safeEncode(obj);
    expect(typeof obj).not.toEqual(typeof safeEncodeObj);
  });
});
