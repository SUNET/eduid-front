import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { getTestEduIDStore } from "eduid-init-app";

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
