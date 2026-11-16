import {
  DOM_ERROR_ALREADY_REGISTERED,
  DOM_ERROR_NOT_SUPPORTED,
  DOM_ERROR_SECURITY,
  navigatorCredentialsApi,
} from "apis/navigatorCredentials";
import { getTestEduIDStore } from "eduid-init-app";
import extractedMessages from "translation/extractedMessages.json";

const g = globalThis as unknown as Record<string, unknown>;

const creationOptions: PublicKeyCredentialCreationOptionsJSON = {
  rp: { id: "eduid.docker", name: "eduID" },
  user: { id: "AAAA", name: "Test User", displayName: "Test User" },
  challenge: "AAAA",
  pubKeyCredParams: [{ type: "public-key", alg: -7 }],
};

const fakeCredential = {
  toJSON: () => ({ id: "cred-id", rawId: "cred-id", type: "public-key", response: {}, clientExtensionResults: {} }),
};

describe("navigatorCredentialsApi createCredential", () => {
  const originalPKC = g.PublicKeyCredential;
  const originalCredentials = Object.getOwnPropertyDescriptor(navigator, "credentials");
  let create: jest.Mock;

  beforeEach(() => {
    // no native parseCreationOptionsFromJSON: exercises the fallback parser
    g.PublicKeyCredential = function PublicKeyCredential() {};
    create = jest.fn();
    Object.defineProperty(navigator, "credentials", { value: { create }, configurable: true });
  });

  afterEach(() => {
    g.PublicKeyCredential = originalPKC;
    if (originalCredentials) {
      Object.defineProperty(navigator, "credentials", originalCredentials);
    } else {
      delete (navigator as unknown as Record<string, unknown>).credentials;
    }
  });

  test("passes an abort signal to navigator.credentials.create()", async () => {
    create.mockResolvedValue(fakeCredential);
    const store = getTestEduIDStore({});

    const result = await store.dispatch(navigatorCredentialsApi.endpoints.createCredential.initiate(creationOptions));

    expect(result.isSuccess).toBe(true);
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0][0].signal).toBeInstanceOf(AbortSignal);
  });

  test("aborting the request cancels create() without a notification", async () => {
    create.mockImplementation(
      ({ signal }: { signal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
        }),
    );
    const store = getTestEduIDStore({});

    const pending = store.dispatch(navigatorCredentialsApi.endpoints.createCredential.initiate(creationOptions));
    await Promise.resolve();
    pending.abort();
    const result = await pending;

    expect(result.isError).toBe(true);
    expect(store.getState().notifications.error).toBeUndefined();
  });
});

describe("navigatorCredentialsApi errors", () => {
  const originalPKC = g.PublicKeyCredential;
  const originalCredentials = Object.getOwnPropertyDescriptor(navigator, "credentials");
  let create: jest.Mock;
  let get: jest.Mock;

  beforeEach(() => {
    g.PublicKeyCredential = function PublicKeyCredential() {};
    create = jest.fn();
    get = jest.fn();
    Object.defineProperty(navigator, "credentials", { value: { create, get }, configurable: true });
  });

  afterEach(() => {
    g.PublicKeyCredential = originalPKC;
    if (originalCredentials) {
      Object.defineProperty(navigator, "credentials", originalCredentials);
    } else {
      delete (navigator as unknown as Record<string, unknown>).credentials;
    }
  });

  async function register(error: unknown) {
    create.mockRejectedValue(error);
    const store = getTestEduIDStore({});
    await store.dispatch(navigatorCredentialsApi.endpoints.createCredential.initiate(creationOptions));
    return store.getState().notifications.error?.message;
  }

  async function authenticate(error: unknown) {
    get.mockRejectedValue(error);
    const store = getTestEduIDStore({});
    await store.dispatch(
      navigatorCredentialsApi.endpoints.performAuthentication.initiate({
        webauth_options: { challenge: "AAAA", rpId: "eduid.docker" },
      }),
    );
    return store.getState().notifications.error?.message;
  }

  test("registering a key that is already registered says so, whatever the browser's own wording", async () => {
    // the browser's text differs between browsers; the name is what is stable
    const message = await register(new DOMException("Some browser specific text", "InvalidStateError"));
    expect(message).toBe(DOM_ERROR_ALREADY_REGISTERED);
  });

  test("a cancelled or timed out registration or authentication stays silent", async () => {
    expect(await register(new DOMException("denied", "NotAllowedError"))).toBeUndefined();
    expect(await authenticate(new DOMException("denied", "NotAllowedError"))).toBeUndefined();
  });

  test("an aborted registration or authentication stays silent", async () => {
    expect(await register(new DOMException("aborted", "AbortError"))).toBeUndefined();
    expect(await authenticate(new DOMException("aborted", "AbortError"))).toBeUndefined();
  });

  test("an unsupported request and a security error get their own messages", async () => {
    expect(await register(new DOMException("x", "NotSupportedError"))).toBe(DOM_ERROR_NOT_SUPPORTED);
    expect(await authenticate(new DOMException("x", "NotSupportedError"))).toBe(DOM_ERROR_NOT_SUPPORTED);
    expect(await register(new DOMException("x", "SecurityError"))).toBe(DOM_ERROR_SECURITY);
    expect(await authenticate(new DOMException("x", "SecurityError"))).toBe(DOM_ERROR_SECURITY);
  });

  test("InvalidStateError on authentication and other errors keep the generic message", async () => {
    expect(await authenticate(new DOMException("odd", "InvalidStateError"))).toBe("InvalidStateError: odd");
    expect(await register(new Error("boom"))).toBe("Error: boom");
  });
});

// A message id without a translation is shown as the raw id (see dynamicMessage()), so every id used here needs
// an extracted message. This asserts on the extracted messages: languages/*.json are maintained in Transifex.
test.each([DOM_ERROR_ALREADY_REGISTERED, DOM_ERROR_NOT_SUPPORTED, DOM_ERROR_SECURITY])(
  "%s has an extracted message",
  (id) => {
    const messages = extractedMessages as { [key: string]: { string: string } };
    expect(messages[id]?.string).toEqual(expect.any(String));
  },
);
