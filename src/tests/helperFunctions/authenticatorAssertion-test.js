import expect from "expect";
import {
  safeEncode,
  mfaDecodeMiddleware,
} from "../../login/app_utils/helperFunctions/authenticatorAssertion";

/* functions rely on the DOM, uncomment below to run test in file */
// import { JSDOM } from "jsdom";
// const mockDom = `<!doctype html><html><body></body></html>`;
// const { document } = new JSDOM(mockDom).window;
// global.window = document.defaultView;

describe("mfaDecodeMiddleware returns an object", () => {
  const encodedChallenge = {
    payload: {
      webauthn_options:
        "oWlwdWJsaWNLZXmjZHJwSWRsZWR1aWQuZG9ja2VyaWNoYWxsZW5nZVggaRbMkVCjtshWaiasyXeKP-z7wWEbVv5CAIWcKgB8ff1wYWxsb3dDcmVkZW50aWFsc4GiYmlkWEBHsIeXZVqNH1X_SgmHU1ELQEfFqPnaVOW06YSy5B64UPC1WPijawhZ45PsmX5no14hkRrDf6Oo3LttEKRffMKhZHR5cGVqcHVibGljLWtleQ",
    },
  };
  const encodedWebauthnOptions = encodedChallenge.payload.webauthn_options;
  let emptyObj = {};
  it("with input", () => {
    let decodedChallenge = mfaDecodeMiddleware(encodedChallenge);
    expect(typeof decodedChallenge).toEqual("object");
    expect(Array.isArray(decodedChallenge)).toEqual(false);
  });
  it("with empty input", () => {
    let decodedChallenge = mfaDecodeMiddleware(emptyObj);
    expect(typeof decodedChallenge).toEqual("object");
  });
  it("initial webauthn_options not same type as retured webauthn_options", () => {
    let decodedChallenge = mfaDecodeMiddleware(encodedChallenge);
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
