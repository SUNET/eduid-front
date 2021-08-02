import expect from "expect";
import { safeEncode } from "../../login/app_utils/helperFunctions/authenticatorAssertion";
/* safeEncode() relies on the DOM, uncomment below to run test in file */
import { JSDOM } from "jsdom";
const mockDom = `<!doctype html><html><body></body></html>`;
const { document } = new JSDOM(mockDom).window;
global.window = document.defaultView;

let obj = new ArrayBuffer(64);
let emptyObj = new ArrayBuffer(0);

describe("safeEncode returns a string", () => {
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
