import { detectBrowserSupport } from "helperFunctions/browserSupport";

const g = globalThis as unknown as Record<string, unknown>;

function stubNesting(supported: boolean) {
  const fakeStyle = {
    textContent: "",
    sheet: { cssRules: [{ cssRules: { length: supported ? 1 : 0 } }] },
    remove: jest.fn(),
  };
  const realCreate = document.createElement.bind(document);
  jest.spyOn(document, "createElement").mockImplementation((tag: string) =>
    tag === "style" ? (fakeStyle as unknown as HTMLStyleElement) : realCreate(tag),
  );
  jest.spyOn(document.head, "appendChild").mockImplementation((node) => node);
}

describe("detectBrowserSupport", () => {
  const originalCSS = g.CSS;
  const originalPKC = g.PublicKeyCredential;

  beforeEach(() => {
    g.CSS = { supports: () => true };
    g.PublicKeyCredential = function PublicKeyCredential() {};
  });

  afterEach(() => {
    jest.restoreAllMocks();
    g.CSS = originalCSS;
    g.PublicKeyCredential = originalPKC;
  });

  test("a browser with every feature is supported", () => {
    stubNesting(true);
    expect(detectBrowserSupport()).toEqual({ unsupported: false, noWebauthn: false });
  });

  test("missing relaxed CSS nesting is unsupported", () => {
    stubNesting(false);
    expect(detectBrowserSupport().unsupported).toBe(true);
  });

  test("missing :has() is unsupported", () => {
    stubNesting(true);
    g.CSS = { supports: () => false };
    expect(detectBrowserSupport().unsupported).toBe(true);
  });

  test("missing CSS.supports is unsupported, not an error", () => {
    stubNesting(true);
    g.CSS = undefined;
    expect(detectBrowserSupport().unsupported).toBe(true);
  });

  test("missing replaceAll is unsupported", () => {
    stubNesting(true);
    const original = String.prototype.replaceAll;
    // @ts-expect-error simulating an older browser
    delete String.prototype.replaceAll;
    try {
      expect(detectBrowserSupport().unsupported).toBe(true);
    } finally {
      String.prototype.replaceAll = original;
    }
  });

  test("missing PublicKeyCredential is reported separately from unsupported", () => {
    stubNesting(true);
    delete g.PublicKeyCredential;
    expect(detectBrowserSupport()).toEqual({ unsupported: false, noWebauthn: true });
  });

  test("a throwing style sheet is treated as unsupported", () => {
    jest.spyOn(document.head, "appendChild").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(detectBrowserSupport().unsupported).toBe(true);
  });
});
